// api/admin/blog/[id]/route.js

import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { uploadBlobsInContent } from "@/lib/uploadBlobsInContent";
import {deleteS3Folder, deleteS3File } from "@/lib/deleteS3Folder";
import { uploadToS3 } from "@/lib/uploadToS3";

const prisma = new PrismaClient();


export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    const numericId = Number(id);

    // Fetch the blog first to get its slug
    const blog = await prisma.blog.findUnique({
      where: { id: numericId },
      select: { slug: true },
    });

    if (!blog) {
      return NextResponse.json(
        { success: false, error: "Blog not found" },
        { status: 404 }
      );
    }

    // Delete all S3 images under the blog's slug folder
    if (blog.slug) {
      try {
        await deleteS3Folder(`blogs/${blog.slug}`);
      } catch (err) {
        console.warn("S3 folder deletion failed:", err);
        // Continue to delete the blog even if S3 deletion fails
      }
    }

    // Delete the blog from DB
    await prisma.blog.delete({
      where: { id: numericId },
    });

    return NextResponse.json({
      success: true,
      message: "Blog and its images deleted successfully",
    });
  } catch (error) {
    console.error("🚨 Blog DELETE error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function GET(request, { params }) {
  const { id } = await params;
  try {
    const blog = await prisma.blog.findUnique({
      where: { id: parseInt(id) },
      include: {
        seo: true,
      },
    });

    if (!blog) {
      return NextResponse.json({ success: false, error: "blog not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: blog });
  } catch (error) {
    console.error("GET error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}


// Helper to extract all image URLs from TipTap content
const extractImageUrls = (content) => {
  const urls = [];
  if (!Array.isArray(content)) content = [content];

  const traverse = (node) => {
    if (node.type === "image" && node.attrs?.src) urls.push(node.attrs.src);
    if (node.content) node.content.forEach(traverse);
  };

  content.forEach(traverse);
  return urls;
};

export async function PATCH(request, { params }) {
  const { id } = await params;
  const numericId = Number(id);

  try {
    const formData = await request.formData();
    const blog = await prisma.blog.findUnique({
      where: { id: numericId },
    });
    
    if (!blog) {
      throw new Error("Project not found");
    }
    
    const slug = blog.slug;
    // Parse JSON fields
    const contentJSON = JSON.parse(formData.get("content"));
    const tags = JSON.parse(formData.get("tags") || "[]");
    const seo = JSON.parse(formData.get("seo") || "{}");
let coverImageUrl = null;
    const coverImage = formData.get("coverImage");
    if (coverImage instanceof File) {
      // Upload the file to S3 (assuming the uploadToS3 function returns a URL)
      coverImageUrl = await uploadToS3(coverImage, `blogs/${slug}`);
    }
    // Build files map from FormData (newly uploaded images)
    const filesMap = {};
    for (const file of formData.getAll("images")) {
      filesMap[file.name] = file;
    }

    // Fetch existing blog
    const existingBlog = await prisma.blog.findUnique({ where: { id: numericId } });
    if (!existingBlog) {
      return NextResponse.json({ success: false, error: "Blog not found" }, { status: 404 });
    }

    // Extract old and new image URLs
    const oldImageUrls = extractImageUrls(existingBlog.content.content);
    const newImageUrls = extractImageUrls(contentJSON.content.content);

    // Delete orphan images
    const orphanImages = oldImageUrls.filter((url) => !newImageUrls.includes(url));
    for (const img of orphanImages) {
      const keyFromUrl = img.split(".amazonaws.com/")[1];
      if (keyFromUrl) {
        try {
          await deleteS3File(decodeURIComponent(keyFromUrl));
        } catch (err) {
          console.warn("S3 delete error:", err);
        }
      }
    }

    // Upload any new blob images to S3
    const contentWithS3Urls = await uploadBlobsInContent(
      contentJSON.content.content,
      filesMap,
      `blogs/${slug}`
    );

    const contentWithDoc = {
      type: "doc",
      content: contentWithS3Urls,
    };

    // Update blog in DB
    const updatedBlog = await prisma.blog.update({
      where: { id: numericId },
      data: {
        title: formData.get("title"),
        excerpt: formData.get("excerpt"),
        coverImage: coverImageUrl || formData.get("coverImage"),
        author: formData.get("author"),
        published: formData.get("published") === "true",
        content: contentWithDoc,
        tags,
        readTime: parseInt(formData.get("readTime") || "0"),
        seo: Object.keys(seo).length
          ? { upsert: { create: seo, update: seo } }
          : undefined,
      },
      include: { seo: true },
    });

    return NextResponse.json({ success: true, data: updatedBlog });
  } catch (error) {
    console.error("PATCH blog error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
