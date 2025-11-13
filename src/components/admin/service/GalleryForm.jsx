"use client";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

// ShadCN UI
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Card, CardContent } from "@/components/ui/card";

const ImageModal = ({ imageUrl, onClose }) => {
  if (!imageUrl) return null;

  return (
    <div
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white p-4 rounded-lg shadow-xl max-w-[90vw] max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={imageUrl}
          alt="Preview"
          className="w-full h-full max-h-[70vh] object-contain rounded"
        />
        <Button
          variant="destructive"
          className="mt-4 w-full"
          onClick={onClose}
        >
          Close
        </Button>
      </div>
    </div>
  );
};

const GalleryForm = ({ existingGallery, onChange, type = "Service" }) => {
  const pathname = usePathname();
  const id = pathname.split("/").pop();

  const [gallery, setGallery] = useState([]);
  const [removedGalleryIds, setRemovedGalleryIds] = useState([]);
  const [newGallery, setNewGallery] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  // Fetch existing gallery
  useEffect(() => {
    if (!id) return;
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchGallery = async () => {
      try {
        let res = null;
        if (type.toLowerCase() === "service") {
          res = await fetch(`/api/admin/service/gallery/${id}`, { signal });
        } else {
          res = await fetch(`/api/admin/project/gallery/${id}`, { signal });
        }
        const data = await res.json();
        if (data?.success) setGallery(data.data || []);
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error(`Error fetching ${type} gallery:`, error);
        }
      }
    };

    fetchGallery();
    return () => controller.abort();
  }, [id, type]);

  // Notify parent of updated gallery
  useEffect(() => {
    const filteredGallery = gallery.filter(
      (img) => !removedGalleryIds.includes(img.id)
    );
    const merged = [...filteredGallery, ...newGallery];
    onChange(merged);
  }, [gallery, newGallery, removedGalleryIds]);

  // Handlers
  const handleAddImage = () =>
    setNewGallery([...newGallery, { file: null, preview: "" }]);
  const handleRemoveNew = (index) =>
    setNewGallery(newGallery.filter((_, i) => i !== index));
  const handleRemoveExisting = (id) =>
    setRemovedGalleryIds([...removedGalleryIds, id]);

  const handleFileSelect = (e, index) => {
    const file = e.target.files[0];
    if (!file) return;
    const preview = URL.createObjectURL(file);
    const updated = [...newGallery];
    updated[index] = { file, preview };
    setNewGallery(updated);
  };

  return (
    <Card className="mt-4 bg-gray-50">
      <CardContent>
        <Label className="font-bold text-xl text-teal-700 mb-4">Gallery Images</Label>

        {/* Existing Gallery */}
        {gallery.length > 0 ? (
          <div className="grid grid-cols-4 gap-4">
            {gallery.map(
              (img) =>
                !removedGalleryIds.includes(img.id) && (
                  <div
                    key={img.id || img.url}
                    className="relative group cursor-pointer rounded overflow-hidden border border-gray-300"
                  >
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button
                            type="button"
                            onClick={() => handleRemoveExisting(img.id)}
                            className="absolute top-1 right-1 z-10 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm opacity-80 hover:opacity-100"
                          >
                            ×
                          </button>
                        </TooltipTrigger>
                        <TooltipContent>Remove</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <img
                      src={img.url}
                      alt="Gallery"
                      className="w-full h-28 object-cover group-hover:opacity-80 transition cursor-pointer"
                      onClick={() => setSelectedImage(img.url)}
                    />
                  </div>
                )
            )}
          </div>
        ) : (
          <p className="text-gray-500 italic">No images found for this {type.toLowerCase()}.</p>
        )}

        {/* New Gallery */}
        <div className="mt-6 flex flex-col gap-3">
          {newGallery.map((img, i) => (
            <div key={i} className="flex gap-3 items-center">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileSelect(e, i)}
                className="border p-1 rounded"
              />
              {img.preview && (
                <img
                  src={img.preview}
                  alt="Preview"
                  className="w-16 h-16 object-cover rounded border cursor-pointer"
                  onClick={() => setSelectedImage(img.preview)}
                />
              )}
              <Button
                variant="destructive"
                size="sm"
                onClick={() => handleRemoveNew(i)}
              >
                Remove
              </Button>
            </div>
          ))}
          <Button variant="outline" type="button" onClick={handleAddImage}>
            Add Image
          </Button>
        </div>
      </CardContent>

      {/* Modal */}
      <ImageModal
        imageUrl={selectedImage}
        onClose={() => setSelectedImage(null)}
      />
    </Card>
  );
};

export default GalleryForm;
