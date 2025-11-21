"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

import {
  FeaturesForm,
  SpecificationsForm,
  FaqsForm,
  TestimonialsForm,
  SeoForm,
  GalleryForm,
} from "@/components/admin/service";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import WarrantyComponent from "@/components/admin/service/WarrantyComponent";
import Divider from "@/components/Divider";

export default function SubServicesForm({ existingSubServices = [], onChange }) {
  const [subServices, setSubServices] = useState(existingSubServices);

  const handleAdd = () => {
    setSubServices([
      ...subServices,
      {
        title: "",
        description: "",
        imageFile: null,
        applications: [],
        features: [],
        specifications: [],
        faqs: [],
        testimonials: [],
        seo: {},
        warrantyComponents: [],
      },
    ]);
  };

  const handleRemove = (index) => {
    const updated = subServices.filter((_, i) => i !== index);
    setSubServices(updated);
    onChange(updated);
  };

  const updateField = (index, field, value) => {
    const updated = [...subServices];
    updated[index][field] = value;
    setSubServices(updated);
    onChange(updated);
  };

  const updateApplications = (index, apps) => {
    updateField(index, "applications", apps);
  };


  return (
    <div className="border p-3 rounded-lg mt-4">
      <div className="flex justify-between items-center mb-3">
        <h2 className="font-semibold text-lg">Sub Services</h2>
        <Button type="button" onClick={handleAdd}>
          + Add Sub-Service
        </Button>
      </div>

      {subServices.length === 0 && (
        <p className="text-sm text-gray-500">No sub-services added yet.</p>
      )}

      {subServices.map((sub, index) => (
        <div key={index} className="border rounded-lg p-4 mb-6 bg-gray-50">
          <div className="flex justify-between mb-2">
            <h3 className="font-semibold text-md">Sub-Service #{index + 1}</h3>
            <Button variant="destructive" size="sm" onClick={() => handleRemove(index)}>
              Remove
            </Button>
          </div>

          {/* BASIC FIELDS */}
          <div className="grid gap-3">
            <div>
              <label className="text-sm">Title</label>
              <Input
                value={sub.title}
                onChange={(e) => updateField(index, "title", e.target.value)}
                placeholder="Sub-service title"
                required
              />
            </div>

            <div>
              <label className="text-sm">Description</label>
              <Textarea
                value={sub.description}
                onChange={(e) => updateField(index, "description", e.target.value)}
                placeholder="Sub-service description"
              />
            </div>

            {/* IMAGE UPLOAD */}
            <div>
              {sub?.imageUrl && (
                <div className="my-2">
                  <img
                    src={sub.imageUrl}
                    alt="Service Preview"
                    className="w-24 max-h-64 object-cover rounded"
                  />
                </div>
              )}
              <label className="text-sm">Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => updateField(index, "imageFile", e.target.files[0])}
              />
            </div>
          </div>

          <Divider />

          {/* TABS SECTION */}
          <Tabs defaultValue="applications">
            <TabsList>
              <TabsTrigger value="applications">Applications</TabsTrigger>
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="specs">Specifications</TabsTrigger>
              <TabsTrigger value="faqs">FAQ</TabsTrigger>
              <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
              <TabsTrigger value="seo">SEO</TabsTrigger>
              <TabsTrigger value="warrantyComponents">Warranty Component</TabsTrigger>
            </TabsList>

            {/* APPLICATIONS */}
            <TabsContent value="applications">
              <SubServiceApplications
                apps={sub.applications}
                onChange={(apps) => updateApplications(index, apps)}
              />
            </TabsContent>

            {/* FEATURES */}
            <TabsContent value="features">
              <FeaturesForm
                existingFeatures={sub.features}
                onChange={(data) => updateField(index, "features", data)}
              />
            </TabsContent>

            {/* SPECS */}
            <TabsContent value="specs">
              <SpecificationsForm
                existingSpecs={sub.specifications}
                onChange={(data) => updateField(index, "specifications", data)}
              />
            </TabsContent>

            {/* FAQ */}
            <TabsContent value="faqs">
              <FaqsForm
                existingFaqs={sub.faqs}
                onChange={(d) => updateField(index, "faqs", d)}
              />
            </TabsContent>

            {/* TESTIMONIALS */}
            <TabsContent value="testimonials">
              <TestimonialsForm
                existingTestimonials={sub.testimonials}
                onChange={(d) => updateField(index, "testimonials", d)}
              />
            </TabsContent>

            {/* SEO */}
            <TabsContent value="seo">
              <SeoForm existingSeo={sub.seo} onChange={(d) => updateField(index, "seo", d)} />
            </TabsContent>

            <TabsContent value="warrantyComponents">

              <WarrantyComponent
                existing={sub.warrantyComponents}
                onChange={(w) => updateField(index, "warrantyComponents", w)} />
            </TabsContent>

          </Tabs>
        </div>
      ))}
    </div>
  );
}

// SIMPLE APPLICATIONS UI
function SubServiceApplications({ apps, onChange }) {
  const handleAdd = () => onChange([...(apps || []), ""]);
  const handleRemove = (i) => onChange(apps.filter((_, idx) => idx !== i));
  const update = (i, value) => {
    const updated = [...apps];
    updated[i] = value;
    onChange(updated);
  };

  return (
    <div className="mt-2">
      <label className="font-semibold text-sm">Applications</label>
      {apps?.map((a, i) => (
        <div key={i} className="flex gap-2 mt-2">
          <Input value={a} onChange={(e) => update(i, e.target.value)} />
          <Button variant="destructive" size="sm" onClick={() => handleRemove(i)}>
            Remove
          </Button>
        </div>
      ))}
      <Button type="button" size="sm" className="mt-2" onClick={handleAdd}>
        Add Application
      </Button>
    </div>
  );
}
