"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { parseCookies } from "nookies";

export default function AdminLogin() {
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1); // 1 = password, 2 = OTP
  const [err, setErr] = useState("");
  const router = useRouter();

  useEffect(() => {
    const cookies = parseCookies();
    if (cookies.core_token) router.replace("/admin/dashboard");
    else setLoading(false);
  }, [router]);

  if (loading) return null;

  async function submit(e) {
    e.preventDefault();
    setErr("");

    const body = step === 1 ? { username, password } : { username, otp };
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    if (res.ok) {
      if (step === 1 && data.otpSent) {
        setStep(2);
      } else {
        router.push("/admin/dashboard");
      }
    } else {
      setErr(data.error || "Login failed");
    }
  }

  return (
    <div className="max-w-md mx-auto py-36">
      <h2 className="text-2xl font-semibold mb-4">Admin Login</h2>
      <form onSubmit={submit} className="flex flex-col gap-3">
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          className="border p-2 rounded"
        />
        {step === 1 && (
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            type="password"
            className="border p-2 rounded"
          />
        )}
        {step === 2 && (
          <input
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter OTP"
            className="border p-2 rounded"
          />
        )}
        <button className="bg-black text-white py-2 rounded">
          {step === 1 ? "Verify Password" : "Verify OTP"}
        </button>
        {err && <p className="text-red-500">{err}</p>}
      </form>
    </div>
  );
}
