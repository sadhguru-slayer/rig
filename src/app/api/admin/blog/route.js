import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { uploadBlobsInContent } from "@/lib/uploadBlobsInContent";

import { generateUniqueSlug } from "@/lib/slugMaker";
import { uploadToS3 } from "@/lib/uploadToS3";
const prisma = new PrismaClient();

export async function POST(request) {
  try {
    const formData = await request.formData();

    // Parse JSON fields
    const contentJSON = JSON.parse(formData.get("content"));
    const tags = JSON.parse(formData.get("tags") || "[]");
    const seo = JSON.parse(formData.get("seo") || "{}");
    const slug = await generateUniqueSlug(formData.get("title"), "blog");
    let coverImageUrl = null;
    const coverImage = formData.get("coverImage");
    if (coverImage instanceof File) {
      // Upload the file to S3 (assuming the uploadToS3 function returns a URL)
      coverImageUrl = await uploadToS3(coverImage, `blogs/${slug}`);
    }
    // Build files map from FormData
    const filesMap = {};
    for (const file of formData.getAll("images")) {
      filesMap[file.name] = file;
    }

    // Replace blob previews with S3 URLs
    const updatedContent = await uploadBlobsInContent(contentJSON.content.content, filesMap, `blogs/${slug}`);

    const contentWithDoc = {
      type: "doc",
      content: updatedContent,
    };

    // Save blog
    const newBlog = await prisma.blog.create({
      data: {
        title: formData.get("title"),
        slug,
        excerpt: formData.get("excerpt"),
        coverImage: coverImageUrl || formData.get("coverImage"),
        author: formData.get("author"),
        published: formData.get("published") === "true",
        content: contentWithDoc,
        tags,
        readTime: parseInt(formData.get("readTime") || "0"),
        views: 0,
        seo: Object.keys(seo).length ? { create: { ...seo } } : undefined,
      },
      include: { seo: true },
    });

    return NextResponse.json({ success: true, data: newBlog });
  } catch (error) {
    console.error("Blog POST error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}



export async function GET() {
  try {
    const blogs = await prisma.blog.findMany({
      include: { seo: true },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ success: true, data: blogs });
  } catch (error) {
    console.error("🚨 Blog GET error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
