"use client";
import Navbar from "@/components/Navbar";
import MovieFilter from "@/components/MovieFilter";
import MovieCard from "@/components/MovieCard";
import { MovieProvider } from "@/context/MovieContext";
import Footer from "@/components/Footer";

export default function MoviesPage() {
  return (
    <MovieProvider>
      <div className="min-h-screen bg-black text-white">
        <Navbar />
        <div className="px-16 pt-32">
          {/* <h1 className="text-3xl font-bold mb-8">Now Showing</h1> */}
          <MovieFilter />
          <MovieCard />
         
        </div>
         <Footer/>
      </div>
    </MovieProvider>
  );
}
