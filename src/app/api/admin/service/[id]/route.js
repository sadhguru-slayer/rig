import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import {  deleteS3Folder,deleteS3File } from "@/lib/deleteS3Folder";
import {  uploadToS3 } from "@/lib/uploadToS3";

const prisma = new PrismaClient();

// ✅ GET one service with all relations
export async function GET(request, { params }) {
  const { id } = await params;
  try {
    const service = await prisma.service.findUnique({
  where: { id: parseInt(id) },
  include: {
    features: true,
    specifications: true,
    gallery: true,
    faqs: true,
    testimonials: true,
    seo: true,
  },
});

    if (!service) {
      return NextResponse.json({ success: false, error: "Service not found" }, { status: 404 });
    }

    // serialize JSON fields safely
    const serialized = {
      ...service,
      applications: service.applications ? JSON.stringify(service.applications) : null,
      callToAction: service.callToAction ? JSON.stringify(service.callToAction) : null,
    };

    return NextResponse.json({ success: true, data: serialized });
  } catch (error) {
    console.error("GET /service/:id error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}


export async function PATCH(request, { params }) {
  const { id } = await params;
  const serviceId = parseInt(id);

  try {
    const formData = await request.formData();

    // 🧩 Extract all fields
    const title = formData.get("title");

    const service = await prisma.service.findUnique({
      where: { id: serviceId },
    });
    
    if (!service) {
      throw new Error("Service not found");
    }
    
    const slug = service.slug;

    const shortTitle = formData.get("shortTitle");
    const shortDescription = formData.get("shortDescription");
    const description = formData.get("description");
    const imageUrl = formData.get("imageUrl");
    const priceRange = formData.get("priceRange");
    const moreInfoUrl = formData.get("moreInfoUrl");
    const applications = formData.get("applications");

    const features = JSON.parse(formData.get("features") || "[]");
    const specifications = JSON.parse(formData.get("specifications") || "[]");
    const faqs = JSON.parse(formData.get("faqs") || "[]");
    const testimonials = JSON.parse(formData.get("testimonials") || "[]");
    const seo = JSON.parse(formData.get("seo") || "{}");
    const keepGalleryIds = JSON.parse(formData.get("keepGalleryIds") || "[]");

   // ✅ Clean nested data before updating
// ✅ Clean nested data before updating — aligned with your Prisma models

const cleanedFeatures = features.map((f) => ({
  title: f.title,
  detail: f.detail,
  icon: f.icon || null,
}));

const cleanedSpecifications = specifications.map((s) => ({
  key: s.key,       // ✅ changed from title → key
  value: s.value,   // ✅ changed from detail → value
}));

const cleanedFaqs = faqs.map((f) => ({
  question: f.question,
  answer: f.answer,
}));

const cleanedTestimonials = testimonials.map((t) => ({
  name: t.name,
  feedback: t.feedback,
  rating: t.rating || null,
  link: t.link || null, // ✅ added link field
}));


    // 🧠 Fetch existing gallery
    const existingGallery = await prisma.galleryImage.findMany({
      where: { serviceId },
    });

    // Determine which images to delete
    const imagesToDelete = existingGallery.filter(
      (img) => !keepGalleryIds.includes(img.id)
    );

    // 🪣 Delete removed images from S3
    for (const img of imagesToDelete) {
  const keyFromUrl = img.url.split(".amazonaws.com/")[1];
  if (keyFromUrl) {
    const key = decodeURIComponent(keyFromUrl); // <-- decode here
    try {
      await deleteS3File(key);
    } catch (err) {
      console.warn("S3 delete error:", err);
    }
  }
}

    // 🖼️ Upload new files
    const galleryFiles = formData.getAll("galleryFiles");
    const newGallery = [];

    for (const file of galleryFiles) {
      const s3Url = await uploadToS3(file, `services/${slug}`);
      newGallery.push({ url: s3Url });
    }

    // 🧹 Remove old records for deleted images
    await prisma.galleryImage.deleteMany({
      where: { id: { in: imagesToDelete.map((img) => img.id) } },
    });

    // ✅ Update service and nested data
const updated = await prisma.service.update({
  where: { id: serviceId },
  data: {
    title,
    shortTitle,
    shortDescription,
    description,
    imageUrl,
    priceRange,
    moreInfoUrl,
    applications: JSON.parse(applications || "[]"),

    features: {
      deleteMany: {},
      create: cleanedFeatures,
    },
    specifications: {
      deleteMany: {},
      create: cleanedSpecifications,
    },
    faqs: {
      deleteMany: {},
      create: cleanedFaqs,
    },
    testimonials: {
      deleteMany: {},
      create: cleanedTestimonials,
    },
    gallery: {
      create: newGallery,
    },
    seo: seo.title
      ? {
          upsert: {
            update: seo,
            create: seo,
          },
        }
      : undefined,
  },
  include: {
    features: true,
    specifications: true,
    faqs: true,
    testimonials: true,
    gallery: true,
    seo: true,
  },
});



    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    console.error("PATCH /service/:id error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}



export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    const serviceId = parseInt(id);

    // 🧩 Find service to get its slug (needed for S3 folder path)
    const service = await prisma.service.findUnique({
      where: { id: serviceId },
    });

    if (!service) {
      return NextResponse.json(
        { success: false, error: "Service not found" },
        { status: 404 }
      );
    }

    // 🧹 Delete children first
    await prisma.faq.deleteMany({ where: { serviceId } });
    await prisma.feature.deleteMany({ where: { serviceId } });
    await prisma.specification.deleteMany({ where: { serviceId } });
    await prisma.galleryImage.deleteMany({ where: { serviceId } });
    await prisma.testimonial.deleteMany({ where: { serviceId } });

    // 🧠 Delete SEO if linked
    if (service.seoId) {
      await prisma.seo.deleteMany({ where: { id: service.seoId } });
    }

    // 🗑️ Delete the service itself
    await prisma.service.delete({ where: { id: serviceId } });

    // 🪣 Delete the S3 folder (services/<slug>/)
    try {
      await deleteS3Folder(`services/${service.slug}`);
      console.log(`🧹 Deleted S3 folder: services/${service.slug}`);
    } catch (s3Error) {
      console.error("S3 cleanup failed:", s3Error);
    }

    return NextResponse.json({
      success: true,
      message: "Service and all related data deleted successfully",
    });
  } catch (error) {
    console.error("DELETE /service/:id error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
