import { NextResponse } from "next/server";
import { uploadToS3 } from "@/lib/uploadToS3"; // you already have this helper

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");
    const folder = formData.get("folder") || "blogs/editor";

    if (!file || !(file instanceof File)) {
      return NextResponse.json(
        { success: false, error: "No file uploaded" },
        { status: 400 }
      );
    }

    // Upload to S3 under /editor folder
    const url = await uploadToS3(file, `${folder}/${Date.now()}-${file.name}`);

    return NextResponse.json({ success: true, url });
  } catch (error) {
    console.error("S3 upload failed:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
