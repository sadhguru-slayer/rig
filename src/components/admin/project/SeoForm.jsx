"use client";
import React, { useState, useEffect } from "react";

// ShadCN UI imports
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const SeoForm = ({ existingSeo = {}, onChange }) => {
  const [seo, setSeo] = useState({
    title: "",
    description: "",
    keywords: [],
    canonicalUrl: "",
    ogImage: "",
    ...existingSeo,
  });

  useEffect(() => onChange(seo), [seo]);

  const handleKeywordChange = (index, value) => {
    const updated = [...seo.keywords];
    updated[index] = value;
    setSeo({ ...seo, keywords: updated });
  };

  const handleAddKeyword = () =>
    setSeo({ ...seo, keywords: [...seo.keywords, ""] });

  const handleRemoveKeyword = (index) =>
    setSeo({ ...seo, keywords: seo.keywords.filter((_, i) => i !== index) });

  return (
    <div className="mt-4 space-y-4">
      <Label className="font-bold mb-2 text-xl text-teal-700">SEO</Label>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col space-y-1">
          <Label htmlFor="seo-title">SEO Title</Label>
          <Input
            id="seo-title"
            placeholder="SEO Title"
            value={seo.title}
            onChange={(e) => setSeo({ ...seo, title: e.target.value })}
          />
        </div>

        <div className="flex flex-col space-y-1">
          <Label htmlFor="seo-description">Description</Label>
          <Textarea
            id="seo-description"
            placeholder="Description"
            value={seo.description}
            onChange={(e) => setSeo({ ...seo, description: e.target.value })}
          />
        </div>

        <div className="flex flex-col space-y-1">
          <Label htmlFor="seo-canonical">Canonical URL</Label>
          <Input
            id="seo-canonical"
            placeholder="Canonical URL"
            value={seo.canonicalUrl}
            onChange={(e) => setSeo({ ...seo, canonicalUrl: e.target.value })}
          />
        </div>

        <div className="flex flex-col space-y-1">
          <Label htmlFor="seo-og-image">OG Image URL</Label>
          <Input
            id="seo-og-image"
            placeholder="OG Image URL"
            value={seo.ogImage}
            onChange={(e) => setSeo({ ...seo, ogImage: e.target.value })}
          />
        </div>

        {/* Keywords */}
        <div className="flex flex-col space-y-2">
          <Label className="font-semibold">Keywords</Label>
          {seo.keywords.map((kw, index) => (
            <div key={index} className="flex gap-2">
              <Input
                placeholder="Keyword"
                value={kw}
                onChange={(e) => handleKeywordChange(index, e.target.value)}
                className="flex-1"
              />
              <Button
                variant="destructive"
                size="sm"
                onClick={() => handleRemoveKeyword(index)}
              >
                Remove
              </Button>
            </div>
          ))}
          <Button type="button" onClick={handleAddKeyword}>
            Add Keyword
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SeoForm;
