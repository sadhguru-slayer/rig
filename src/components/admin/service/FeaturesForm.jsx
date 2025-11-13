"use client";
import React, { useState, useEffect } from "react";

// ShadCN UI imports
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const FeaturesForm = ({ existingFeatures = [], onChange }) => {
  const [features, setFeatures] = useState(existingFeatures);

  useEffect(() => {
    onChange(features);
  }, [features]);

  const handleAddFeature = () => {
    setFeatures([...features, { title: "", detail: "", icon: "" }]);
  };

  const handleChange = (index, field, value) => {
    const updated = [...features];
    updated[index][field] = value;
    setFeatures(updated);
  };

  const handleRemove = (index) => {
    const updated = features.filter((_, i) => i !== index);
    setFeatures(updated);
  };

  return (
    <div className="mt-4 space-y-4">
      <Label className="font-semibold">Features</Label>
      {features.map((feature, index) => (
        <div
          key={index}
          className="flex flex-col md:flex-row gap-2 items-start"
        >
          <div className="flex-1 space-y-1">
            <Label htmlFor={`title-${index}`}>Title</Label>
            <Input
              id={`title-${index}`}
              placeholder="Feature title"
              value={feature.title}
              onChange={(e) => handleChange(index, "title", e.target.value)}
            />
          </div>
          <div className="flex-1 space-y-1">
            <Label htmlFor={`detail-${index}`}>Detail</Label>
            <Input
              id={`detail-${index}`}
              placeholder="Feature detail"
              value={feature.detail}
              onChange={(e) => handleChange(index, "detail", e.target.value)}
            />
          </div>
          <div className="flex-1 space-y-1">
            <Label htmlFor={`icon-${index}`}>Icon URL</Label>
            <Input
              id={`icon-${index}`}
              placeholder="https://example.com/icon.png"
              value={feature.icon}
              onChange={(e) => handleChange(index, "icon", e.target.value)}
            />
          </div>
          <div className="flex-shrink-0 mt-6 md:mt-0">
            <Button
              variant="destructive"
              size="sm"
              onClick={() => handleRemove(index)}
            >
              Remove
            </Button>
          </div>
        </div>
      ))}

      <Button onClick={handleAddFeature} className="mt-2" type="button">
        Add Feature
      </Button>
    </div>
  );
};

export default FeaturesForm;
