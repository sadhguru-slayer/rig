import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { uploadToS3 } from "@/lib/uploadToS3";
import { generateUniqueSlug } from "@/lib/slugMaker";

const prisma = new PrismaClient();

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
      },
    });
    return NextResponse.json({ success: true, data: services });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}


export async function POST(request) {
  try {
    const formData = await request.formData();

    // 🧩 Extract individual fields
    const title = formData.get("title");
    const slug = await generateUniqueSlug(title, "service");

    const shortTitle = formData.get("shortTitle");
    const shortDescription = formData.get("shortDescription");
    const description = formData.get("description");
    const imageUrl = formData.get("imageUrl");
    const priceRange = formData.get("priceRange");
    const moreInfoUrl = formData.get("moreInfoUrl");
    const applications = formData.get("applications");

    if (!title || !slug) {
      return NextResponse.json(
        { success: false, error: "Title and slug are required" },
        { status: 400 }
      );
    }

    // 🧠 Parse JSON fields (arrays / objects)
    const features = JSON.parse(formData.get("features") || "[]");
    const specifications = JSON.parse(formData.get("specifications") || "[]");
    const faqs = JSON.parse(formData.get("faqs") || "[]");
    const testimonials = JSON.parse(formData.get("testimonials") || "[]");
    const seo = JSON.parse(formData.get("seo") || "{}");
    const parsedApplications = applications ? JSON.parse(applications) : null;

    // 🖼️ Handle gallery uploads (multiple images)
    const galleryFiles = formData.getAll("galleryFiles");
    const processedGallery = [];

    for (const file of galleryFiles) {
      const s3Url = await uploadToS3(file, `services/${slug}`);
      processedGallery.push({ url: s3Url });
    }

    // 🧱 Create full service entry with ALL fields + nested relations
    const newService = await prisma.service.create({
      data: {
        slug,
        title,
        shortTitle: shortTitle || "",
        shortDescription: shortDescription || "",
        description: description || "",
        imageUrl: imageUrl || "",
        priceRange: priceRange || "",
        moreInfoUrl: moreInfoUrl || "",
        applications: parsedApplications || null,

        // ✅ Nested relations
        seo: seo.title ? { create: seo } : undefined,
        features: features.length ? { create: features } : undefined,
        specifications: specifications.length ? { create: specifications } : undefined,
        testimonials: testimonials.length ? { create: testimonials } : undefined,
        gallery: processedGallery.length ? { create: processedGallery } : undefined,
        faqs: faqs.length ? { create: faqs } : undefined,
      },
      include: {
        seo: true,
        features: true,
        specifications: true,
        gallery: true,
        faqs: true,
        testimonials: true,
      },
    });

    return NextResponse.json({ success: true, data: newService });
  } catch (error) {
    console.error("Service creation error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

