import { ListObjectsV2Command, DeleteObjectsCommand } from "@aws-sdk/client-s3";
import s3Client from "./s3Client";

// 🧹 Deletes all objects under a prefix (like "services/<slug>/")
export async function deleteS3Folder(prefix) {
  try {
    const Bucket = process.env.R2_BUCKET_NAME;

    // List all objects under that prefix
    const listedObjects = await s3Client.send(
      new ListObjectsV2Command({
        Bucket,
        Prefix: prefix.endsWith("/") ? prefix : `${prefix}/`, // ensure trailing slash
      })
    );

    if (!listedObjects.Contents || listedObjects.Contents.length === 0) {
      console.log(`No S3 files found under: ${prefix}`);
      return;
    }

    // Prepare keys to delete
    const deleteParams = {
      Bucket,
      Delete: {
        Objects: listedObjects.Contents.map((item) => ({ Key: item.Key })),
      },
    };

    // Delete all listed objects
    await s3Client.send(new DeleteObjectsCommand(deleteParams));

    console.log(`✅ Deleted all files under: ${prefix}`);
  } catch (error) {
    console.error("❌ Error deleting S3 folder:", error);
    throw error;
  }
}


import { DeleteObjectCommand } from "@aws-sdk/client-s3";

export async function deleteS3File(key) {
  try {
    const Bucket = process.env.R2_BUCKET_NAME;
    await s3Client.send(new DeleteObjectCommand({ Bucket, Key: key }));
    console.log(`✅ Deleted S3 file: ${key}`);
  } catch (error) {
    console.error("❌ Error deleting S3 file:", error);
  }
}

