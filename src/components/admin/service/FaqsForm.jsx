"use client";
import React, { useState, useEffect } from "react";

// ShadCN UI imports
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const FaqsForm = ({ existingFaqs = [], onChange }) => {
  const [faqs, setFaqs] = useState(existingFaqs);

  useEffect(() => onChange(faqs), [faqs]);

  const handleAddFaq = () => setFaqs([...faqs, { question: "", answer: "" }]);
  const handleChange = (index, field, value) => {
    const updated = [...faqs];
    updated[index][field] = value;
    setFaqs(updated);
  };
  const handleRemove = (index) => setFaqs(faqs.filter((_, i) => i !== index));

  return (
    <div className="mt-4 space-y-4">
      <Label className="font-semibold">FAQs</Label>
      {faqs.map((faq, index) => (
        <div key={index} className="flex flex-col justify-center md:flex-row gap-2 items-start">
          <div className="flex-1 space-y-1">
            <Label htmlFor={`question-${index}`}>Question</Label>
            <Input
              id={`question-${index}`}
              placeholder="Enter question"
              value={faq.question}
              onChange={(e) => handleChange(index, "question", e.target.value)}
            />
          </div>
          <div className="flex-1 space-y-1">
            <Label htmlFor={`answer-${index}`}>Answer</Label>
            <Input
              id={`answer-${index}`}
              placeholder="Enter answer"
              value={faq.answer}
              onChange={(e) => handleChange(index, "answer", e.target.value)}
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

      <Button onClick={handleAddFaq} className="mt-2" type="button">
        Add FAQ
      </Button>
    </div>
  );
};

export default FaqsForm;
