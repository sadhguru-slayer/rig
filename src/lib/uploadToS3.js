import { PutObjectCommand } from "@aws-sdk/client-s3";
import s3Client from "./s3Client";

export async function uploadToS3(file, folder = "misc") {
  const buffer = Buffer.from(await file.arrayBuffer());

  const fileName = `${folder}/${Date.now()}-${file.name.replace(/\s+/g, "_")}`;

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
