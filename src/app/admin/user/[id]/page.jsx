"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import Divider from "@/components/Divider";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";

const EditUserPage = () => {
  const router = useRouter();
  const params = useParams();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    isSuperUser: false,
    isActive: true,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleChange = (field, value) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  // Fetch admin details
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`/api/admin/user/${params.id}`);
        const data = await res.json();

        if (!res.ok) {
          toast.error("Error", { description: data.error });
          return;
        }

        setForm({
          email: data.email || "",
          password: "",
          confirmPassword: "",
          isSuperUser: data.isSuperUser,
          isActive: data.isActive,
        });
      } catch (err) {
        toast.error("Error", { description: err.message });
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [params.id]);

  // Submit updated data
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password && form.password !== form.confirmPassword) {
      return toast.error("Password mismatch", {
        description: "Password & Confirm Password must match.",
      });
    }

    setSaving(true);

    try {
      const payload = { ...form };
      if (!payload.password) delete payload.password;
      delete payload.confirmPassword;

      const res = await fetch(`/api/admin/user/${params.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Updated", {
          description: "User updated successfully.",
        });
        router.push("/admin/user");
      } else {
        toast.error("Error", { description: data.error });
      }
    } catch (err) {
      toast.error("Error", { description: err.message });
    } finally {
      setSaving(false);
    }
  };

  if (loading)
    return (
      <div className="p-10 text-center text-gray-500">Loading user data...</div>
    );

  return (
    <div className="p-1 md:p-4 max-w-xl mx-auto">
      <h1 className="text-3xl font-semibold mb-4">Edit Admin User</h1>

      <form
        onSubmit={handleSubmit}
        className={`flex flex-col gap-4 p-6 border rounded-xl shadow-sm bg-white transition-opacity duration-200 ${
          saving ? "opacity-60 pointer-events-none" : ""
        }`}
      >
        {/* Username */}
        <div>
          <label className="block font-medium mb-1">Username *</label>
          <Input
            placeholder="Enter username"
            value={form.username}
            readOnly
            className="w-full bg-gray-100 cursor-not-allowed"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block font-medium mb-1">Email</label>
          <Input
            type="email"
            placeholder="Enter email"
            value={form.email}
            onChange={(e) => handleChange("email", e.target.value)}
          />
        </div>

        {/* Password */}
        <div>
          <label className="block font-medium mb-1">New Password (optional)</label>
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Update password"
              value={form.password}
              onChange={(e) => handleChange("password", e.target.value)}
              className="pr-10"
            />

            <button
              type="button"
              className="absolute right-2 top-2.5 text-gray-500"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block font-medium mb-1">Confirm Password</label>
          <div className="relative">
            <Input
              type={showConfirm ? "text" : "password"}
              placeholder="Confirm password"
              value={form.confirmPassword}
              onChange={(e) =>
                handleChange("confirmPassword", e.target.value)
              }
              className="pr-10"
            />

            <button
              type="button"
              className="absolute right-2 top-2.5 text-gray-500"
              onClick={() => setShowConfirm((prev) => !prev)}
            >
              {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <Divider />

        {/* Checkboxes */}
        <div className="flex items-center gap-2">
          <Checkbox
            checked={form.isSuperUser}
            onCheckedChange={(checked) =>
              handleChange("isSuperUser", checked)
            }
          />
          <span className="font-medium">Super User</span>
        </div>

        <div className="flex items-center gap-2">
          <Checkbox
            checked={form.isActive}
            onCheckedChange={(checked) =>
              handleChange("isActive", checked)
            }
          />
          <span className="font-medium">Active</span>
        </div>

        <Divider />

        <Button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white w-full"
          disabled={saving}
        >
          {saving ? "Saving..." : "Save Changes"}
        </Button>
      </form>
    </div>
  );
};

export default EditUserPage;
