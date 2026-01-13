"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (res.ok) {
        toast.success("OTP sent to " + form.email);
        localStorage.setItem("tempPhone", form.phone);
        localStorage.setItem("tempEmail", form.email);
        setTimeout(() => router.push("/verify-otp"), 2000);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <ToastContainer theme="dark" />
      <form onSubmit={handleRegister} className="w-full max-w-md p-8 border border-white/10 rounded-xl bg-neutral-900">
        <h1 className="text-2xl font-bold text-red-500 mb-6">Register</h1>
        <input placeholder="Name" className="w-full p-2 mb-4 bg-black border border-white/20" onChange={(e)=>setForm({...form, name: e.target.value})} required />
        <input placeholder="Email" type="email" className="w-full p-2 mb-4 bg-black border border-white/20" onChange={(e)=>setForm({...form, email: e.target.value})} required />
        <input placeholder="Phone" className="w-full p-2 mb-6 bg-black border border-white/20" onChange={(e)=>setForm({...form, phone: e.target.value})} required />
        <button disabled={loading} className="w-full py-3 bg-red-600 font-bold">{loading ? "Sending..." : "Register"}</button>
      </form>
    </div>
  );
}