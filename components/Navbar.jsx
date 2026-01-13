"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import axios from "axios";
import { MdLogout } from "react-icons/md"; 

export default function Navbar() {
  const [movie, setMovie] = useState("");
  const [user, setUser] = useState(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, [pathname]);

  const isActive = (path) => pathname === path;

  const handleLogout = async () => {
    try {
    
      await axios.get("http://localhost:5000/api/auth/logout", { withCredentials: true });
     
      toast.success("Logging out... See you soon!");

     t
      setTimeout(() => {
        localStorage.removeItem("user");
        setUser(null);
        router.push("/");
      }, 2000);
      
    } catch (error) {
      toast.error("Logout failed. Please try again.");
      console.error("Logout Error:", error);
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black/80 backdrop-blur-md">
      <div className="px-16 py-6 flex items-center justify-between">
        
      
        <div className="flex gap-12 text-lg font-Tagesschrift">
          <Link href="/" className={`transition ${isActive("/") ? "text-red-500" : "text-white/90 hover:text-red-500"}`}>Home</Link>
          <Link href="/movies" className={`transition ${isActive("/movies") ? "text-red-500" : "text-white/90 hover:text-red-500"}`}>Movies</Link>
          <Link href="/shows" className={`transition ${isActive("/shows") ? "text-red-500" : "text-white/90 hover:text-red-500"}`}>Shows</Link>
          <Link href="/seats" className={`transition ${isActive("/seats") ? "text-red-500" : "text-white/90 hover:text-red-500"}`}>Book</Link>
        </div>

       
        <div className="flex items-center gap-6">
          <input
            type="search"
            placeholder="Search movie..."
            value={movie}
            onChange={(e) => setMovie(e.target.value)}
            className="px-4 py-2 w-60 rounded-md bg-black/60 border border-white/30 text-white placeholder-white/60 outline-none focus:border-red-500 transition"
          />

          {user ? (
            <div className="relative group">
              {/* Profile Avatar */}
              <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center text-white font-bold text-lg uppercase shadow-lg border border-white/10 cursor-pointer">
                {user.name ? user.name.charAt(0) : "U"}
              </div>
              
              {/* Dropdown Box */}
              <div className="absolute right-0 top-full pt-3 hidden group-hover:block w-48 animate-in fade-in zoom-in-95 duration-200">
                <div className="bg-neutral-900 border border-white/10 rounded-lg overflow-hidden shadow-2xl">
                  {/* User Name Info */}
                  <div className="px-4 py-3 bg-white/5 border-b border-white/5">
                    <p className="text-sm font-medium truncate text-white">{user.name}</p>
                  </div>
                  
                  {/* Logout Button with Icon */}
                  <button 
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-4 py-3 text-md font-bold text-red-500 hover:bg-red-600 hover:text-white transition-all duration-200"
                  >
                    <MdLogout size={20} />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <Link href="/login">
              <button className="px-6 py-2 rounded-md border border-red-500 text-red-500 font-semibold hover:bg-red-500 hover:text-white transition-all duration-300">
                Login
              </button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}