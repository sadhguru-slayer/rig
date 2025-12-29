import { uploadToS3 } from "@/lib/uploadToS3";

/**
 * Traverse TipTap/ProseMirror content and replace blob URLs with S3 URLs.
 * @param {Array} nodes - Content nodes array
 * @param {Object} filesMap - Map of blob URLs to File objects
 * @param {string} folder - S3 folder path
 * @returns {Array} Updated content nodes with S3 URLs
 */
export async function uploadBlobsInContent(nodes, filesMap, folder = "misc") {
  async function traverse(node) {
    if (node.type === "image" && node.attrs?.src) {
      const src = node.attrs.src;
      
      // Only process blob URLs (new uploads), skip already uploaded S3 URLs
      if (src.startsWith("blob:")) {
        const blobUrl = src;
        const file = filesMap[blobUrl];
        
        // Only upload if file exists in the map (new upload)
        // If file doesn't exist, it means the blob URL is stale or was already processed
        if (file && file instanceof File) {
          const s3Url = await uploadToS3(file, folder);
          // console.log("S3Url:",s3Url)
          node.attrs.src = s3Url;
        } else {
          // Blob URL exists in content but file not in map - this shouldn't happen
          // but if it does, we'll leave it as is (or could log a warning)
          console.warn(`Blob URL found in content but file not in map: ${blobUrl}`);
        }
      }
      // If src is already an S3 URL or other URL, leave it unchanged
    }

    if (node.content) {
      for (const child of node.content) {
        await traverse(child);
      }
    }
  }

  for (const node of nodes) {
    await traverse(node);
  }

  return nodes;
}
