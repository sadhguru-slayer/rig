"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { useRouter } from "next/navigation";

// ShadCN UI imports
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { toast } from "sonner"

import SeoForm from "@/components/admin/project/SeoForm";

// Dynamic import for TipTap editor
const SimpleEditor = dynamic(
  () =>
    import("@/components/tiptap-templates/simple/simple-editor").then(
      (mod) => mod.SimpleEditor
    ),
  { ssr: false }
);

export default function BlogCreate() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    coverImage: "",
    author: "",
    published: false,
    content: {},
    tags: [],
    readTime: "",
    views: 0,
    seo: {
      title: "",
      description: "",
      keywords: [],
      canonicalUrl: "",
      ogImage: "",
    },
  });
  const [uploadedFilesMap, setUploadedFilesMap] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      formDataToSend.append("excerpt", formData.excerpt);
       if (formData.coverImage) {
      formDataToSend.append("coverImage", formData.coverImage); // Send the file itself
    }
      formDataToSend.append("author", formData.author);
      formDataToSend.append("published", formData.published);
      formDataToSend.append("tags", JSON.stringify(formData.tags));
      formDataToSend.append("readTime", formData.readTime);
      formDataToSend.append("seo", JSON.stringify(formData.seo));

      const contentWithDocType = {
        type: "doc",
        content: formData.content,
      };
      formDataToSend.append("content", JSON.stringify(contentWithDocType));

      for (const [fileName, file] of Object.entries(uploadedFilesMap)) {
        formDataToSend.append("images", file, fileName);
      }

      const res = await fetch("/api/admin/blog", {
        method: "POST",
        body: formDataToSend,
      });

      const data = await res.json();
      if (data.success) {
 
        toast.success("Success", {
        description: "Blog saved successfully!",
      });
        router.push("/admin/blog");
      
      } else {
        toast.error("Error", {
        description: data.error || "Failed to save blog.",
      });
      }
    } catch (err) {
      console.error(err);
      toast.error("Error", {
      description: err.message || "Something went wrong while updating the blog.",
    });
    } finally {
      setIsSubmitting(false);

    }
  };

  return (
    <div className="max-w-7xl p-2 md:p-4 mx-auto mt-10 space-y-6 overflow-x-auto">
      <h1 className="text-3xl font-semibold mb-4">Create New Blog</h1>
<div
  className={`flex flex-col p-2 md:p-4 gap-4 border rounded transition-opacity duration-200 ${
    isSubmitting ? "opacity-50 pointer-events-none" : "opacity-100"
  }`}
>
      {/* Title */}
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          placeholder="Enter blog title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
      </div>


      {/* Excerpt */}
      <div className="space-y-2">
        <Label htmlFor="excerpt">Summary</Label>
        <Textarea
          id="excerpt"
          placeholder="Short summary of your blog..."
          value={formData.excerpt}
          onChange={(e) =>
            setFormData({ ...formData, excerpt: e.target.value })
          }
        />
      </div>

      {/* Cover Image */}
<div className="space-y-2">
  <Label htmlFor="coverImage">Cover Image</Label>
  <Input
    id="coverImage"
    type="file"
    onChange={(e) =>
      setFormData({ ...formData, coverImage: e.target.files[0] })
    }
  />
</div>


      {/* Author */}
      <div className="space-y-2">
        <Label htmlFor="author">Author</Label>
        <Input
          id="author"
          type="text"
          placeholder="Author name"
          value={formData.author}
          onChange={(e) => setFormData({ ...formData, author: e.target.value })}
        />
      </div>

      {/* Tags */}
      <div className="space-y-2">
        <Label htmlFor="tags">Tags (comma separated)</Label>
        <Input
          id="tags"
          type="text"
          placeholder="tech, programming, blog"
          value={formData.tags.join(", ")}
          onChange={handleTagsChange}
        />
      </div>

      {/* Read Time */}
      <div className="space-y-2">
        <Label htmlFor="readTime">Read Time (minutes)</Label>
        <Input
          id="readTime"
          type="number"
          placeholder="5"
          value={formData.readTime}
          onChange={(e) =>
            setFormData({
              ...formData,
              readTime: parseInt(e.target.value) || "",
            })
          }
        />
      </div>

      {/* Published Checkbox */}
      <div className="flex items-center space-x-2">
        <Checkbox
          id="published"
          checked={formData.published}
          onCheckedChange={(checked) =>
            setFormData({ ...formData, published: checked })
          }
        />
        <Label htmlFor="published">Published</Label>
      </div>

      {/* Content Editor */}
      <div className="space-y-2">
        <Label>Blog Content</Label>
        <div className="border rounded-lg p-3 bg-white shadow-sm">
          <SimpleEditor
            content={formData.content}
            onChange={handleEditorChange}
            setUploadedFilesMap={setUploadedFilesMap}
          />
        </div>
      </div>

      {/* SEO Form */}
      <div className="border-t pt-6">
        <h2 className="text-xl font-semibold mb-3">SEO Settings</h2>
        <SeoForm data={formData.seo} onChange={handleSeoChange} />
      </div>

      {/* Submit Button */}
      <Button
        onClick={handleSubmit}
        disabled={isSubmitting}
        className="mt-6 w-full bg-teal-600 hover:bg-teal-700 text-white font-medium"
      >
        {isSubmitting ? "Saving..." : "Save Blog"}
      </Button>
    </div>
    </div>
  );
}
