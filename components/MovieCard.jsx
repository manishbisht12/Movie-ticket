"use client";
import Link from "next/link";
import { useMovies } from "@/context/MovieContext";

export default function MovieCard() {
  const { movies } = useMovies(); 

  
  const getImageUrl = (posterPath) => {
    if (!posterPath) return "https://via.placeholder.com/300x450?text=No+Poster";

    // Replace localhost URLs with production URL
    if (posterPath.includes("localhost:5000")) {
      const prodUrl = process.env.NEXT_PUBLIC_API_URL || "https://movie-ticket-backend-f0ss.onrender.com";
      return posterPath.replace("http://localhost:5000", prodUrl);
    }

    // If already a full URL, return as is
    if (posterPath.startsWith('http')) {
      return posterPath;
    }

    // For relative paths, append to API URL
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://movie-ticket-backend-f0ss.onrender.com";
    return `${apiUrl}/uploads/${posterPath}`;
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {movies.map((movie) => (
        <div
          key={movie._id}
          className="bg-black/70 rounded-xl border border-white/10 hover:border-red-500 transition"
        >
         
          <img
            src={getImageUrl(movie.poster)}
            alt={movie.title}
            
            className="w-full h-64 object-cover rounded-t-xl"
          />

          <div className="p-4 text-white">
            <h3 className="text-lg font-semibold">{movie.title}</h3>
            <p className="text-white/60 text-sm">
              {movie.genre} • {movie.language}
            </p>

            <div className="flex justify-between items-center mt-4">
              <span className="text-yellow-400">⭐ {movie.rating}</span>

              
              <Link
                href={`/movie/${movie._id}`}
                className="px-4 py-2 bg-red-600 rounded hover:bg-red-700 text-sm"
              >
                Book Now
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}