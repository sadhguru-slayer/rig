"use client";
import React, { useState, useEffect } from "react";

// ShadCN UI imports
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const TestimonialsForm = ({ existingTestimonials = [], onChange }) => {
  const [testimonials, setTestimonials] = useState(
    existingTestimonials?.map((t) => ({
      name: t.name || "",
      feedback: t.feedback || "",
      rating: t.rating != null ? t.rating : "",
      link: t.link || "",
    })) || []
  );

  useEffect(() => {
    const formatted = testimonials.map((t) => ({
      ...t,
      rating: t.rating !== "" ? parseInt(t.rating, 10) : null,
    }));
    onChange(formatted);
  }, [testimonials]);

  const handleAdd = () => {
    setTestimonials([
      ...testimonials,
      { name: "", feedback: "", rating: "", link: "" },
    ]);
  };

  const handleChange = (index, field, value) => {
    const updated = [...testimonials];
    updated[index][field] = value;
    setTestimonials(updated);
  };

  const handleRemove = (index) => {
    setTestimonials(testimonials.filter((_, i) => i !== index));
  };

  return (
    <div className="mt-4 space-y-4">
      <Label className="font-semibold">Testimonials</Label>
      {testimonials.map((t, index) => (
        <div
          key={index}
          className="flex flex-col md:flex-row gap-2 items-start"
        >
          <div className="flex-1 space-y-1">
            <Label htmlFor={`testimonial-name-${index}`}>Name</Label>
            <Input
              id={`testimonial-name-${index}`}
              placeholder="Name"
              value={t.name}
              onChange={(e) => handleChange(index, "name", e.target.value)}
            />
          </div>
          <div className="flex-1 space-y-1">
            <Label htmlFor={`testimonial-feedback-${index}`}>Feedback</Label>
            <Input
              id={`testimonial-feedback-${index}`}
              placeholder="Feedback"
              value={t.feedback}
              onChange={(e) => handleChange(index, "feedback", e.target.value)}
            />
          </div>
          <div className="w-24 space-y-1">
            <Label htmlFor={`testimonial-rating-${index}`}>Rating</Label>
            <Input
              id={`testimonial-rating-${index}`}
              type="number"
              placeholder="0-5"
              value={t.rating}
              onChange={(e) => handleChange(index, "rating", e.target.value)}
            />
          </div>
          <div className="flex-1 space-y-1">
            <Label htmlFor={`testimonial-link-${index}`}>Link</Label>
            <Input
              id={`testimonial-link-${index}`}
              placeholder="Link"
              value={t.link}
              onChange={(e) => handleChange(index, "link", e.target.value)}
            />
          </div>
          <div className="flex-shrink-0 mt-6 md:mt-0">
            <Button variant="destructive" size="sm" onClick={() => handleRemove(index)}>
              Remove
            </Button>
          </div>
        </div>
      ))}

      <Button type="button" onClick={handleAdd}>
        Add Testimonial
      </Button>
    </div>
  );
};

export default TestimonialsForm;
