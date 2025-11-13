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
    if (node.type === "image" && node.attrs?.src?.startsWith("blob:")) {
      const blobUrl = node.attrs.src;
      const file = filesMap[blobUrl];

      if (file) {
        const s3Url = await uploadToS3(file, folder);
        node.attrs.src = s3Url;
      }
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
