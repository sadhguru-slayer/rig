"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import SeoForm from "@/components/admin/project/SeoForm";
import ChallengesAndSolutionsForm from "@/components/admin/project/ChallengesAndSolutionsForm";
import { GalleryForm } from "@/components/admin/service";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox"
import Divider from "@/components/Divider";
import { toast } from "sonner";

const ProjectUpdate = () => {
  const { id } = useParams();
  const router = useRouter();

  const [project, setProject] = useState(null);
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);


  
    const fetchProject = async () => {
      try {
        const res = await fetch(`/api/admin/project/${id}`);
        const data = await res.json();
        if (data.success) {
          const projectData = data.data;
          console.log(projectData)

          // ✅ Convert existing gallery into preview-ready structure
          const galleryItems = (projectData.images || []).map((img) => ({
            url: img.url,
            existing: true,
          }));
          setProject(projectData);
          setGallery(galleryItems);
        } else {
          alert(data.error);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    if (!id) return;


    fetchProject();
  }, [id,]);

  const handleChange = (field, value) =>
    setProject((prev) => ({ ...prev, [field]: value }));

  const handleArrayChange = (field, index, value) => {
    const updated = [...project[field]];
    updated[index] = value;
    setProject((prev) => ({ ...prev, [field]: updated }));
  };

  const handleAddItem = (field) =>
    setProject((prev) => ({ ...prev, [field]: [...prev[field], ""] }));

  const handleRemoveItem = (field, index) =>
    setProject((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));

  // ✅ Convert state to FormData for PATCH
const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    const formData = new FormData();

    // ✅ Exclude non-editable or nested fields
    const excludeFields = [
      "seo",
      "challengesAndSolutions",
      "id",
      "createdAt",
      "updatedAt",
      "images", // handled separately
    ];

    // ✅ Append simple fields
    Object.entries(project).forEach(([key, value]) => {
      if (excludeFields.includes(key)) return;

      if (Array.isArray(value)) {
        formData.append(key, JSON.stringify(value));
      } else if (typeof value === "object" && value !== null) {
        // Only stringify plain objects — not File or Date
        if (value instanceof File) return; // handled separately below
        formData.append(key, JSON.stringify(value));
      } else {
        formData.append(key, value ?? "");
      }
    });

    // ✅ Append boolean safely
    formData.append("keyProject", project.keyProject ? "true" : "false");

    // ✅ Handle main image (imgSource)
    if (project.imgSource instanceof File) {
      console.log("🖼 Uploading new image:", project.imgSource.name);
      formData.append("imgSource", project.imgSource); // File upload
    } else if (typeof project.imgSource === "string" && project.imgSource.trim() !== "") {
      console.log("🖼 Keeping existing image URL:", project.imgSource);
      formData.append("imgSource", project.imgSource); // Existing URL
    }

    // ✅ Handle gallery images
    const keepIds = [];

    gallery.forEach((img) => {
      if (img.id) {
        // existing gallery image in DB
        keepIds.push(img.id);
      } else if (img.file) {
        // newly added file
        formData.append("galleryFiles", img.file);
      }
    });

    // Tell backend which gallery images to keep
    formData.append("keepGalleryIds", JSON.stringify(keepIds));

    // ✅ Nested fields
    if (project.seo) {
      formData.append("seo", JSON.stringify(project.seo));
    }
    if (project.challengesAndSolutions) {
      formData.append(
        "challengesAndSolutions",
        JSON.stringify(project.challengesAndSolutions)
      );
    }

    // ✅ Submit to API
    const res = await fetch(`/api/admin/project/${id}`, {
      method: "PATCH",
      body: formData,
    });

    const data = await res.json();

    if (data.success) {
      toast.success("Success", {
          description: "Project updated successfully!",
        });
      ;
    } else {
      toast.error("Error", {
          description: data.error || "Failed to save Project",
      });
    }
  } catch (error) {
    console.error("Error updating project:", error);
    toast.error("Error", {
        description: data.error || "❌ Something went wrong while updating project.",
      });
  }finally{
        setLoading(false);

  }
};



  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    try {
      const res = await fetch(`/api/admin/project/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        alert("Project deleted successfully");
        router.push("/admin/project");
      } else {
        alert(data.error);
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (!project) return <div>Project not found</div>;

  return (
    <div className="p-2 md:p-4 max-w-4xl mx-auto !min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Update Project</h1>
      <form onSubmit={handleSubmit} 
       className={`flex flex-col p-4 border rounded transition-opacity duration-200 ${
    loading ? "opacity-50 pointer-events-none" : "opacity-100"
  }`}
      >
  {/* Basic Info */}
  <div className="space-y-2">
    <h2 className="font-semibold mb-2">Basic Info</h2>

{[
  ["Slug", "slug"],
  ["Name", "name"],
  ["Client", "client"],
  ["Location", "location"],
  ["Completed On", "completedOn", "date"],
  ["Description", "description", "textarea"],
  ["Service Type", "serviceType"],
  ["Category", "category"],
  ["Final Outcome", "finalOutcome"],
].map(([label, key, type]) => (
  <div key={key} className="space-y-1">
    <label className="block text-sm font-medium">{label}</label>

    {type === "textarea" ? (
      <Textarea
        value={project[key] || ""}
        onChange={(e) => handleChange(key, e.target.value)}
        className="w-full"
      />
    ) : key === "slug" ? (
      <Input
        value={project[key] || ""}
        readOnly
        className="w-full bg-gray-100 cursor-not-allowed"
      />
    ) : (
      <Input
        type={type || "text"}
        value={type === "date" ? project[key]?.split("T")[0] || "" : project[key] || ""}
        onChange={(e) => handleChange(key, e.target.value)}
        className="w-full"
      />
    )}
  </div>
))}


    <div className="mb-2">
      {project.imgSource && (
        <div className="mb-2">
          <img
            src={project.imgSource}
            alt="Project Preview"
            className="w-24 max-h-64 object-cover rounded"
          />
        </div>
      )}

      <Input
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files[0];
          if (file) handleChange("imgSource", file);
        }}
      />
    </div>

    <div className="flex items-center gap-2">
      <Checkbox
        checked={project.keyProject}
        onCheckedChange={(checked) => handleChange("keyProject", checked)}
      />
      <label className="text-sm font-medium">Key Project</label>
    </div>
  </div>
    <Divider/>

  {/* ✅ Gallery */}
  <GalleryForm
    existingGallery={gallery}
    onChange={(updatedGallery) => {
      setGallery(updatedGallery); // ✅ update gallery state
      handleChange("images", updatedGallery);
    }}
    type="Project"
  />
    <Divider/>

  {/* JSON Fields */}
  {["scope", "highlights", "clientBenefits"].map((field) => (
    <React.Fragment key={field}>
    <div  className="p-2 space-y-2">
      <h2 className="font-semibold mb-2">
        {field.charAt(0).toUpperCase() + field.slice(1)}
      </h2>
      {project[field]?.map((item, i) => (
        <div key={i} className="flex flex-col md:flex-row items-end md:items-center gap-2 mb-2">
          <Input
            type="text"
            value={item}
            onChange={(e) => handleArrayChange(field, i, e.target.value)}
            className="flex-1"
          />
          <Button
            variant="destructive"
            size="sm"
            onClick={() => handleRemoveItem(field, i)}
          >
            Remove
          </Button>
        </div>
      ))}
      <Button type="button" onClick={() => handleAddItem(field)}>
        Add {field}
      </Button>
    </div>
    <Divider/>
    </React.Fragment>
  ))}

  {/* SEO Form */}
  <SeoForm
    existingSeo={project.seo}
    onChange={(seoData) => setProject((prev) => ({ ...prev, seo: seoData }))}
  />
    <Divider/>

  {/* Challenges & Solutions */}
  <ChallengesAndSolutionsForm
    data={project.challengesAndSolutions}
    onChange={(data) => setProject((prev) => ({ ...prev, challengesAndSolutions: data }))}
  />
    <Divider/>

  {/* Submit / Delete */}
  <div className="flex gap-2 mt-4">
    <Button type="submit" className="bg-blue-500 hover:bg-blue-600">
      Update Project
    </Button>
    
    <Button type="button" variant="destructive" onClick={handleDelete}>
      Delete Project
    </Button>
  </div>
</form>
    </div>
  );
};

export default ProjectUpdate;
