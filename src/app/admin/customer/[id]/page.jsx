"use client";
import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Divider from "@/components/Divider";
import { toast } from "sonner";
import { useParams, useRouter } from 'next/navigation';

const CustomerDetails = () => {
  const { id } = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    email: "",
  });

  const [originalCustomer, setOriginalCustomer] = useState(null);

  const fetchCustomer = async () => {
    try {
      const res = await fetch(`/api/admin/customer/${id}`);
      const data = await res.json();

      if (data.success) {
        setCustomer(data.data);
        setOriginalCustomer(data.data);
      } else {
        toast.warning("Warning", {
          description: data.error || "Failed to fetch customer",
        });
      }
    } catch (err) {
      toast.error("Error", {
        description: err.message || "Failed to fetch customer",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchCustomer();
  }, [id]);

  const handleChange = (field, value) =>
    setCustomer((prev) => ({ ...prev, [field]: value }));

  /** Check if data changed */
  const isChanged =
    originalCustomer &&
    JSON.stringify(originalCustomer) !== JSON.stringify(customer);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isChanged) return;

    setSubmitting(true);

    try {
      const res = await fetch(`/api/admin/customer/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(customer),
      });

      const data = await res.json();

      if (data.success) {
        toast.success("Success", {
          description: "Customer updated successfully!",
        });
        fetchCustomer()
      } else {
        toast.error("Error", {
          description: data.error || "Failed to update customer",
        });
      }
    } catch (error) {
      toast.error("Error updating customer", {
        description: error.message,
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <p className="p-4">Loading...</p>;

  return (
    <div className="p-1 md:p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Update Customer</h1>

      <form
        onSubmit={handleSubmit}
        className={`flex flex-col p-4 border rounded ${
          submitting ? "opacity-50 pointer-events-none" : ""
        }`}
      >
        <label className="mb-1 font-medium">Name</label>
        <Input
          type="text"
          placeholder="Name"
          value={customer.name}
          onChange={(e) => handleChange("name", e.target.value)}
          className="mb-2"
          required
        />

        <label className="mb-1 font-medium">Phone</label>
        <Input
          type="tel"
          placeholder="Phone"
          value={customer.phone}
          onChange={(e) => handleChange("phone", e.target.value)}
          className="mb-2"
          required
        />

        <label className="mb-1 font-medium">Email</label>
        <Input
          type="email"
          placeholder="Email"
          value={customer.email}
          onChange={(e) => handleChange("email", e.target.value)}
          className="mb-2"
          required
        />

        <Divider />

        <Button type="submit" disabled={!isChanged}>
          {isChanged ? "Update Customer" : "No Changes Made"}
        </Button>
      </form>
    </div>
  );
};

export default CustomerDetails;
