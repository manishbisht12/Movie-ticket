"use client";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function VerifyOtpPage() {
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState(""); // Added email state
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const inputsRef = useRef([]);

  // Get phone and email from localStorage on mount
  useEffect(() => {
    const storedPhone = localStorage.getItem("tempPhone");
    const storedEmail = localStorage.getItem("tempEmail");
    
    if (!storedPhone) {
      toast.error("Session expired. Please register again.");
      router.push("/register");
    } else {
      setPhone(storedPhone);
      setEmail(storedEmail || "your email"); // Correctly setting the email state
    }
  }, [router]);

  const handleChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 3) inputsRef.current[index + 1].focus();
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    const enteredOtp = otp.join("");
    if (enteredOtp.length < 4) return toast.warn("Enter 4-digit OTP");

    try {
      setLoading(true);
      const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/verify-otp`, {
        phone, 
        otp: enteredOtp,
      });

      if (data.success) {
        toast.success("OTP Verified!");
        setShowPasswordModal(true);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleSetPassword = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/set-password`, {
        phone,
        password,
      });

      if (data.success) {
        toast.success("Password set successfully!");
        localStorage.removeItem("tempPhone"); 
        localStorage.removeItem("tempEmail"); // Cleanup email too
        setTimeout(() => router.push("/login"), 2000);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Error setting password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <ToastContainer theme="dark" />
      <Navbar />
      <div className="flex justify-center items-center pt-32 pb-20">
        <form onSubmit={handleVerify} className="w-full max-w-md bg-black/70 border border-white/10 rounded-xl p-8">
          <h1 className="text-2xl font-bold text-center mb-4 text-red-500">Verify OTP</h1>
          {/* Now displaying the Email instead of Phone as per your request */}
          <p className="text-sm text-center text-white/60 mb-6">Enter OTP sent to <span className="text-red-500">{email}</span></p>
          <div className="flex justify-center gap-4 mb-6">
            {otp.map((digit, index) => (
              <input key={index} ref={(el) => (inputsRef.current[index] = el)} type="text" maxLength={1} value={digit} onChange={(e) => handleChange(e.target.value, index)} onKeyDown={(e) => handleKeyDown(e, index)} className="w-12 h-12 text-center text-xl bg-black border border-white/20 rounded-md outline-none focus:border-red-500" />
            ))}
          </div>
          <button type="submit" disabled={loading} className="w-full py-3 bg-red-600 hover:bg-red-700 rounded font-semibold transition disabled:opacity-50">
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>
      </div>

      {showPasswordModal && (
        <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-sm bg-neutral-900 border border-white/10 p-8 rounded-2xl shadow-2xl relative">
            <h2 className="text-2xl font-bold mb-2 text-white">Set Password</h2>
            <form onSubmit={handleSetPassword}>
              <div className="relative mb-6">
                <input type={showPassword ? "text" : "password"} placeholder="Enter new password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full bg-black border border-white/20 rounded-lg px-4 py-3 pr-12 text-white focus:border-red-500 outline-none" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white">
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              <button type="submit" disabled={loading} className="w-full py-3 bg-red-600 hover:bg-red-700 rounded-lg font-bold transition">
                {loading ? "Saving..." : "Set Password & Login"}
              </button>
            </form>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}