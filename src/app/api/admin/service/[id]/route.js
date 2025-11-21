import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { deleteS3Folder, deleteS3File } from "@/lib/deleteS3Folder";
import { uploadToS3 } from "@/lib/uploadToS3";
import { generateUniqueSlug } from "@/lib/slugMaker";

const safeJsonParse = (value, fallback) => {
  if (!value || typeof value !== "string") return fallback;
  try {
    return JSON.parse(value);
  } catch {
    return fallback;
  }
};

// ✅ GET one service with all relations
export async function GET(request, { params }) {
  const { id } = await params;
  const numericId = Number(id);

  if (!numericId || Number.isNaN(numericId)) {
    return NextResponse.json(
      { success: false, error: "Invalid service id" },
      { status: 400 }
    );
  }

  try {
    const service = await prisma.service.findUnique({
      where: { id: numericId },
      include: {
        features: true,
        specifications: true,
        gallery: true,
        faqs: true,
        testimonials: true,
        subServices: {
          include: {
            seo: true,
            features: true,
            specifications: true,
            faqs: true,
            testimonials: true,
          },
        },
        seo: true,
      },
    });

    if (!service) {
      return NextResponse.json(
        { success: false, error: "Service not found" },
        { status: 404 }
      );
    }

    // serialize JSON fields safely for the admin UI
    const serialized = {
      ...service,
      applications: service.applications
        ? JSON.stringify(service.applications)
        : null,
      callToAction: service.callToAction
        ? JSON.stringify(service.callToAction)
        : null,
    };

    return NextResponse.json({ success: true, data: serialized });
  } catch (error) {
    console.error("GET /api/admin/service/[id] error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch service" },
      { status: 500 }
    );
  }
}

export async function PATCH(request, { params }) {
  const { id } = await params;
  const serviceId = Number(id);

  if (!serviceId || Number.isNaN(serviceId)) {
    return NextResponse.json(
      { success: false, error: "Invalid service id" },
      { status: 400 }
    );
  }

  try {
    const formData = await request.formData();

    // ------------------------------------
    // FETCH EXISTING SERVICE
    // ------------------------------------
    const service = await prisma.service.findUnique({
      where: { id: serviceId },
      include: { subServices: true },
    });

    if (!service) {
      return NextResponse.json(
        { success: false, error: "Service not found" },
        { status: 404 }
      );
    }

    const serviceSlug = service.slug;

    // ------------------------------------
    // BASIC FIELDS
    // ------------------------------------
    const title = formData.get("title");
    const shortTitle = formData.get("shortTitle");
    const shortDescription = formData.get("shortDescription");
    const description = formData.get("description");
    const priceRange = formData.get("priceRange");
    const moreInfoUrl = formData.get("moreInfoUrl");
    const applications = safeJsonParse(formData.get("applications"), []);
    const warrantyComponents = safeJsonParse(
      formData.get("warrantyComponents"),
      []
    );

    // ------------------------------------
    // COVER IMAGE
    // ------------------------------------
    let coverImageUrl = service.imageUrl;
    const coverFile = formData.get("imageUrl");

    if (coverFile instanceof File) {
      coverImageUrl = await uploadToS3(coverFile, `services/${serviceSlug}`);
    }

    // ------------------------------------
    // JSON FIELDS
    // ------------------------------------
    const features = safeJsonParse(formData.get("features"), []);
    const specifications = safeJsonParse(
      formData.get("specifications"),
      []
    );
    const faqs = safeJsonParse(formData.get("faqs"), []);
    const testimonials = safeJsonParse(formData.get("testimonials"), []);
    const seo = safeJsonParse(formData.get("seo"), {});
    const keepGalleryIds = safeJsonParse(formData.get("keepGalleryIds"), []);

    const cleanedFeatures = features.map((f) => ({
      title: f.title,
      detail: f.detail,
      icon: f.icon || null,
    }));

    const cleanedSpecifications = specifications.map((s) => ({
      key: s.key,
      value: s.value,
    }));

    const cleanedFaqs = faqs.map((f) => ({
      question: f.question,
      answer: f.answer,
    }));

    const cleanedTestimonials = testimonials.map((t) => ({
      name: t.name,
      feedback: t.feedback,
      rating: t.rating ?? null,
      link: t.link ?? null,
    }));

    // ------------------------------------
    // GALLERY HANDLING
    // ------------------------------------
    const existingGallery = await prisma.galleryImage.findMany({
      where: { serviceId },
    });

    const imagesToDelete = existingGallery.filter(
      (img) => !keepGalleryIds.includes(img.id)
    );

    for (const img of imagesToDelete) {
      const key = decodeURIComponent(img.url.split(".amazonaws.com/")[1]);
      if (key) {
        await deleteS3File(key);
      }
    }

    const newGalleryFiles = formData.getAll("galleryFiles");
    const newGallery = [];

    for (const file of newGalleryFiles) {
      if (file instanceof File) {
        const url = await uploadToS3(file, `services/${serviceSlug}/gallery`);
        newGallery.push({ url });
      }
    }

    await prisma.galleryImage.deleteMany({
      where: { id: { in: imagesToDelete.map((i) => i.id) } },
    });

    // ------------------------------------
    // UPDATE MAIN SERVICE
    // ------------------------------------
    const updatedService = await prisma.service.update({
      where: { id: serviceId },
      data: {
        title,
        shortTitle,
        shortDescription,
        description,
        imageUrl: coverImageUrl,
        priceRange,
        moreInfoUrl,
        applications,
        warrantyComponents: warrantyComponents || [],
        features: { deleteMany: {}, create: cleanedFeatures },
        specifications: { deleteMany: {}, create: cleanedSpecifications },
        faqs: { deleteMany: {}, create: cleanedFaqs },
        testimonials: { deleteMany: {}, create: cleanedTestimonials },
        gallery: { create: newGallery },
        seo: seo?.title
          ? {
              upsert: {
                update: seo,
                create: seo,
              },
            }
          : undefined,
      },
    });

    // ------------------------------------
    // SUBSERVICES UPDATE
    // ------------------------------------
    const incomingSubServices = safeJsonParse(
      formData.get("subServices"),
      []
    );

    const existingSubServices = await prisma.subService.findMany({
      where: { serviceId },
      include: {
        features: true,
        specifications: true,
        faqs: true,
        testimonials: true,
        seo: true,
      },
    });

    const incomingIds = incomingSubServices
      .filter((s) => s.id)
      .map((s) => s.id);
    const existingIds = existingSubServices.map((s) => s.id);

    // DELETE removed subservices
    const removedIds = existingIds.filter((sid) => !incomingIds.includes(sid));

    if (removedIds.length) {
      for (const rid of removedIds) {
        const sub = existingSubServices.find((s) => s.id === rid);
        if (sub) {
          await deleteS3Folder(`services/${serviceSlug}/${sub.slug}`);
        }
      }

      await prisma.subService.deleteMany({
        where: { id: { in: removedIds } },
      });
    }

    // CREATE / UPDATE SUBSERVICES
    for (let i = 0; i < incomingSubServices.length; i++) {
      const s = incomingSubServices[i];
      const existing = existingSubServices.find((x) => x.id === s.id);

      let finalImageUrl = s.imageUrl;
      let subSlug = existing?.slug;

      if (!existing) {
        subSlug = await generateUniqueSlug(s.title, "subservice");
      }

      const imageFile = formData.get(`subServiceImage_${i}`);
      if (imageFile instanceof File) {
        finalImageUrl = await uploadToS3(
          imageFile,
          `services/${serviceSlug}/${subSlug}`
        );
      }

      const cleanedSubFeatures = (s.features || []).map((f) => ({
        title: f.title,
        detail: f.detail,
        icon: f.icon || null,
      }));

      const cleanedSubSpecifications = (s.specifications || []).map((sp) => ({
        key: sp.key,
        value: sp.value,
      }));

      const cleanedSubFaqs = (s.faqs || []).map((f) => ({
        question: f.question,
        answer: f.answer,
      }));

      const cleanedSubTestimonials = (s.testimonials || []).map((t) => ({
        name: t.name,
        feedback: t.feedback,
        rating: t.rating ?? null,
        link: t.link ?? null,
      }));

      const nested = {
        title: s.title,
        description: s.description || "",
        imageUrl: finalImageUrl,
        applications: s.applications || null,
        warrantyComponents: s.warrantyComponents || null,
        features: existing
          ? {
              deleteMany: { subServiceId: existing.id },
              create: cleanedSubFeatures,
            }
          : { create: cleanedSubFeatures },
        specifications: existing
          ? {
              deleteMany: { subServiceId: existing.id },
              create: cleanedSubSpecifications,
            }
          : { create: cleanedSubSpecifications },
        faqs: existing
          ? {
              deleteMany: { subServiceId: existing.id },
              create: cleanedSubFaqs,
            }
          : { create: cleanedSubFaqs },
        testimonials: existing
          ? {
              deleteMany: { subServiceId: existing.id },
              create: cleanedSubTestimonials,
            }
          : { create: cleanedSubTestimonials },
        seo: s.seo?.title
          ? {
              upsert: {
                update: s.seo,
                create: s.seo,
              },
            }
          : undefined,
      };

      if (!existing) {
        await prisma.subService.create({
          data: {
            ...nested,
            slug: subSlug,
            service: { connect: { id: serviceId } },
          },
        });
      } else {
        await prisma.subService.update({
          where: { id: existing.id },
          data: nested,
        });
      }
    }

    return NextResponse.json({
      success: true,
      data: updatedService,
    });
  } catch (error) {
    console.error("PATCH /api/admin/service/[id] error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to update service" },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  const { id } = await params;
  const serviceId = Number(id);

  if (!serviceId || Number.isNaN(serviceId)) {
    return NextResponse.json(
      { success: false, error: "Invalid service id" },
      { status: 400 }
    );
  }

  try {
    // 1️⃣ Fetch service with subServices
    const service = await prisma.service.findUnique({
      where: { id: serviceId },
      include: {
        subServices: {
          include: { seo: true },
        },
        seo: true,
      },
    });

    if (!service) {
      return NextResponse.json(
        { success: false, error: "Service not found" },
        { status: 404 }
      );
    }

    const { slug: serviceSlug } = service;

    // 2️⃣ DELETE ALL SUB-SERVICES & THEIR CHILDREN
    for (const sub of service.subServices) {
      const subId = sub.id;

      await prisma.faq.deleteMany({ where: { subServiceId: subId } });
      await prisma.feature.deleteMany({ where: { subServiceId: subId } });
      await prisma.specification.deleteMany({ where: { subServiceId: subId } });
      await prisma.testimonial.deleteMany({ where: { subServiceId: subId } });

      await prisma.orderItem.deleteMany({ where: { subServiceId: subId } });

      if (sub.seoId) {
        await prisma.seo.delete({ where: { id: sub.seoId } });
      }

      await prisma.subService.delete({ where: { id: subId } });

      try {
        await deleteS3Folder(`services/${serviceSlug}/${sub.slug}`);
      } catch (e) {
        console.error(`Failed to clean S3 for subservice ${sub.slug}`, e);
      }
    }

    // 3️⃣ DELETE ALL SERVICE-LEVEL CHILDREN
    await prisma.faq.deleteMany({ where: { serviceId } });
    await prisma.feature.deleteMany({ where: { serviceId } });
    await prisma.specification.deleteMany({ where: { serviceId } });
    await prisma.galleryImage.deleteMany({ where: { serviceId } });
    await prisma.testimonial.deleteMany({ where: { serviceId } });

    await prisma.orderItem.deleteMany({ where: { serviceId } });

    if (service.seoId) {
      await prisma.seo.delete({ where: { id: service.seoId } });
    }

    // 4️⃣ DELETE THE SERVICE ITSELF
    await prisma.service.delete({ where: { id: serviceId } });

    // 5️⃣ DELETE MAIN SERVICE FOLDER FROM S3
    try {
      await deleteS3Folder(`services/${serviceSlug}`);
      console.log(`🧹 Deleted S3 folder for service ${serviceSlug}`);
    } catch (s3Error) {
      console.error("S3 cleanup failed:", s3Error);
    }

    return NextResponse.json({
      success: true,
      message: "Service, subservices, and all related data deleted successfully",
    });
  } catch (error) {
    console.error("DELETE /api/admin/service/[id] error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to delete service" },
      { status: 500 }
    );
  }
}
