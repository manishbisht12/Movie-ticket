"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation"; // 1. usePathname import kiya

export default function Navbar() {
  const [movie, setMovie] = useState("");
  const pathname = usePathname(); // 2. Current path get kiya

  // Ek helper function taaki code saaf dikhe
  const isActive = (path) => pathname === path;

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black/80 backdrop-blur-md">
      <div className="px-16 py-6 flex items-center justify-between">
        
        {/* LEFT MENU */}
        <div className="flex gap-12 text-lg font-medium">
          <Link 
            href="/" 
            className={`cursor-pointer transition ${
              isActive("/") ? "text-red-500" : "text-white/90 hover:text-red-500"
            }`}
          >
            Home
          </Link>
          
          <Link 
            href="/movies" 
            className={`cursor-pointer transition ${
              isActive("/movies") ? "text-red-500" : "text-white/90 hover:text-red-500"
            }`}
          >
            Movies
          </Link>
          
          <Link 
            href="/shows" 
            className={`cursor-pointer transition ${
              isActive("/shows") ? "text-red-500" : "text-white/90 hover:text-red-500"
            }`}
          >
            Shows
          </Link>
          
          <Link 
            href="/seats" 
            className={`cursor-pointer transition ${
              isActive("/seats") ? "text-red-500" : "text-white/90 hover:text-red-500"
            }`}
          >
            Book
          </Link>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-6">
          <input
            type="search"
            placeholder="Search movie..."
            value={movie}
            onChange={(e) => setMovie(e.target.value)}
            className="
              px-4 py-2 w-60 rounded-md
              bg-black/60
              border border-white/30
              text-white
              placeholder-white/60
              outline-none
              focus:border-red-500
            "
          />

          <button
            className="
              px-6 py-2 rounded-md
              border border-red-500
              text-red-500
              font-semibold
              hover:bg-red-500
              hover:text-white
              transition-all duration-300
            "
          >
            Login
          </button>
        </div>
      </div>
    </nav>
  );
}