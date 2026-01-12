"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useRouter } from "next/navigation";

export default function ShowsPage() {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState(0);

  const dates = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    return {
      day: d.toLocaleDateString("en-US", { weekday: "short" }),
      date: d.getDate(),
      month: d.toLocaleDateString("en-US", { month: "short" }),
    };
  });

  const handleTimeClick = () => {
    router.push("/seats");
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Navbar />

      <div className="flex-grow px-16 pt-32 pb-10">
        <h1 className="text-3xl font-bold mb-8 ml-3">Select Show Time</h1>

        {/* --- DATE SELECTOR --- */}
        <div className="flex gap-4 mb-12 ml-3 overflow-x-auto pb-4 no-scrollbar">
          {dates.map((item, index) => {
            const isSelected = selectedDate === index;
            return (
              <div
                key={index}
                onClick={() => setSelectedDate(index)}
                className={`flex flex-col items-center justify-center min-w-[75px] h-20 rounded-xl cursor-pointer transition-all border ${
                  isSelected
                    ? "bg-red-600 border-red-600 scale-105 shadow-lg shadow-red-600/20 text-black"
                    : "bg-neutral-900 border-white/10 hover:border-white/30 text-white"
                }`}
              >
                <span className={`text-[10px] uppercase font-bold ${isSelected ? "opacity-80" : "opacity-60"}`}>
                  {item.day}
                </span>
                <span className="text-xl font-black">{item.date}</span>
                <span className={`text-[10px] uppercase font-bold ${isSelected ? "opacity-80" : "opacity-60"}`}>
                  {item.month}
                </span>
              </div>
            );
          })}
        </div>

        {/* SHOW CARDS (Time slots moved below theater info) */}
        <div className="grid grid-cols-1 gap-8">
          
          {/* THEATER CARD 1 */}
          <div className="bg-neutral-900/50 border border-white/10 rounded-xl p-8 hover:border-white/20 transition">
            <div className="flex flex-col gap-6"> {/* Changed to flex-col for vertical stacking */}
              
              {/* Theater Info */}
              <div>
                <h2 className="text-2xl font-bold text-white mb-1">PVR Cinemas</h2>
                <p className="text-gray-400 text-sm">Phoenix Mall, Dehradun</p>
              </div>

              {/* Time Slots (Now directly below) */}
              <div className="flex gap-4 flex-wrap pt-2">
                {["10:00 AM", "01:30 PM", "06:00 PM", "09:30 PM"].map((time) => (
                  <button
                    key={time}
                    onClick={handleTimeClick}
                    className="px-6 py-2 border border-white/20 rounded-lg text-sm font-medium text-white/80 hover:border-red-500 hover:text-red-500 transition-all active:scale-95"
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* THEATER CARD 2 */}
          <div className="bg-neutral-900/50 border border-white/10 rounded-xl p-8 hover:border-white/20 transition">
            <div className="flex flex-col gap-6">
              
              {/* Theater Info */}
              <div>
                <h2 className="text-2xl font-bold text-white mb-1">INOX Cinemas</h2>
                <p className="text-gray-400 text-sm">Pacific Mall, Dehradun</p>
              </div>

              {/* Time Slots (Now directly below) */}
              <div className="flex gap-4 flex-wrap pt-2">
                {["11:00 AM", "02:15 PM", "05:45 PM", "09:00 PM"].map((time) => (
                  <button
                    key={time}
                    onClick={handleTimeClick}
                    className="px-6 py-2 border border-white/20 rounded-lg text-sm font-medium text-white/80 hover:border-red-500 hover:text-red-500 transition-all active:scale-95"
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>

      <Footer />
    </div>
  );
}