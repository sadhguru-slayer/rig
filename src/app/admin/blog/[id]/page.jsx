"use client";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import SeoForm from "@/components/admin/project/SeoForm";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Divider from "@/components/Divider";

const SimpleEditor = dynamic(
  () =>
    import("@/components/tiptap-templates/simple/simple-editor").then(
      (mod) => mod.SimpleEditor
    ),
  { ssr: false }
);

export default function BlogDetails() {
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploadedFilesMap, setUploadedFilesMap] = useState({});
  const [oldImageUrls, setOldImageUrls] = useState([]); // Store old image URLs

  // Fetch blog data
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await fetch(`/api/admin/blog/${id}`);
        const data = await res.json();
        if (data.success) {
          const oldImages = extractImageUrls(data.data.content);
          console.log(data.data.content)
          setOldImageUrls(oldImages); // Set initial old image URLs
          setFormData({
            ...data.data,
            content: data.data.content || "", // Ensure content is always initialized
          });
        } else {
          alert("Failed to load blog");
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id]);

  // Extract image URLs from content
  const extractImageUrls = (content) => {
  const imageUrls = [];
  
  // Ensure content is an array
  if (!Array.isArray(content)) {
    content = [content]; // If it's not an array, wrap it in an array
  }

  const traverse = (node) => {
    if (node.type === "image" && node.attrs?.src) {
      imageUrls.push(node.attrs.src);
    }
    if (node.content) {
      for (const child of node.content) {
        traverse(child);
      }
    }
  };

  content.forEach((node) => traverse(node));
  
  return imageUrls;
};


  const handleEditorChange = (jsonContent) => {
    setFormData((prev) => ({ ...prev, content: jsonContent }));
  };

  const handleTagsChange = (e) => {
    const tagsArray = e.target.value.split(",").map((t) => t.trim());
    setFormData((prev) => ({ ...prev, tags: tagsArray }));
  };

  const handleSeoChange = (seoData) => {
    setFormData((prev) => ({ ...prev, seo: seoData }));
  };
const handleUpdate = async () => {
  setLoading(true); // ✅ Start loading
  try {
    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append("excerpt", formData.excerpt);
    formDataToSend.append("coverImage", formData.coverImage);
    formDataToSend.append("author", formData.author);
    formDataToSend.append("published", formData.published);
    formDataToSend.append("tags", JSON.stringify(formData.tags));
    formDataToSend.append("readTime", formData.readTime);
    formDataToSend.append("seo", JSON.stringify(formData.seo));

    // ✅ Add TipTap content (with proper doc type)
    const contentWithDocType = { type: "doc", content: formData.content };
    formDataToSend.append("content", JSON.stringify(contentWithDocType));

    // ✅ Add new uploaded files
    for (const [fileName, file] of Object.entries(uploadedFilesMap)) {
      formDataToSend.append("images", file, fileName);
    }

    const res = await fetch(`/api/admin/blog/${id}`, {
      method: "PATCH",
      body: formDataToSend, // no headers — FormData handles it
    });

    const data = await res.json();

    if (data.success) {
      toast.success("Success", {
        description: "Blog updated successfully!",
      });
    } else {
      toast.error("Error", {
        description: data.error || "Failed to update blog.",
      });
    }
  } catch (err) {
    console.error("Error updating blog:", err);
    toast.error("Error", {
      description: err.message || "Something went wrong while updating the blog.",
    });
  } finally {
    setLoading(false); // ✅ Stop loading always
  }
};



  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this blog?")) return;

    try {
      const res = await fetch(`/api/admin/blog/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        alert("Blog deleted!");
        router.push("/admin/blog");
      } else {
        alert("Failed to delete blog: " + data.error);
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (!formData) return <div>Blog not found</div>;

  return (
<div className="max-w-4xl p-2 md:p-4 mx-auto mt-8 space-y-6">
  <h1 className="text-2xl font-bold">Edit Blog</h1>
<div
  className={`flex flex-col p-2 md:p-4 border rounded transition-opacity duration-200 ${
    loading ? "opacity-50 pointer-events-none" : "opacity-100"
  }`}
>
<div className="p-2 flex flex-col gap-3 w-full">
  {/* Title */}
  <div className="space-y-1">
    <Label htmlFor="title">Title</Label>
    <Input
      id="title"
      placeholder="Title"
      value={formData.title}
      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
    />
  </div>

  {/* Slug (read-only) */}
  <div className="space-y-1">
    <Label htmlFor="slug">Slug</Label>
    <Input
      id="slug"
      value={formData.slug}
      readOnly
      className="bg-gray-100 cursor-not-allowed"
    />
  </div>

  {/* Excerpt */}
  <div className="space-y-1">
    <Label htmlFor="excerpt">Excerpt</Label>
    <Textarea
      id="excerpt"
      placeholder="Excerpt"
      value={formData.excerpt || ""}
      onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
    />
  </div>

  {/* Cover Image */}
  <div className="space-y-1">
    <Label htmlFor="coverImage">Cover Image URL</Label>
    <Input
      id="coverImage"
      placeholder="Cover Image URL"
      value={formData.coverImage || ""}
      onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
    />
  </div>

  {/* Author */}
  <div className="space-y-1">
    <Label htmlFor="author">Author</Label>
    <Input
      id="author"
      placeholder="Author"
      value={formData.author || ""}
      onChange={(e) => setFormData({ ...formData, author: e.target.value })}
    />
  </div>

  {/* Tags */}
  <div className="space-y-1">
    <Label htmlFor="tags">Tags (comma separated)</Label>
    <Input
      id="tags"
      placeholder="Tags"
      value={formData.tags?.join(", ") || ""}
      onChange={handleTagsChange}
    />
  </div>

  {/* Read Time */}
  <div className="space-y-1">
    <Label htmlFor="readTime">Read Time (minutes)</Label>
    <Input
      id="readTime"
      type="number"
      placeholder="Read Time"
      value={formData.readTime || ""}
      onChange={(e) =>
        setFormData({ ...formData, readTime: parseInt(e.target.value) || "" })
      }
    />
  </div>

  {/* Published */}
  <div className="flex items-center space-x-2">
    <Checkbox
      id="published"
      checked={formData.published}
      onCheckedChange={(checked) =>
        setFormData({ ...formData, published: Boolean(checked) })
      }
    />
    <Label htmlFor="published">Published</Label>
  </div>
  </div>
<Divider/>
  {/* Content */}
  <div className="space-y-2 p-2">
    <h2 className="text-lg font-semibold">Content</h2>
    <div className="border rounded-lg shadow-sm bg-white p-2 min-h-[200px]">
      {formData.content ? (
        <SimpleEditor
          content={formData.content}
          onChange={handleEditorChange}
          setUploadedFilesMap={setUploadedFilesMap}
        />
      ) : (
        <div>Loading content...</div>
      )}
    </div>
  </div>
<Divider/>

  {/* SEO Form */}
  <div className="border-t pt-4 mt-6 p-2">
    <SeoForm existingSeo={formData.seo} onChange={handleSeoChange} />
  </div>
<Divider/>

  {/* Actions */}
  <div className="flex gap-2 mt-4">
  <Button 
    disabled={loading} 
    variant="default" 
    onClick={handleUpdate} 
    className="bg-green-600 hover:bg-green-700"
  >
    {loading ? "Updating..." : "Update Blog"}
  </Button>

  <Button 
    disabled={loading} 
    variant="destructive" 
    onClick={handleDelete}
  >
    {loading ? "Please wait..." : "Delete Blog"}
  </Button>
</div>

  </div>
</div>
  );
}
