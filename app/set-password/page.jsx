"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";

export default function SetPassword() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // URL se phone number automatic nikalne ke liye (e.g. /set-password?phone=999...)
  const phoneFromQuery = searchParams.get("phone") || "";

  const [formData, setFormData] = useState({
    phone: phoneFromQuery,
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      return setError("Passwords do not match!");
    }

    setLoading(true);
    try {
      const { data } = await axios.post("http://localhost:5000/api/auth/set-password", {
        phone: formData.phone,
        password: formData.password,
      });

      if (data.success) {
        alert("Password set successfully! Please login.");
        router.push("/login");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6">
      <div className="max-w-md w-full bg-neutral-900 p-8 rounded-2xl border border-white/10 shadow-2xl">
        <h2 className="text-3xl font-bold text-white mb-2">Set Password</h2>
        <p className="text-gray-400 mb-8">Create a strong password for your account</p>

        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 p-3 rounded-lg mb-6 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-400 text-sm mb-2">Phone Number</label>
            <input
              type="text"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full bg-black border border-white/20 rounded-lg px-4 py-3 text-white focus:border-red-500 outline-none transition"
              placeholder="Enter your phone"
              required
            />
          </div>

          <div>
            <label className="block text-gray-400 text-sm mb-2">New Password</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full bg-black border border-white/20 rounded-lg px-4 py-3 text-white focus:border-red-500 outline-none transition"
              placeholder="••••••••"
              required
            />
          </div>

          <div>
            <label className="block text-gray-400 text-sm mb-2">Confirm Password</label>
            <input
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              className="w-full bg-black border border-white/20 rounded-lg px-4 py-3 text-white focus:border-red-500 outline-none transition"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg transition-all duration-300 active:scale-95 disabled:opacity-50"
          >
            {loading ? "Setting Password..." : "Set Password"}
          </button>
        </form>
      </div>
    </div>
  );
}