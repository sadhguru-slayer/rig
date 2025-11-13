"use client";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";


import { TestimonialsForm,FaqsForm,FeaturesForm,SpecificationsForm ,GalleryForm,SeoForm } from "@/components/admin/service";
import React, { useEffect, useState } from "react";
import Divider from "@/components/Divider";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const AdminCreatePage = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  // Form fields exactly as in your Prisma model
  const [title, setTitle] = useState("");
  const [shortTitle, setShortTitle] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [moreInfoUrl, setMoreInfoUrl] = useState("");
  const [applications, setApplications] = useState([]);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [features, setFeatures] = useState([]);
const [specifications, setSpecifications] = useState([]);
const [gallery, setGallery] = useState([]);
const [faqs, setFaqs] = useState([]);
const [testimonials, setTestimonials] = useState([]);
const [seoList, setSeoList] = useState([]);


const handleCreateService = async (e) => {
  e.preventDefault();
  setError("");
  setSuccess("");
  setLoading(true); // Start loading

  // Basic validation
  if (!title || !shortTitle || !shortDescription || !description) {
    setError("Please fill in all required fields");
    toast.error("Error", {
      description: "Please fill in all required fields",
    });
    setLoading(false); // Stop loading
    return;
  }

  try {
    const formData = new FormData();

    // Basic fields
    formData.append("title", title);
    formData.append("shortTitle", shortTitle);
    formData.append("shortDescription", shortDescription);
    formData.append("description", description);
    formData.append("priceRange", priceRange);
    formData.append("moreInfoUrl", moreInfoUrl);

    // Convert arrays and objects into JSON strings
    formData.append("features", JSON.stringify(features || []));
    formData.append("applications", JSON.stringify(applications || []));
    formData.append("specifications", JSON.stringify(specifications || []));
    formData.append("faqs", JSON.stringify(faqs || []));
    formData.append("testimonials", JSON.stringify(testimonials || []));
    formData.append("seo", JSON.stringify(seoList || {}));

    // Append gallery files
    gallery.forEach((img) => {
      if (img.file) {
        formData.append("galleryFiles", img.file);
      }
    });

    const res = await fetch("/api/admin/service", {
      method: "POST",
      body: formData, // no headers needed for FormData
    });

    const data = await res.json();

    if (data.success) {
      setSuccess("Service created successfully!");
      toast.success("Success", {
        description: "Service created successfully!",
      });
      router.push("/admin/service");

      // Reset fields
      setTitle("");
      setShortTitle("");
      setShortDescription("");
      setDescription("");
      setPriceRange("");
      setMoreInfoUrl("");
      setApplications([]);
      setFeatures([]);
      setSpecifications([]);
      setGallery([]);
      setFaqs([]);
      setTestimonials([]);
      setSeoList({
        title: "",
        description: "",
        keywords: [],
        canonicalUrl: "",
        ogImage: "",
      });

    } else {
      setError(data.error || "Failed to create service");
      toast.error("Error", {
        description: data.error || "Failed to create service",
      });
    }
  } catch (err) {
    console.error("Error creating service:", err);
    setError(err.message || "Something went wrong");
    toast.error("Error", {
      description: err.message || "Something went wrong",
    });
  } finally {
    setLoading(false); // Stop loading
  }
};


  // Add new application field
  const handleAddApplication = () => {
    setApplications([...applications, ""]);
  };

  // Update application value
  const handleApplicationChange = (index, value) => {
    const updated = [...applications];
    updated[index] = value;
    setApplications(updated);
  };

  // Remove application field
  const handleRemoveApplication = (index) => {
    const updated = applications.filter((_, i) => i !== index);
    setApplications(updated);
  };



  return (
    <div className="p-2 md:p-4">
      <h1 className="text-2xl font-bold mb-4">Create Service</h1>

      {/* Create Service Form */}
      <form
        onSubmit={handleCreateService}
        className={`mb-6 p-2 md:p-4 border rounded transition-opacity duration-200 ${
    loading ? "opacity-50 pointer-events-none" : "opacity-100"
  }`}
      
        >
        <h2 className="font-semibold mb-2">Create New Service</h2>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        {success && <p className="text-green-500 mb-2">{success}</p>}

<div className="flex flex-col gap-2 mb-2">
  <div>
    <label className="block text-sm font-medium mb-1">Title</label>
    <Input
      type="text"
      placeholder="Title"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      required
    />
  </div>

 

  <div>
    <label className="block text-sm font-medium mb-1">Short Title</label>
    <Input
      type="text"
      placeholder="Short Title"
      value={shortTitle}
      onChange={(e) => setShortTitle(e.target.value)}
      required
    />
  </div>

  <div>
    <label className="block text-sm font-medium mb-1">Short Description</label>
    <Input
      type="text"
      placeholder="Short Description"
      value={shortDescription}
      onChange={(e) => setShortDescription(e.target.value)}
      required
    />
  </div>

  <div>
    <label className="block text-sm font-medium mb-1">Description</label>
    <Textarea
      placeholder="Description"
      value={description}
      onChange={(e) => setDescription(e.target.value)}
      required
    />
  </div>

  <div>
    <label className="block text-sm font-medium mb-1">Image URL</label>
    <Input
      type="text"
      placeholder="Image URL"
      value={imageUrl}
      onChange={(e) => setImageUrl(e.target.value)}
      required
    />
  </div>

  <div>
    <label className="block text-sm font-medium mb-1">Price Range</label>
    <Input
      type="text"
      placeholder="Price Range"
      value={priceRange}
      onChange={(e) => setPriceRange(e.target.value)}
    />
  </div>

  <div>
    <label className="block text-sm font-medium mb-1">More Info URL</label>
    <Input
      type="text"
      placeholder="More Info URL"
      value={moreInfoUrl}
      onChange={(e) => setMoreInfoUrl(e.target.value)}
    />
  </div>
</div>

<Divider/>

{/* Applications JSON field */}
<div className="mt-4 rounded-lg ">
  <label className="font-semibold">Applications</label>
  {applications.map((app, index) => (
    <div key={index} className="flex items-center gap-2 mt-1">
      <Input
        type="text"
        placeholder={`Application ${index + 1}`}
        value={app}
        onChange={(e) => handleApplicationChange(index, e.target.value)}
        className="flex-1"
      />
      <Button variant="destructive" size="sm" onClick={() => handleRemoveApplication(index)}>
        Remove
      </Button>
    </div>
  ))}
  <Button type="button" size="sm" onClick={handleAddApplication} className="mt-2">
    Add Application
  </Button>
</div>
<Divider/>



    <FeaturesForm existingFeatures={features} onChange={setFeatures} />
<Divider/>
    
    <SpecificationsForm existingSpecs={specifications} onChange={setSpecifications} />
<Divider/>
    
    <GalleryForm existingGallery={gallery} onChange={setGallery} />
<Divider/>
    
    <FaqsForm  onChange={setFaqs} />
<Divider/>
    
    <TestimonialsForm existingTestimonials={testimonials} onChange={setTestimonials} />
<Divider/>
    
    <SeoForm existingSeo={seoList} onChange={setSeoList} />


<Divider/>

       <Button
  type="submit"
  className="mt-4 flex items-center justify-center gap-2"
  disabled={loading}
>
  {loading && (
    <svg
      className="animate-spin h-5 w-5 text-white"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v8H4z"
      ></path>
    </svg>
  )}
  {loading ? "Creating..." : "Create Service"}
</Button>

      </form>


    </div>
  );
};

export default AdminCreatePage;