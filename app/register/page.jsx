"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function RegisterPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = (e) => {
    e.preventDefault();

    // demo purpose
    localStorage.setItem("registerData", JSON.stringify(form));
    router.push("/verify-otp");
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <div className="flex justify-center items-center pt-32 pb-20">
        <form
          onSubmit={handleRegister}
          className="w-full max-w-md bg-black/70 border border-white/10 rounded-xl p-8"
        >
          <h1 className="text-2xl font-bold text-center mb-6 text-red-500">
            Register
          </h1>

          {/* Name */}
          <div className="mb-4">
            <label className="text-sm text-white/70">Name</label>
            <input
              name="name"
              required
              value={form.name}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 rounded bg-black border border-white/20 outline-none focus:border-red-500"
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="text-sm text-white/70">Email</label>
            <input
              type="email"
              name="email"
              required
              value={form.email}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 rounded bg-black border border-white/20 outline-none focus:border-red-500"
            />
          </div>

          {/* Phone */}
          <div className="mb-6">
            <label className="text-sm text-white/70">Phone Number</label>
            <input
              type="tel"
              name="phone"
              maxLength={10}
              required
              value={form.phone}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 rounded bg-black border border-white/20 outline-none focus:border-red-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-red-600 hover:bg-red-700 rounded font-semibold transition"
          >
            Send OTP
          </button>

          {/* LOGIN LINK */}
          <p className="text-sm text-center mt-4 text-white/60">
            Already have an account?{" "}
            <Link href="/login" className="text-red-500 hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>

      <Footer />
    </div>
  );
}
