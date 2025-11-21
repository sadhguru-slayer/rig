export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { uploadToS3 } from "@/lib/uploadToS3";
import { generateUniqueSlug } from "@/lib/slugMaker";

// Small helpers to keep JSON parsing safe and predictable
const safeJsonParse = (value, fallback) => {
  if (!value || typeof value !== "string") return fallback;
  try {
    return JSON.parse(value);
  } catch {
    return fallback;
  }
};

export async function GET() {
  try {
    const services = await prisma.service.findMany({
      include: {
        features: true,
        specifications: true,
        gallery: true,
        faqs: true,
        testimonials: true,
        seo: true,
        subServices: {
          include: {
            seo: true,
            features: true,
            specifications: true,
            faqs: true,
            testimonials: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({ success: true, data: services });
  } catch (error) {
    console.error("GET /api/admin/service error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch services" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const formData = await request.formData();

    // ------------------------------
    // BASIC REQUIRED FIELDS
    // ------------------------------
    const title = formData.get("title");
    if (!title || typeof title !== "string" || !title.trim()) {
      return NextResponse.json(
        { success: false, error: "Title is required" },
        { status: 400 }
      );
    }

    const slug = await generateUniqueSlug(title, "service");

    const shortTitle = formData.get("shortTitle") || "";
    const shortDescription = formData.get("shortDescription") || "";
    const description = formData.get("description") || "";
    const priceRange = formData.get("priceRange") || "";
    const moreInfoUrl = formData.get("moreInfoUrl") || "";

    // warrantyComponents & applications are JSON on the wire
    const warrantyComponents = safeJsonParse(
      formData.get("warrantyComponents"),
      null
    );
    const applications = safeJsonParse(formData.get("applications"), null);

    // ------------------------------
    // COVER IMAGE
    // ------------------------------
    const coverImage = formData.get("imageFile");
    let coverImageUrl = null;
    if (coverImage instanceof File) {
      coverImageUrl = await uploadToS3(coverImage, `services/${slug}`);
    }

    // ------------------------------
    // MAIN NESTED RELATIONS
    // ------------------------------
    const features = safeJsonParse(formData.get("features"), []);
    const specifications = safeJsonParse(formData.get("specifications"), []);
    const faqs = safeJsonParse(formData.get("faqs"), []);
    const testimonials = safeJsonParse(formData.get("testimonials"), []);
    const seo = safeJsonParse(formData.get("seo"), {});

    // ------------------------------
    // GALLERY
    // ------------------------------
    const galleryFiles = formData.getAll("galleryFiles") || [];
    const processedGallery = [];

    for (const file of galleryFiles) {
      if (!(file instanceof File)) continue;
      const url = await uploadToS3(file, `services/${slug}/gallery`);
      processedGallery.push({ url });
    }

    // ------------------------------
    // SUBSERVICES
    // ------------------------------
    const rawSubServices = formData.get("subServices");
    const parsedSubServices = Array.isArray(safeJsonParse(rawSubServices, []))
      ? safeJsonParse(rawSubServices, [])
      : [];

    const subCreates = [];
    for (let i = 0; i < parsedSubServices.length; i++) {
      const s = parsedSubServices[i] || {};

      const subTitle = s.title || `sub-${i}`;
      const subSlug = await generateUniqueSlug(subTitle, "subservice");
      const subDescription = s.description || "";
      const subApplications =
        s.applications === null
          ? null
          : s.applications || null;

      // Optional image from FormData: subServiceImage_{index}
      const imageKey = `subServiceImage_${i}`;
      const possibleImage = formData.get(imageKey);
      let subImageUrl = s.imageUrl || null;
      if (possibleImage instanceof File) {
        subImageUrl = await uploadToS3(
          possibleImage,
          `services/${slug}/${subSlug}`
        );
      }

      const subFeatures = s.features || [];
      const subWarrantyComponents = s.warrantyComponents || [];
      const subSpecifications = s.specifications || [];
      const subFaqs = s.faqs || [];
      const subTestimonials = s.testimonials || [];
      const subSeo = s.seo || {};

      subCreates.push({
        title: subTitle,
        slug: subSlug,
        description: subDescription,
        imageUrl: subImageUrl,
        applications: subApplications,
        warrantyComponents: subWarrantyComponents,
        seo: subSeo?.title ? { create: subSeo } : undefined,
        features: subFeatures.length ? { create: subFeatures } : undefined,
        specifications: subSpecifications.length
          ? { create: subSpecifications }
          : undefined,
        faqs: subFaqs.length ? { create: subFaqs } : undefined,
        testimonials: subTestimonials.length
          ? { create: subTestimonials }
          : undefined,
      });
    }

    // ------------------------------
    // CREATE SERVICE WITH NESTED DATA
    // ------------------------------
    const newService = await prisma.service.create({
      data: {
        slug,
        title,
        shortTitle,
        shortDescription,
        description,
        imageUrl: coverImageUrl,
        priceRange,
        moreInfoUrl,
        applications,
        warrantyComponents,
        seo: seo?.title ? { create: seo } : undefined,
        features: features.length ? { create: features } : undefined,
        specifications: specifications.length
          ? { create: specifications }
          : undefined,
        testimonials: testimonials.length
          ? { create: testimonials }
          : undefined,
        gallery: processedGallery.length
          ? { create: processedGallery }
          : undefined,
        faqs: faqs.length ? { create: faqs } : undefined,
        subServices: subCreates.length ? { create: subCreates } : undefined,
      },
      include: {
        seo: true,
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
      },
    });

    return NextResponse.json({ success: true, data: newService });
  } catch (error) {
    console.error("POST /api/admin/service error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error?.message || "Failed to create service",
      },
      { status: 500 }
    );
  }
}

