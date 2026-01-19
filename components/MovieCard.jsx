"use client";
import Link from "next/link";
import { useMovies } from "@/context/MovieContext";

export default function MovieCard() {
  const { movies } = useMovies(); 

  // Helper function: Images ko local se serve karne ke liye
  const getImageUrl = (posterPath) => {
    if (!posterPath) return "/Images/movies/placeholder.png";

    // Agar poster path mein full URL hai, toh sirf filename extract karo
    const filename = posterPath.split('/').pop(); // e.g., "Avatar.png"

    // Local path use karo
    return `/Images/movies/${filename}`;
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {movies.map((movie) => (
        <div
          key={movie._id}
          className="bg-black/70 rounded-xl border border-white/10 hover:border-red-500 transition"
        >
          {/* Sahi Image URL yahan use ho raha hai */}
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

              {/* href mein movie.id ki jagah movie._id use karein kyunki MongoDB mein yahi hota hai */}
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