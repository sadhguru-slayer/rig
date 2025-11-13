import { PutObjectCommand } from "@aws-sdk/client-s3";
import s3Client from "./s3Client";

export async function uploadToS3(file, folder = "misc") {
  const buffer = Buffer.from(await file.arrayBuffer());
  const fileName = `${folder}/${Date.now()}-${file.name.replace(/\s+/g, "_")}`;
  const command = new PutObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: fileName,
    Body: buffer,
    ContentType: file.type,
  });

  await s3Client.send(command);

  const fileUrl = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;
  return fileUrl;
}
