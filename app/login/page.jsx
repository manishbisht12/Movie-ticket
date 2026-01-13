"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Calling your backend login route
      const { data } = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password },
        { withCredentials: true } // Important: This allows the browser to store the HttpOnly cookie
      );

      if (data.success) {
        toast.success("Login successful!");
        
        // Optional: Save non-sensitive user data to local storage for UI use
        localStorage.setItem("user", JSON.stringify(data.user));
             
        setTimeout(() => {
          router.push("/"); // Redirect to your home/dashboard page
        }, 1500);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid Email or Password");
      console.error("Login Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Toast notifications container */}
      <ToastContainer theme="dark" position="top-right" autoClose={3000} />
      
      <Navbar />

      <div className="flex items-center justify-center pt-32 pb-20">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-md bg-black/70 border border-white/10 rounded-xl p-8 shadow-2xl"
        >
          <h1 className="text-2xl font-bold text-center mb-6 text-red-500">
            Login
          </h1>

          {/* Email Input */}
          <div className="mb-4">
            <label className="text-sm text-white/70">Email</label>
            <input
              type="email"
              placeholder="example@mail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full mt-1 px-4 py-2 rounded bg-black border border-white/20 outline-none focus:border-red-500 transition"
            />
          </div>

          {/* Password Input with Eye Toggle */}
          <div className="mb-6 relative">
            <label className="text-sm text-white/70">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full mt-1 px-4 py-2 rounded bg-black border border-white/20 outline-none focus:border-red-500 transition pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 bg-red-600 hover:bg-red-700 rounded font-semibold transition flex items-center justify-center ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Logging in...
              </span>
            ) : (
              "Login"
            )}
          </button>

          <p className="text-sm text-center mt-4 text-white/60">
            Don’t have an account?{" "}
            <Link href="/register" className="text-red-500 hover:underline font-medium">
              Register
            </Link>
          </p>
        </form>
      </div>

      <Footer />
    </div>
  );
}