"use client";
import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    console.log({ email, password });
    alert("Login clicked (backend not connected)");
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <div className="flex items-center justify-center pt-32 pb-20">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-md bg-black/70 border border-white/10 rounded-xl p-8"
        >
          <h1 className="text-2xl font-bold text-center mb-6 text-red-500">
            Login
          </h1>

          {/* Email */}
          <div className="mb-4">
            <label className="text-sm text-white/70">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full mt-1 px-4 py-2 rounded bg-black border border-white/20 outline-none focus:border-red-500"
            />
          </div>

          {/* Password */}
          <div className="mb-6">
            <label className="text-sm text-white/70">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full mt-1 px-4 py-2 rounded bg-black border border-white/20 outline-none focus:border-red-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-red-600 hover:bg-red-700 rounded font-semibold transition"
          >
            Login
          </button>

          <p className="text-sm text-center mt-4 text-white/60">
            Don’t have an account?{" "}
            <Link href="/register" className="text-red-500 hover:underline">
              Register
            </Link>
          </p>
        </form>
      </div>

      <Footer />
    </div>
  );
}
