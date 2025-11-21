"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Divider from "@/components/Divider";

function normalize(item) {
  return {
    component: item?.component || "",
    label: item?.label || "",
    durationMonths: item?.durationMonths || "",
    conditions: item?.conditions || "",
    info: item?.info || "",
  };
}

export default function WarrantyComponent({
  existing = [],
  onChange = () => {},
}) {
  let warrantyData = existing;
  if (typeof(existing) === "string") {
    try {
      warrantyData = JSON.parse(existing); // Parse the string into an object/array
    } catch (error) {
      console.error("Error parsing existing warranty data:", error);
    }
  }
  const [items, setItems] = useState(warrantyData.map(normalize));

  /** Only sync up when a structure changes (add/remove), NOT typing */
  const pushUpdate = (updated) => {
    setItems(updated);
    onChange(updated); // safe point
  };

  const addWarranty = () => {
    pushUpdate([
      ...items,
      {
        component: "",
        label: "",
        durationMonths: "",
        conditions: "",
        info: "",
      },
    ]);
  };

  const removeWarranty = (index) => {
    pushUpdate(items.filter((_, i) => i !== index));
  };

  /** update field locally only (no parent sync) */
  const updateField = (index, field, value) => {
    const updated = [...items];
    updated[index][field] = value;
    setItems(updated);
  };

  return (
    <div className="border p-4 rounded-lg mt-6 bg-gray-50">
      <div className="flex justify-between items-center mb-3">
        <h2 className="font-semibold text-lg">Warranty Components</h2>
        <Button onClick={addWarranty}>+ Add Warranty Component</Button>
      </div>

      {items.length === 0 && (
        <p className="text-sm text-gray-500">No warranty rules added yet.</p>
      )}

      {items.map((item, index) => (
        <div key={index} className="p-4 border rounded-lg mb-4 bg-white shadow-sm">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold">Component #{index + 1}</h3>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => removeWarranty(index)}
            >
              Remove
            </Button>
          </div>

          <div className="grid gap-3">
            <div>
              <label className="text-sm">Component Name</label>
              <Input
                placeholder="Invisible Grill / Safety Net"
                value={item.component}
                onChange={(e) => updateField(index, "component", e.target.value)}
              />
            </div>

            <div>
              <label className="text-sm">Display Label</label>
              <Input
                placeholder="5-Year Invisible Grill Warranty"
                value={item.label}
                onChange={(e) => updateField(index, "label", e.target.value)}
              />
            </div>

            <div>
              <label className="text-sm">Warranty Duration (Months)</label>
              <Input
                type="number"
                placeholder="24"
                value={item.durationMonths}
                onChange={(e) =>
                  updateField(index, "durationMonths", Number(e.target.value))
                }
              />
            </div>

            <div>
              <label className="text-sm">Warranty Conditions</label>
              <Textarea
                placeholder="Covers manufacturing defects..."
                value={item.conditions}
                onChange={(e) => updateField(index, "conditions", e.target.value)}
              />
            </div>

            <div>
              <label className="text-sm">Additional Info</label>
              <Textarea
                placeholder="Includes free repairs during warranty"
                value={item.info}
                onChange={(e) => updateField(index, "info", e.target.value)}
              />
            </div>
          </div>

          <Divider className="my-4" />
        </div>
      ))}
    </div>
  );
}
