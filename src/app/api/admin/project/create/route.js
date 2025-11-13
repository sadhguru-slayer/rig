import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { uploadToS3 } from "@/lib/uploadToS3";
import { generateUniqueSlug } from "@/lib/slugMaker";


const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const formData = await req.formData();

    // ✅ Extract simple fields
    const name = formData.get("name");
    const slug = await generateUniqueSlug(name, "project");
    const client = formData.get("client") || null;
    const location = formData.get("location") || null;
    const completedOn = formData.get("completedOn") || null;
    const description = formData.get("description") || null;
    const serviceType = formData.get("serviceType") || null;
    const category = formData.get("category") || null;
    const finalOutcome = formData.get("finalOutcome") || null;
    const keyProject = formData.get("keyProject") === "true";

    // ✅ Parse JSON fields safely
    const safeParse = (str, fallback) => {
      if (!str) return fallback;
      try {
        return JSON.parse(str);
      } catch {
        return fallback;
      }
    };

    const scope = safeParse(formData.get("scope"), []);
    const highlights = safeParse(formData.get("highlights"), []);
    const clientBenefits = safeParse(formData.get("clientBenefits"), []);
    const seo = safeParse(formData.get("seo"), {});
    const challengesAndSolutions = safeParse(formData.get("challengesAndSolutions"), []);

    // ✅ Upload single main image (imgSource)
    let imgSource = null;
    const imgSourceFile = formData.get("imgSourceFile");
    if (imgSourceFile && imgSourceFile.name) {
      imgSource = await uploadToS3(imgSourceFile, `projects/${slug}`);
    } else if (formData.get("imgSource")) {
      imgSource = formData.get("imgSource");
    }

    // ✅ Upload gallery files
    const galleryFiles = formData.getAll("galleryFiles");
    const existingGalleryUrls = formData.getAll("existingGalleryUrls");
    const galleryUrls = [];

    for (const file of galleryFiles) {
      if (file && file.name) {
        const uploadedUrl = await uploadToS3(file, `projects/${slug}/gallery`);
        galleryUrls.push(uploadedUrl);
      }
    }

    if (existingGalleryUrls.length > 0) {
      galleryUrls.push(...existingGalleryUrls);
    }

    // ✅ Create project in DB
    const newProject = await prisma.project.create({
      data: {
        slug,
        name,
        client,
        location,
        completedOn: completedOn ? new Date(completedOn) : null,
        imgSource,
        description,
        serviceType,
        category,
        finalOutcome,
        keyProject,
        scope,
        highlights,
        clientBenefits,
        seo: seo
          ? {
              create: {
                title: seo.title || "",
                description: seo.description || "",
                keywords: seo.keywords || [],
                canonicalUrl: seo.canonicalUrl || null,
                ogImage: seo.ogImage || null,
              },
            }
          : undefined,
        challengesAndSolutions:
          challengesAndSolutions && challengesAndSolutions.length > 0
            ? {
                create: challengesAndSolutions.map((cs) => ({
                  challenge: cs.challenge,
                  solution: cs.solution,
                })),
              }
            : undefined,
        images:
          galleryUrls.length > 0
            ? {
                create: galleryUrls.map((url) => ({
                  url,
                })),
              }
            : undefined,
      },
      include: {
        seo: true,
        challengesAndSolutions: true,
        images: true,
      },
    });

    return NextResponse.json({ success: true, data: newProject });
  } catch (error) {
    console.error("❌ POST /project/create error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
