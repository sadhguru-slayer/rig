"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { TestimonialsForm,FaqsForm,FeaturesForm,SpecificationsForm ,GalleryForm,SeoForm } from "@/components/admin/service";
import { toast } from "sonner"

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Divider from "@/components/Divider";

const ServiceDetailsPage = () => {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openSection, setOpenSection] = useState("basic");

 const fetchService = async () => {
  setLoading(true); // start loading
  try {
    const res = await fetch(`/api/admin/service/${id}`);
    const data = await res.json();

    if (data.success) {
      setService(data.data);
      console.log(data.data);
    } else {
      console.error("Failed to fetch service:", data.error);
    }
  } catch (err) {
    console.error("Error fetching service:", err);
  } finally {
    setLoading(false); // stop loading in all cases
  }
};

useEffect(() => {
  if (id) {
    fetchService();
  }
}, [id]);

  if (!service) return <p>Service not found</p>;

  const handleBasicChange = (field, value) =>
    setService({ ...service, [field]: value });

  const handleSave = async () => {
  const formData = new FormData();

  // append basic fields
  formData.append("title", service.title);
  formData.append("shortTitle", service.shortTitle);
  formData.append("shortDescription", service.shortDescription);
  formData.append("description", service.description);
  formData.append("imageUrl", service.imageUrl);
  formData.append("priceRange", service.priceRange);
  formData.append("moreInfoUrl", service.moreInfoUrl);
  formData.append("applications", service.applications || "[]");

  // append JSON arrays
  formData.append("features", JSON.stringify(service.features || []));
  formData.append("specifications", JSON.stringify(service.specifications || []));
  formData.append("faqs", JSON.stringify(service.faqs || []));
  formData.append("testimonials", JSON.stringify(service.testimonials || []));
  formData.append("seo", JSON.stringify(service.seo || {}));

  // gallery updates
  const keepIds = []; // gallery images to keep (existing DB images)
  service.gallery.forEach((img) => {
    if (img.id) {
      keepIds.push(img.id);
    } else if (img.file) {
      // new file
      formData.append("galleryFiles", img.file);
    }
  });

  formData.append("keepGalleryIds", JSON.stringify(keepIds));

  const res = await fetch(`/api/admin/service/${id}`, {
    method: "PATCH",
    body: formData,
  });

  const data = await res.json();
  if (data.success) {
  toast.success("Success", {
    description: "Service updated successfully!",
  });
  fetchService();
} else {
  toast.error("Error", {
    description: data.error || "Failed to save service",
  });
}

};


  const toggle = (key) => setOpenSection(openSection === key ? null : key);

  return (
    <div className="max-w-4xl mx-auto p-2 md:p-4">
      <h1 className="text-2xl font-bold mb-4">Edit: {service.title}</h1>
<div
  className={`flex flex-col p-2 md:p-4 border rounded transition-opacity duration-200 ${
    loading ? "opacity-50 pointer-events-none" : "opacity-100"
  }`}
>
{/* ✅ Basic Info */}
<div className="p-2 mb-4 space-y-4">
  <h2 className="font-semibold text-lg">Basic Info</h2>

  {/* Title */}
  <div className="space-y-1">
    <Label htmlFor="title">Title</Label>
    <Input
      id="title"
      value={service.title}
      onChange={(e) => handleBasicChange("title", e.target.value)}
      placeholder="Enter title"
    />
  </div>

  {/* Slug */}
  <div className="space-y-1">
    <Label htmlFor="slug">Slug</Label>
    <Input id="slug" value={service.slug} readOnly className="bg-gray-100 cursor-not-allowed" />
  </div>

  {/* Short Title */}
  <div className="space-y-1">
    <Label htmlFor="shortTitle">Short Title</Label>
    <Input
      id="shortTitle"
      value={service.shortTitle}
      onChange={(e) => handleBasicChange("shortTitle", e.target.value)}
      placeholder="Enter short title"
    />
  </div>

  {/* Short Description */}
  <div className="space-y-1">
    <Label htmlFor="shortDescription">Short Description</Label>
    <Textarea
      id="shortDescription"
      value={service.shortDescription}
      onChange={(e) => handleBasicChange("shortDescription", e.target.value)}
      placeholder="Enter short description"
    />
  </div>

  {/* Description */}
  <div className="space-y-1">
    <Label htmlFor="description">Description</Label>
    <Textarea
      id="description"
      value={service.description}
      onChange={(e) => handleBasicChange("description", e.target.value)}
      placeholder="Enter description"
    />
  </div>

  {/* Image URL */}
  
<div className="space-y-1">
  <Label htmlFor="imageUrl">Upload Image</Label>

  {service?.imageUrl && (
        <div className="my-2">
          <img
            src={service.imageUrl}
            alt="Service Preview"
            className="w-24 max-h-64 object-cover rounded"
          />
        </div>
      )}
  <Input
    id="imageUrl"
    type="file"  // Change the input type to 'file'
    onChange={(e) => handleBasicChange("imageUrl", e.target.files[0])}  // Store the selected file in state
    accept="image/*"  // Optional: restricts file selection to images only
  />
</div>


  {/* Price Range */}
  <div className="space-y-1">
    <Label htmlFor="priceRange">Price Range</Label>
    <Input
      id="priceRange"
      value={service.priceRange}
      onChange={(e) => handleBasicChange("priceRange", e.target.value)}
      placeholder="Enter price range"
    />
  </div>

  {/* More Info URL */}
  <div className="space-y-1">
    <Label htmlFor="moreInfoUrl">More Info URL</Label>
    <Input
      id="moreInfoUrl"
      value={service.moreInfoUrl}
      onChange={(e) => handleBasicChange("moreInfoUrl", e.target.value)}
      placeholder="Enter URL"
    />
  </div>

  <Divider />

  {/* Applications */}
  <div className="space-y-2">
    <Label>Applications</Label>
    {(() => {
      let apps = [];
      try {
        apps = service.applications ? JSON.parse(service.applications) : [];
      } catch {
        apps = [];
      }

      return (
        <>
          {apps.map((app, index) => (
            <div key={index} className="flex items-center gap-2">
              <Input
                className="flex-1"
                value={app}
                onChange={(e) => {
                  const updated = [...apps];
                  updated[index] = e.target.value;
                  handleBasicChange("applications", JSON.stringify(updated));
                }}
              />
              <Button
                variant="destructive"
                onClick={() => {
                  const updated = apps.filter((_, i) => i !== index);
                  handleBasicChange("applications", JSON.stringify(updated));
                }}
              >
                Remove
              </Button>
            </div>
          ))}

          <Button
            type="button"
            onClick={() => handleBasicChange("applications", JSON.stringify([...apps, ""]))}
          >
            Add Application
          </Button>
        </>
      );
    })()}
  </div>
</div>
<Divider/>



      {/* ✅ Related Components */}
        <FeaturesForm existingFeatures={service.features} onChange={(features) => setService({ ...service, features })} />
<Divider/>
      
      
      <SpecificationsForm
  existingSpecs={service?.specifications || []}
  onChange={(updatedSpecs) =>
  {
    setService((prev) => ({ ...prev, specifications: updatedSpecs }))
  }
  }/>

      
<Divider/>
      
        <FaqsForm existingFaqs={service.faqs} onChange={(faqs) => setService({ ...service, faqs })} />
<Divider/>
      
      <GalleryForm
  existingGallery={service.gallery}
  onChange={(updatedGallery) =>
    setService((prev) => ({ ...prev, gallery: updatedGallery }))
  }
/>
<Divider/>

      
        <TestimonialsForm existingTestimonials={service.testimonials} onChange={(testimonials) => setService({ ...service, testimonials })} />
<Divider/>
      
        <SeoForm existingSeo={service.seo} onChange={(seo) => setService({ ...service, seo })} />
<Divider/>
      
      <div className="mt-6 flex justify-end">
        <button onClick={handleSave} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Save All Changes
        </button>
      </div>
      </div>
    </div>
  );
};



export default ServiceDetailsPage;
