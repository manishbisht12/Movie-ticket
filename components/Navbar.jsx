"use client";
import { useMovies } from "@/context/MovieContext";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import axios from "axios";
import { MdLogout } from "react-icons/md";
import { FiMenu, FiX } from "react-icons/fi";

export default function Navbar() {
  const { search, setSearch } = useMovies();
  const [user, setUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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
    <nav className="fixed top-0 left-0 w-full z-50 bg-black/80 backdrop-blur-md">
      <div className="px-6 md:px-16 py-4 md:py-6 flex items-center justify-between">
        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white transition-colors"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
        </button>

        {/* Logo or Brand Name (Optional - but helps on mobile) */}
        {!isMenuOpen && (
          <div className="md:hidden">
            <Link href="/" className="text-xl font-Lilita text-red-500">
              Movie Magic
            </Link>
          </div>
        )}

        {/* Desktop Nav Links */}
        <div className="hidden md:flex gap-12 text-lg font-Tagesschrift font-bold ">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className={`transition ${isActive(link.path) ? "text-red-500" : "text-white/90 hover:text-red-500"
                }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Search & Profile/Login */}
        <div className="flex items-center gap-4 md:gap-6">
          {pathname === "/movies" && (
            <input
              type="search"
              placeholder="Search movie..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="px-4 py-2 w-32 sm:w-60 rounded-md bg-black/60 border border-white/30 text-white placeholder-white/60 outline-none focus:border-red-500 transition"
            />
          )}

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
                    className="w-full flex items-center gap-2 px-4 py-3 text-md font-bold text-red-500 hover:bg-neutral-800 hover:text-red-400 transition-all duration-200"
                  >
                    <MdLogout size={20} />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <Link href="/login">
              <button className="px-4 md:px-6 py-2 rounded-md border border-red-500 text-red-500 font-semibold hover:bg-red-500 hover:text-white transition-all duration-300 text-sm md:text-base">
                Login
              </button>
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-black border-t border-white/10 py-6 px-6 animate-in slide-in-from-top duration-300">
          <div className="flex flex-col gap-6 text-xl font-Tagesschrift">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                onClick={() => setIsMenuOpen(false)}
                className={`transition ${isActive(link.path) ? "text-red-500 font-bold" : "text-white/90 hover:text-red-500"
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
