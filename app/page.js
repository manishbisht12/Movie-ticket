"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function HomePage() {
  const [movie, setMovie] = useState("");

  return (
    <div
      className="min-h-screen bg-cover bg-center text-white"
      style={{
        backgroundImage:
          "linear-gradient(rgba(0,0,0,0.75), rgba(0,0,0,0.75)), url('/images/Home.jpg')",
      }}
    >
      
      <Navbar/>

      {/* ================= HERO ================= */}
      <div className="flex flex-col items-start justify-center px-24 mt-32  max-w-3xl">
        <h1 className="text-5xl font-bold leading-tight">
          Book Movie Tickets <br />
          <span className="text-red-500">Online Easily</span>
        </h1>

        <p className="mt-6 text-lg text-white/70">
          Watch the latest movies in your favourite theatres.
          Choose seats, shows and enjoy the experience.
        </p>

        <div className="mt-8 flex gap-6">
          <button className="px-8 py-3 rounded-md bg-red-600 hover:bg-red-700 transition">
            Book Now
          </button>

          <button className="px-8 py-3 rounded-md border border-white/40 hover:border-red-500 hover:text-red-500 transition">
            Explore Movies
          </button>
        </div>
      </div>

      {/* ================= FEATURES (USING YOUR IMAGES) ================= */}
      <div className="mt-40 px-24 grid grid-cols-3 gap-12">
  
  {/* Ticket */}
  <div className="bg-black/50 p-8 rounded-lg border border-white/10 text-center">
    <img
      src="/images/ticket.png"
      alt="Ticket"
      className="w-16 mx-auto mb-4 filter invert brightness-200"
    />
    <h3 className="text-xl font-semibold text-red-500">
      Easy Ticket Booking
    </h3>
    <p className="mt-3 text-white/70">
      Book movie tickets quickly with a smooth and simple flow.
    </p>
  </div>

  {/* Seat */}
  <div className="bg-black/50 p-8 rounded-lg border border-white/10 text-center">
    <img
      src="/images/seat.png"
      alt="Seat"
      className="w-16 mx-auto mb-4 filter invert brightness-200"
    />
    <h3 className="text-xl font-semibold text-red-500">
      Seat Selection
    </h3>
    <p className="mt-3 text-white/70">
      Choose your favourite seats with real-time availability.
    </p>
  </div>

  {/* Video */}
  <div className="bg-black/50 p-8 rounded-lg border border-white/10 text-center">
    <img
      src="/images/video.png"
      alt="Video"
      className="w-16 mx-auto mb-4 filter invert brightness-200"
    />
    <h3 className="text-xl font-semibold text-red-500">
      Latest Movies
    </h3>
    <p className="mt-3 text-white/70">
      Explore trending and upcoming movies instantly.
    </p>
  </div>
</div>


     <Footer/>
      
    </div>
  );
}
