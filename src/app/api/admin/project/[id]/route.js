import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { uploadToS3 } from "@/lib/uploadToS3";
import { deleteS3File, deleteS3Folder } from "@/lib/deleteS3Folder";

const prisma = new PrismaClient();

export async function GET(request, { params }) {
  const { id } = await params;
  try {
    const project = await prisma.project.findUnique({
      where: { id: parseInt(id) },
      include: {
        challengesAndSolutions: true,
        seo: true,
        images:true
      },
    });

    if (!project) {
      return NextResponse.json({ success: false, error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: project });
  } catch (error) {
    console.error("GET error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}


// This is project 

export async function DELETE(request, { params }) {
  const { id } = await params;
  const projectId = parseInt(id);

  try {
    const project = await prisma.project.findUnique({
      where: { id: projectId },
      include: { seo: true }, // so we can safely access seo info
    });

    if (!project) {
      return NextResponse.json(
        { success: false, error: "Project not found" },
        { status: 404 }
      );
    }

    // 🧹 Delete related data
    await prisma.challengesAndSolutions.deleteMany({ where: { projectId } });
    await prisma.galleryImage.deleteMany({ where: { projectId } });

    // Delete SEO if linked
    if (project.seoId) {
      await prisma.seo.delete({ where: { id: project.seoId } });
    }

    // Delete the project itself
    await prisma.project.delete({ where: { id: projectId } });

    // 🧠 Fix #1 — Use `project.slug`, not `service.slug`
    // You referenced `service.slug` but that variable doesn’t exist here.
    try {
      await deleteS3Folder(`projects/${project.slug}`);
      console.log(`🧹 Deleted S3 folder: projects/${project.slug}`);
    } catch (s3Error) {
      console.error("S3 cleanup failed:", s3Error);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}


export async function PATCH(request, { params }) {
  const { id } = await params;
  const projectId = Number(id);

  try {
    const formData = await request.formData();

    // Basic fields
    const project = await prisma.project.findUnique({
      where: { id: projectId },
    });
    
    if (!project) {
      throw new Error("Project not found");
    }
    
    const slug = project.slug;
    const name = formData.get("name");
    const client = formData.get("client");
    const location = formData.get("location");
    const completedOn = formData.get("completedOn")
      ? new Date(formData.get("completedOn"))
      : null;
    const description = formData.get("description");
    const serviceType = formData.get("serviceType");
    const category = formData.get("category");
    const finalOutcome = formData.get("finalOutcome");
    const keyProject =
      formData.get("keyProject") === "true" || formData.get("keyProject") === true;

    // 🧠 Handle main image
    let imgSourceUrl = formData.get("imgSource");
    if (imgSourceUrl instanceof File) {
      imgSourceUrl = await uploadToS3(imgSourceUrl, `projects/${slug}`);
    }

    // 🧩 Parse structured fields
    const seo = JSON.parse(formData.get("seo") || "{}");
    const challengesAndSolutions = JSON.parse(
      formData.get("challengesAndSolutions") || "[]"
    );
    const scope = JSON.parse(formData.get("scope") || "[]");
    const highlights = JSON.parse(formData.get("highlights") || "[]");
    const clientBenefits = JSON.parse(formData.get("clientBenefits") || "[]");

    // 🧠 Gallery handling
    const keepGalleryIds = JSON.parse(formData.get("keepGalleryIds") || "[]");
    const galleryFiles = formData.getAll("galleryFiles");

    // Fetch all existing gallery images
    const existingGallery = await prisma.galleryImage.findMany({
      where: { projectId },
    });

    // Determine which ones to delete
    const imagesToDelete = existingGallery.filter(
      (img) => !keepGalleryIds.includes(img.id)
    );

    // Delete from S3 + database
    for (const img of imagesToDelete) {
      const keyFromUrl = img.url.split(".amazonaws.com/")[1];
      if (keyFromUrl) {
        try {
          await deleteS3File(decodeURIComponent(keyFromUrl));
        } catch (err) {
          console.warn("S3 delete error:", err);
        }
      }
    }

    if (imagesToDelete.length > 0) {
      await prisma.galleryImage.deleteMany({
        where: { id: { in: imagesToDelete.map((img) => img.id) } },
      });
    }

    // Upload new gallery files
    const newGallery = [];
    for (const file of galleryFiles) {
      const s3Url = await uploadToS3(file, `projects/${slug}/gallery`);
      newGallery.push({ url: s3Url });
    }

    // ✅ Update project record
    const updatedProject = await prisma.project.update({
      where: { id: projectId },
      data: {
        name,
        client,
        location,
        completedOn,
        imgSource: imgSourceUrl,
        description,
        serviceType,
        category,
        finalOutcome,
        keyProject,
        scope,
        highlights,
        clientBenefits,

        // Replace challenges
        challengesAndSolutions: {
          deleteMany: {}, // wipe existing
          create: challengesAndSolutions.map((c) => ({
            title: c.title,
            challenge: c.challenge,
            solution: c.solution,
          })),
        },

        // Add new gallery images
        images: {
          create: newGallery,
        },

        // SEO upsert
        seo: seo.title
          ? {
              upsert: {
                update: { ...seo },
                create: { ...seo },
              },
            }
          : undefined,
      },
      include: {
        challengesAndSolutions: true,
        seo: true,
        images: true,
      },
    });

    return NextResponse.json({ success: true, data: updatedProject });
  } catch (error) {
    console.error("PATCH /project/:id error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
