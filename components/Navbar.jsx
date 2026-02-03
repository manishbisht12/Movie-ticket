"use client";
import { useMovies } from "@/context/MovieContext";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import axios from "axios";
import { MdLogout, MdKeyboardArrowDown } from "react-icons/md";
import { FiMenu, FiX } from "react-icons/fi";

export default function Navbar() {
  const { search, setSearch } = useMovies();
  const [user, setUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, [pathname]);

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isProfileOpen && !event.target.closest(".profile-container")) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isProfileOpen]);

  const isActive = (path) => pathname === path;

  const handleLogout = async () => {
    try {
      await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/logout`, { withCredentials: true });
      toast.success("Logging out... See you soon!");
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

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Movies", path: "/movies" },
    { name: "Shows", path: "/shows" },
    { name: "Book", path: "/seats" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-white/5">
      <div className="px-4 md:px-16 py-3 md:py-5 flex items-center justify-between gap-2">
        {/* Left Side: Menu Button & Logo */}
        <div className="flex items-center gap-3">
          <button
            className="md:hidden text-white hover:text-red-500 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <FiX size={26} /> : <FiMenu size={26} />}
          </button>

          <Link href="/" className="flex items-center">
            <span className="text-xl md:text-2xl font-Lilita text-red-500 whitespace-nowrap">
              Movie Magic
            </span>
          </Link>
        </div>

        {/* Desktop Nav Links (Centered) */}
        <div className="hidden md:flex gap-8 lg:gap-12 text-lg font-Tagesschrift font-bold">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className={`transition-colors duration-200 ${isActive(link.path) ? "text-red-500" : "text-white/90 hover:text-red-500"
                }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Right Side: Search & Profile */}
        <div className="flex items-center gap-2 sm:gap-4 md:gap-6">
          {pathname === "/movies" && (
            <div className="relative">
              <input
                type="search"
                placeholder="Search movie..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="px-3 py-1.5 md:px-4 md:py-2 w-28 sm:w-48 md:w-64 rounded-md bg-white/5 border border-white/20 text-white text-xs md:text-base placeholder-white/40 outline-none focus:border-red-500 focus:bg-white/10 transition-all"
              />
            </div>
          )}

          {user ? (
            <div className="relative profile-container">
              {/* Profile Avatar */}
              <div
                className="relative w-9 h-9 md:w-11 md:h-11 rounded-full bg-red-600 flex items-center justify-center text-white font-bold text-base md:text-lg uppercase shadow-lg ring-2 ring-red-500/50 cursor-pointer transition-all"
                onClick={() => setIsProfileOpen(!isProfileOpen)}
              >
                {user.name ? user.name.charAt(0) : "U"}
                <div className="absolute -bottom-1 -right-1 bg-black rounded-full border border-white/20 p-0.5">
                  <MdKeyboardArrowDown size={14} className="text-white" />
                </div>
              </div>

              {/* Dropdown Box */}
              {isProfileOpen && (
                <div className="absolute right-0 top-full mt-3 w-48 animate-in fade-in zoom-in-95 duration-200 z-50">
                  <div className="bg-[#121212] border border-white/10 rounded-xl overflow-hidden shadow-2xl">
                    {/* User Name Info */}
                    <div className="px-4 py-3 bg-white/5 border-b border-white/5">
                      <p className="text-sm font-medium truncate text-white">{user.name}</p>
                    </div>

                    {/* Logout Button with Icon */}
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsProfileOpen(false);
                      }}
                      className="w-full flex items-center gap-2 px-4 py-3 text-sm font-semibold text-red-500 hover:bg-red-500/10 transition-colors"
                    >
                      <MdLogout size={18} />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link href="/login">
              <button className="px-4 py-1.5 md:px-6 md:py-2 rounded-full border border-red-500 text-red-500 font-bold hover:bg-red-500 hover:text-white transition-all text-sm">
                Login
              </button>
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-black border-t border-white/10 py-6 px-6 animate-in slide-in-from-top duration-300">
          <div className="flex flex-col gap-6 text-xl font-Tagesschrift text-center">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                onClick={() => setIsMenuOpen(false)}
                className={`transition-colors duration-200 ${isActive(link.path) ? "text-red-500 font-bold" : "text-white/90 hover:text-red-500"
                  }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
