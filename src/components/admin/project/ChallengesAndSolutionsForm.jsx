"use client";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const ChallengesAndSolutionsForm = ({ data = [], onChange }) => {
  const handleChange = (index, field, value) => {
    const updated = [...data];
    updated[index][field] = value;
    onChange(updated);
  };

  const handleAdd = () => {
    onChange([...data, { challenge: "", solution: "" }]);
  };

  const handleRemove = (index) => {
    onChange(data.filter((_, i) => i !== index));
  };

  return (
    <Card className="mt-4">
      <CardContent>
        <h2 className="font-bold mb-2 text-xl text-teal-700">Challenges & Solutions</h2>
        {data.map((item, index) => (
          <div key={index} className="flex flex-col gap-2 mb-3 p-2 border rounded">
            <Input
              type="text"
              placeholder="Challenge"
              value={item.challenge}
              onChange={(e) => handleChange(index, "challenge", e.target.value)}
            />
            <Input
              type="text"
              placeholder="Solution"
              value={item.solution}
              onChange={(e) => handleChange(index, "solution", e.target.value)}
            />
            <Button
              variant="destructive"
              size="sm"
              onClick={() => handleRemove(index)}
              className="mt-1"
            >
              Remove
            </Button>
          </div>
        ))}
        <Button type="button" onClick={handleAdd} className="mt-2">
          Add Challenge & Solution
        </Button>
      </CardContent>
    </Card>
  );
};

export default ChallengesAndSolutionsForm;
