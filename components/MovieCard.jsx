"use client";
import Link from "next/link";
import { useMovies } from "@/context/MovieContext";

export default function MovieCard() {
  const { movies } = useMovies(); // 👈 CONTEXT

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {movies.map((movie) => (
        <div
          key={movie.id}
          className="bg-black/70 rounded-xl border border-white/10 hover:border-red-500 transition"
        >
          <img
            src={movie.poster}
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
                href={`/movie/${movie.id}`}
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
