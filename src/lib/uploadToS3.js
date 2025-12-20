import { PutObjectCommand } from "@aws-sdk/client-s3";
import s3Client from "./s3Client";

export async function uploadToS3(file, folder = "misc") {
  const buffer = Buffer.from(await file.arrayBuffer());

  let sanitizedName = file.name || "image";
  // console.log(sanitizedName)
  // If filename contains blob URL or weird characters, extract or generate a clean name
  if (sanitizedName.includes("blob:") || sanitizedName.includes("://")) {
    // Try to extract extension from file type
    const extension = file.type?.split("/")[1] || "png";
    sanitizedName = `image.${extension}`;
  } else {
    // Clean up the filename: remove special characters, keep only alphanumeric, dots, hyphens, underscores
    sanitizedName = sanitizedName.replace(/[^a-zA-Z0-9.\-_]/g, "_");
    // Ensure it has an extension
    if (!sanitizedName.includes(".")) {
      const extension = file.type?.split("/")[1] || "png";
      sanitizedName = `${sanitizedName}.${extension}`;
    }
  }

  const fileName = `${folder}/${Date.now()}-${sanitizedName}`;
  // console.log(fileName)
  await s3Client.send(
    new PutObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME,
      Key: fileName,
      Body: buffer,
      ContentType: file.type,
    })
  );

  // Public URL (bucket must be public OR served via Worker)
  const fileUrl = `${process.env.R2_PUBLIC_BASE_URL}/${fileName}`;
  return fileUrl;
}