"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { parseCookies } from "nookies";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function AdminLogin() {
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();

  // Auto-redirect if already logged in
  useEffect(() => {
    const cookies = parseCookies();
    if (cookies.core_token) router.replace("/admin/dashboard");
    else setLoading(false);
  }, [router]);

  if (loading) return null;

  async function submit(e) {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg("");

    try {
      const body = step === 1 ? { username, password } : { username, otp };
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (res.ok) {
        // OTP Sent → Go to step 2
        if (step === 1 && data.otpSent) {
          toast.success("OTP sent successfully! Please check your email.");
          setStep(2);
        } else {
          toast.success("Login successful!");
          router.push("/admin/dashboard");
        }
      } else {
        // Handle backend error messages more specifically
        if (res.status === 401) {
          if (data.error?.includes("Invalid credentials")) {
            if (step === 1) setErrorMsg("Incorrect username or password.");
            else setErrorMsg("Incorrect or expired OTP.");
          } else if (data.error?.includes("OTP")) {
            setErrorMsg("Invalid or expired OTP.");
          } else {
            setErrorMsg("Authentication failed.");
          }
        } else if (res.status === 400) {
          setErrorMsg("Please fill in all required fields.");
        } else {
          setErrorMsg(data.error || "Unexpected server error.");
        }

        toast.error(data.error || "Login failed.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Network or server error.");
      setErrorMsg("Network error. Please try again later.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <Card className="w-full max-w-md shadow-lg border border-gray-200">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-center">
            Admin Login
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={submit} className="flex flex-col gap-4">
            {/* Username */}
            <Input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              disabled={submitting || step === 2}
              required
            />

            {/* Password */}
            {step === 1 && (
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                disabled={submitting}
                required
              />
            )}

            {/* OTP */}
            {step === 2 && (
              <Input
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter OTP"
                disabled={submitting}
                required
              />
            )}

            {/* Error Message */}
            {errorMsg && (
              <p className="text-red-500 text-sm text-center mt-1">{errorMsg}</p>
            )}

            {/* Button */}
            <Button
              type="submit"
              disabled={submitting}
              className="w-full mt-2 cursor-pointer bg-teal-600 hover:bg-teal-700 text-white font-medium"
            >
              {submitting ? (
                <div className="flex items-center justify-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  {step === 1 ? "Verifying..." : "Checking OTP..."}
                </div>
              ) : step === 1 ? (
                "Verify Password"
              ) : (
                "Verify OTP"
              )}
            </Button>

            {step === 2 && (
              <p
                className="text-sm text-center text-gray-500 hover:underline cursor-pointer"
                onClick={() => {
                  setStep(1);
                  setOtp("");
                  setErrorMsg("");
                  toast.info("You can re-enter your password to resend OTP.");
                }}
              >
                <span className="font-bold">
                Resend OTP :
                </span>{" "}Enter password again
              </p>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
