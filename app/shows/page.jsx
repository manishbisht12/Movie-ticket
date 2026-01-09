"use client";
import Navbar from "@/components/Navbar";

export default function ShowsPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <div className="px-16 pt-32">
        <h1 className="text-3xl font-bold mb-10 ml-3">
          Select Show Time
        </h1>

        {/* SHOW CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-1 gap-10">

          {/* CARD 1 */}
          <div className="bg-black/70 border border-white/10 rounded-xl p-6  transition">
            <h2 className="text-xl font-semibold mb-2">
              PVR Cinemas
            </h2>
            <p className="text-white/60 mb-4">
              Phoenix Mall, Dehradun
            </p>

            <div className="flex   gap-4  flex-wrap">
              <button className="show-btn px-6 py-2 border border-white/30 rounded hover:border-red-500 hover:text-red-500">10:00 AM</button>
              <button className="show-btn px-6 py-2 border border-white/30 rounded hover:border-red-500 hover:text-red-500">1:30 PM</button>
              <button className="show-btn px-6 py-2 border border-white/30 rounded hover:border-red-500 hover:text-red-500">6:00 PM</button>
              <button className="show-btn px-6 py-2 border border-white/30 rounded hover:border-red-500 hover:text-red-500">9:30 PM</button>
            </div>
          </div>

          {/* CARD 2 */}
          <div className="bg-black/70 border border-white/10 rounded-xl p-6  transition">
            <h2 className="text-xl font-semibold mb-2">
              INOX Cinemas
            </h2>
            <p className="text-white/60 mb-4">
              Pacific Mall, Dehradun
            </p>

            <div className="flex gap-4 flex-wrap">
              <button className="show-btn px-6 py-2 border border-white/30 rounded hover:border-red-500 hover:text-red-500">11:00 AM</button>
              <button className="show-btn px-6 py-2 border border-white/30 rounded hover:border-red-500 hover:text-red-500">2:15 PM</button>
              <button className="show-btn px-6 py-2 border border-white/30 rounded hover:border-red-500 hover:text-red-500">5:45 PM</button>
              <button className="show-btn px-6 py-2 border border-white/30 rounded hover:border-red-500 hover:text-red-500">9:00 PM</button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
