import prisma from "@/lib/prisma";
import slugify from "slugify";

export async function generateUniqueSlug(title, type) {
  // Convert title → slug
  let baseSlug = slugify(title, { lower: true, strict: true });
  let slug = baseSlug;
  let counter = 1;

  // Pick model based on type
  let model;
  switch (type) {
    case "project":
      model = prisma.project;
      break;
    case "service":
      model = prisma.service;
      break;
    case "blog":
      model = prisma.blog;
      break;
    default:
      throw new Error("Invalid type for slug generation");
  }

  // Ensure uniqueness
  while (true) {
    const exists = await model.findUnique({ where: { slug } });
    if (!exists) break;
    slug = `${baseSlug}-${counter++}`;
  }

  return slug;
}
