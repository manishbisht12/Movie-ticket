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

  const handleTimeClick = (theater, time) => {
    const movieName = "Pushpa 2: The Rule"; 
    const dateStr = `${dates[selectedDate].date} ${dates[selectedDate].month}`;
    // Navigate to seats with data
    router.push(`/seats?movie=${movieName}&theater=${theater}&time=${time}&date=${dateStr}`);
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Navbar />
      <div className="flex-grow px-16 pt-32 pb-10">
        <h1 className="text-3xl font-bold mb-8 ml-3">Select Show Time</h1>

        <div className="flex gap-4 mb-12 ml-3 overflow-x-auto pb-4 no-scrollbar">
          {dates.map((item, index) => (
            <div
              key={index}
              onClick={() => setSelectedDate(index)}
              className={`flex flex-col items-center justify-center min-w-[75px] h-20 rounded-xl cursor-pointer transition-all border ${
                selectedDate === index ? "bg-red-600 border-red-600 scale-105 shadow-lg text-black" : "bg-neutral-900 border-white/10 text-white"
              }`}
            >
              <span className="text-[10px] uppercase font-bold">{item.day}</span>
              <span className="text-xl font-black">{item.date}</span>
              <span className="text-[10px] uppercase font-bold">{item.month}</span>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-8">
          {[
            { name: "PVR Cinemas", loc: "Phoenix Mall", times: ["10:00 AM", "01:30 PM", "09:30 PM"] },
            { name: "INOX Cinemas", loc: "Pacific Mall", times: ["11:00 AM", "05:45 PM", "09:00 PM"] }
          ].map((theater) => (
            <div key={theater.name} className="bg-neutral-900/50 border border-white/10 rounded-xl p-8">
              <h2 className="text-2xl font-bold text-white mb-1">{theater.name}</h2>
              <p className="text-gray-400 text-sm mb-6">{theater.loc}</p>
              <div className="flex gap-4 flex-wrap">
                {theater.times.map((time) => (
                  <button
                    key={time}
                    onClick={() => handleTimeClick(theater.name, time)}
                    className="px-6 py-2 border border-white/20 rounded-lg text-sm font-medium hover:border-red-500 hover:text-red-500 transition-all"
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}