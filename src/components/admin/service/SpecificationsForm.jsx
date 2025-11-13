"use client";
import React, { useState, useEffect } from "react";

// ShadCN UI imports
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const SpecificationsForm = ({ existingSpecs = [], onChange }) => {
  const [specs, setSpecs] = useState(existingSpecs);

  useEffect(() => onChange(specs), [specs]);

  const handleAddSpec = () => setSpecs([...specs, { key: "", value: "" }]);
  const handleChange = (index, field, value) => {
    const updated = [...specs];
    updated[index][field] = value;
    setSpecs(updated);
  };
  const handleRemove = (index) => setSpecs(specs.filter((_, i) => i !== index));

  return (
    <div className="mt-4 space-y-4">
      <Label className="font-semibold">Specifications</Label>
      {specs.map((spec, index) => (
        <div
          key={index}
          className="flex flex-col md:flex-row gap-2 items-start"
        >
          <div className="flex-1 space-y-1">
            <Label htmlFor={`spec-key-${index}`}>Key</Label>
            <Input
              id={`spec-key-${index}`}
              placeholder="Specification key"
              value={spec.key}
              onChange={(e) => handleChange(index, "key", e.target.value)}
            />
          </div>
          <div className="flex-1 space-y-1">
            <Label htmlFor={`spec-value-${index}`}>Value</Label>
            <Input
              id={`spec-value-${index}`}
              placeholder="Specification value"
              value={spec.value}
              onChange={(e) => handleChange(index, "value", e.target.value)}
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

      <Button onClick={handleAddSpec} className="mt-2" type="button">
        Add Specification
      </Button>
    </div>
  );
};

export default SpecificationsForm;
