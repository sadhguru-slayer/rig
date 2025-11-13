"use client";

import { useState } from "react";
import { toast } from "sonner";

export default function ChangePasswordPage() {
  const [mode, setMode] = useState("old"); // "old" or "otp"
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);

  // --- handle change via old password ---
  const handleChangePassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/admin/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ oldPassword, newPassword }),
      });
      const data = await res.json();

      if (res.ok) {
        toast.success("Password updated successfully!");
        setOldPassword("");
        setNewPassword("");
      } else {
        toast.error(data.error || "Error updating password");
      }
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // --- request OTP ---
  const handleRequestOtp = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/change-password/otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ step: "request" }),
      });
      const data = await res.json();

      if (res.ok) {
        toast.success("OTP sent to your email!");
        setOtpSent(true);
      } else {
        toast.error(data.error || "Failed to send OTP");
      }
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // --- verify OTP & change password ---
  const handleOtpVerify = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/admin/change-password/otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ step: "verify", otp, newPassword }),
      });
      const data = await res.json();

      if (res.ok) {
        toast.success("Password updated successfully!");
        setOtp("");
        setNewPassword("");
        setOtpSent(false);
      } else {
        toast.error(data.error || "Error updating password");
      }
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 text-center">
        Change Password
      </h2>

      {/* Toggle Buttons */}
      <div className="flex gap-2 mb-6 justify-center">
        <button
          onClick={() => setMode("old")}
          className={`px-4 py-2 rounded-md text-sm font-medium transition ${
            mode === "old"
              ? "bg-teal-600 text-white"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          With Old Password
        </button>
        <button
          onClick={() => setMode("otp")}
          className={`px-4 py-2 rounded-md text-sm font-medium transition ${
            mode === "otp"
              ? "bg-teal-600 text-white"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          With OTP
        </button>
      </div>

      {mode === "old" ? (
        // --- Old Password Mode ---
        <form onSubmit={handleChangePassword} className="flex flex-col gap-3">
          <input
            type="password"
            placeholder="Old Password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            className="border p-2 rounded"
            required
          />
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="border p-2 rounded"
            required
          />
          <button
            disabled={loading}
            className="bg-teal-600 text-white py-2 rounded hover:bg-teal-700 transition"
          >
            {loading ? "Updating..." : "Update Password"}
          </button>
        </form>
      ) : (
        // --- OTP Mode ---
        <form onSubmit={handleOtpVerify} className="flex flex-col gap-3">
          {!otpSent ? (
            <>
              <button
                type="button"
                disabled={loading}
                onClick={handleRequestOtp}
                className="bg-teal-600 text-white py-2 rounded hover:bg-teal-700 transition"
              >
                {loading ? "Sending OTP..." : "Send OTP to Email"}
              </button>
            </>
          ) : (
            <>
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="border p-2 rounded"
                required
              />
              <input
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="border p-2 rounded"
                required
              />
              <button
                disabled={loading}
                className="bg-teal-600 text-white py-2 rounded hover:bg-teal-700 transition"
              >
                {loading ? "Updating..." : "Verify & Update Password"}
              </button>
            </>
          )}
        </form>
      )}
    </div>
  );
}
