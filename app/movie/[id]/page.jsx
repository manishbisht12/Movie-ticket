"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import Navbar from "@/components/Navbar"; 
import Footer from "@/components/Footer";

export default function MovieDetails() {
  const { id } = useParams();
  const router = useRouter();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedTime, setSelectedTime] = useState("");

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/movies/${id}`);
        if (data.success) {
          setMovie(data.movie);
        }
      } catch (err) {
        console.error("Error fetching movie:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMovieDetails();
  }, [id]);

  const getImageUrl = (path) => {
    if (!path) return "https://via.placeholder.com/500x750?text=No+Poster";
    
    // Replace localhost URLs with production URL
    if (path.includes("localhost:5000")) {
      const prodUrl = process.env.NEXT_PUBLIC_API_URL || "https://movie-ticket-backend-f0ss.onrender.com";
      return path.replace("http://localhost:5000", prodUrl);
    }
    
    if (path.startsWith("http")) return path;
    
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://movie-ticket-backend-f0ss.onrender.com";
    return `${apiUrl}/uploads/${path}`;
  };

  if (loading) return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-red-600"></div>
    </div>
  );

  if (!movie) return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center">
      <h2 className="text-2xl font-bold">Movie Not Found!</h2>
    </div>
  );

  return (
    <div className="bg-[#0a0a0a] min-h-screen text-white font-sans selection:bg-red-600">
      <Navbar />

      {/* Hero Section - No Blur version */}
      <div className="relative w-full h-[50vh] md:h-[60vh] overflow-hidden">
        {/* Background is now a clean solid gradient to maintain visibility */}
        <div className="absolute inset-0 bg-black" />
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 -mt-[35vh] relative z-10 pb-20">
        <div className="flex flex-col md:flex-row gap-12 items-start">
          
          {/* Left: Poster Image */}
          <div className="w-full md:w-[400px] shrink-0 group">
            <div className="overflow-hidden rounded-2xl border border-white/10 shadow-2xl shadow-black bg-[#161616]">
              <img 
                src={getImageUrl(movie.poster)} 
                alt={movie.title} 
                className="w-full h-auto object-cover transform transition duration-500 group-hover:scale-105"
              />
            </div>
          </div>

          {/* Right: Movie Info */}
          <div className="flex-1 space-y-6 pt-4">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="bg-red-600 px-3 py-1 rounded text-xs font-bold uppercase tracking-widest text-white">Premium</span>
                <span className="text-yellow-400 font-bold flex items-center gap-1 text-lg">
                  ★ {movie.rating}
                </span>
              </div>
              <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter text-white">
                {movie.title}
              </h1>
              <p className="text-gray-400 text-lg md:text-xl font-medium">
                {movie.genre} <span className="mx-2 text-red-600">•</span> {movie.language}
              </p>
            </div>

            <p className="text-gray-300 leading-relaxed text-lg max-w-2xl border-l-4 border-red-600 pl-6 py-2 bg-white/5 rounded-r-lg">
              {movie.description || "In a world of mystery and excitement, experience this cinematic masterpiece on the big screen. Immerse yourself in the story like never before."}
            </p>

            {/* Booking Box - Removed backdrop-blur */}
            <div className="bg-[#161616] p-6 rounded-3xl border border-white/5 shadow-2xl space-y-6">
              <div>
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <span className="w-2 h-4 bg-red-600 rounded-full inline-block"></span>
                  Select Experience Time
                </h3>
                <div className="flex flex-wrap gap-4">
                  {["10:00 AM", "02:00 PM", "06:00 PM", "09:00 PM"].map((time) => (
                    <button 
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={`px-5 py-3 rounded-xl font-bold transition-all duration-300 border ${
                        selectedTime === time 
                        ? "bg-red-600 border-red-600 text-white scale-105 shadow-lg shadow-red-600/30" 
                        : "bg-transparent border-white/20 text-gray-400 hover:border-red-600 hover:text-white"
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
              
              <button 
                disabled={!selectedTime}
                onClick={() => router.push(`/movie/${id}/seats?time=${selectedTime}`)}
                className={`w-full py-4 rounded-2xl font-black text-lg tracking-wide transition-all duration-500 transform ${
                  selectedTime 
                  ? "bg-gradient-to-r from-red-700 to-red-600 hover:scale-[1.02] hover:shadow-2xl shadow-red-600/40 active:scale-95 text-white" 
                  : "bg-gray-800 text-gray-500 cursor-not-allowed"
                }`}
              >
                PROCEED TO SEAT SELECTION
              </button>
              {!selectedTime && <p className="text-center text-sm text-gray-500 animate-pulse">Please pick a showtime to continue</p>}
            </div>
          </div>

        </div>
      </div>
      <Footer />
    </div>
  );
}