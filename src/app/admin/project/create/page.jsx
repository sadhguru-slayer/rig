"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

import SeoForm from "@/components/admin/project/SeoForm";
import ChallengesAndSolutionsForm from "@/components/admin/project/ChallengesAndSolutionsForm";
import { GalleryForm } from "@/components/admin/service";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox"
import Divider from "@/components/Divider";
import { toast } from "sonner";

const ProjectCreation = () => {
  const router = useRouter();
  const [loading,setLoading] = useState(false);
  const [project, setProject] = useState({
    name: "",
    client: "",
    location: "",
    completedOn: "",
    imgSource: "",
    description: "",
    serviceType: "",
    category: "",
    finalOutcome: "",
    keyProject: false,
    images: [""],
    scope: [""],
    highlights: [""],
    clientBenefits: [""],
    seo: {
      title: "",
      description: "",
      keywords: [],
      canonicalUrl: "",
      ogImage: "",
    },
    challengesAndSolutions: [],
  });
const [gallery, setGallery] = useState(project?.images || []);

  const handleChange = (field, value) => setProject((prev) => ({ ...prev, [field]: value }));
  
  const handleArrayChange = (field, index, value) => {
    const updated = [...project[field]];
    updated[index] = value;
    setProject((prev) => ({ ...prev, [field]: updated }));
  };
  const handleAddItem = (field) => setProject((prev) => ({ ...prev, [field]: [...prev[field], ""] }));
  const handleRemoveItem = (field, index) =>
    setProject((prev) => ({ ...prev, [field]: prev[field].filter((_, i) => i !== index) }));

  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  try {
    const formData = new FormData();

    // ✅ Basic Info
    formData.append("name", project.name);
    formData.append("client", project.client || "");
    formData.append("location", project.location || "");
    formData.append("completedOn", project.completedOn || "");
    formData.append("description", project.description || "");
    formData.append("serviceType", project.serviceType || "");
    formData.append("category", project.category || "");
    formData.append("finalOutcome", project.finalOutcome || "");
    formData.append("keyProject", project.keyProject ? "true" : "false");

    // ✅ Single image upload (imgSource)
    // If project.imgSource is a File
    if (project.imgSource instanceof File) {
      formData.append("imgSourceFile", project.imgSource);
    } else if (typeof project.imgSource === "string" && project.imgSource.trim() !== "") {
      // If you still allow URLs (optional)
      formData.append("imgSource", project.imgSource);
    }

    // ✅ Arrays (convert to JSON strings)
    formData.append("scope", JSON.stringify(project.scope || []));
    formData.append("highlights", JSON.stringify(project.highlights || []));
    formData.append("clientBenefits", JSON.stringify(project.clientBenefits || []));

    // ✅ SEO (object)
    formData.append("seo", JSON.stringify(project.seo || {}));

    // ✅ Challenges & Solutions
    formData.append("challengesAndSolutions", JSON.stringify(project.challengesAndSolutions || []));

    // ✅ Gallery images
    if (Array.isArray(project.images)) {
      project.images.forEach((imgObj, i) => {
        if (imgObj?.file instanceof File) {
          formData.append("galleryFiles", imgObj.file);
        } else if (typeof imgObj === "string" && imgObj.trim() !== "") {
          // In case it's an existing image URL
          formData.append("existingGalleryUrls", imgObj);
        }
      });
    }

    // Debug (optional)
    // for (let [key, value] of formData.entries()) {
    //   console.log(key, value);
    // }

    // ✅ Send to API route
    const res = await fetch("/api/admin/project/create", {
      method: "POST",
      body: formData, // no headers
    });

    const data = await res.json();
    if (data.success) {
      toast.success(
        "Success",{
          description:"Successfully created project"
        }
      )
      router.push("/admin/project");
    } else {
      toast.error(
        "Error",{
          description:"❌ Error: " + (data.error || "Failed to create project")
        }
      )
      
    }
  } catch (error) {
    console.error("Error creating project:", error);
    toast.error(
        "Error",{
          description:"Error creating project: " + error.message
        }
      )
  }finally{
    setLoading(false);
  }
};


  return (
    <div className="p-1 md:p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Create Project</h1>
      <form onSubmit={handleSubmit} 
      className={`flex flex-col p-4 border rounded transition-opacity duration-200 ${
    loading ? "opacity-50 pointer-events-none" : "opacity-100"
  }`}
      >
<div className="">
  <h2 className="font-bold mb-2 text-xl text-teal-700">Basic Info</h2>


  <label className="block mb-1 font-medium">Name</label>
  <Input
    type="text"
    placeholder="Name"
    value={project.name}
    onChange={e => handleChange("name", e.target.value)}
    className="mb-2 w-full"
    required
  />

  <label className="block mb-1 font-medium">Client</label>
  <Input
    type="text"
    placeholder="Client"
    value={project.client}
    onChange={e => handleChange("client", e.target.value)}
    className="mb-2 w-full"
  />

  <label className="block mb-1 font-medium">Location</label>
  <Input
    type="text"
    placeholder="Location"
    value={project.location}
    onChange={e => handleChange("location", e.target.value)}
    className="mb-2 w-full"
  />

  <label className="block mb-1 font-medium">Completed On</label>
  <Input
    type="date"
    placeholder="Completed On"
    value={project.completedOn}
    onChange={e => handleChange("completedOn", e.target.value)}
    className="mb-2 w-full"
  />

  <Divider />

  <label className="block mb-1 font-medium">Main Image</label>
  <Input
    type="file"
    accept="image/*"
    onChange={(e) => {
      const file = e.target.files[0];
      if (file) handleChange("imgSource", file);
    }}
    className="mb-2 w-full"
  />

  <label className="block mb-1 font-medium">Description</label>
  <Textarea
    placeholder="Description"
    value={project.description}
    onChange={e => handleChange("description", e.target.value)}
    className="mb-2 w-full"
  />

  <label className="block mb-1 font-medium">Service Type</label>
  <Input
    type="text"
    placeholder="Service Type"
    value={project.serviceType}
    onChange={e => handleChange("serviceType", e.target.value)}
    className="mb-2 w-full"
  />

  <label className="block mb-1 font-medium">Category</label>
  <Input
    type="text"
    placeholder="Category"
    value={project.category}
    onChange={e => handleChange("category", e.target.value)}
    className="mb-2 w-full"
  />

  <label className="block mb-1 font-medium">Final Outcome</label>
  <Input
    type="text"
    placeholder="Final Outcome"
    value={project.finalOutcome}
    onChange={e => handleChange("finalOutcome", e.target.value)}
    className="mb-2 w-full"
  />

  <label className="flex items-center gap-2 mt-2">
    <Checkbox
      checked={project.keyProject}
      onCheckedChange={(checked) => handleChange("keyProject", checked)}
    />
    Key Project
  </label>
</div>


  {/* Keep external components as they are */}
  <GalleryForm
    existingGallery={gallery}
    onChange={(updatedGallery) => handleChange("images", updatedGallery)}
  />

<Divider/>
  
  {["scope", "highlights", "clientBenefits"].map((field) => (
    <React.Fragment key={field}>
    <div className="p-4">
      <h2 className="font-semibold mb-2">
        {field.charAt(0).toUpperCase() + field.slice(1)}
      </h2>
      {project[field].map((item, i) => (
        <div key={i} className="flex flex-col md:flex-row items-end md:items-center gap-2 mb-2">
          <Input
            type="text"
            value={item}
            onChange={(e) => handleArrayChange(field, i, e.target.value)}
            placeholder={`${field} ${i + 1}`}
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
      <Button
        type="button"
        onClick={() => handleAddItem(field)}
        className="mt-2"
      >
        Add {field}
      </Button>
    </div>
    <Divider/>
    
    </React.Fragment>
  ))}

  <SeoForm
    existingSeo={project.seo}
    onChange={(seoData) => setProject((prev) => ({ ...prev, seo: seoData }))}
  />
  <Divider/>

  <ChallengesAndSolutionsForm
    data={project.challengesAndSolutions}
    onChange={(data) => setProject((prev) => ({ ...prev, challengesAndSolutions: data }))}
  />
  <Divider/>

  <Button type="submit" className="bg-blue-500 hover:bg-blue-600">
    Create Project
  </Button>
</form>
    </div>
  );
};

export default ProjectCreation;
