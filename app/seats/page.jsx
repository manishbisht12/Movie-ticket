"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState } from "react";
import RazorpayPayment from "@/components/RazorpayPayment"; // 👈 Component Import Kiya

export default function SeatsPage() {
  const [selectedSeats, setSelectedSeats] = useState([]);

  // Seat counts
  const silverSeats = Array.from({ length: 60 });
  const goldSeats = Array.from({ length: 80 });
  const platinumSeats = Array.from({ length: 20 });

  // Price Configuration
  const pricing = {
    silver: 150,
    gold: 250,
    platinum: 350
  };

  // Total amount calculate logic
  const totalPrice = selectedSeats.reduce((acc, seatId) => {
    const type = seatId.split("-")[0];
    return acc + pricing[type];
  }, 0);

  const handleSeatClick = (seatId) => {
    setSelectedSeats((prev) =>
      prev.includes(seatId)
        ? prev.filter((id) => id !== seatId)
        : [...prev, seatId]
    );
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Navbar />

      <div className="flex-grow px-5 md:px-10 pt-32 pb-4">
        <h1 className="text-3xl font-bold mb-10 text-center uppercase tracking-widest">
          Select Your Seats
        </h1>

        {/* SCREEN SECTION */}
        <div className="mb-16 flex flex-col items-center">
          <div className="w-full max-w-2xl h-1 bg-white/40 shadow-[0_0_20px_rgba(255,255,255,0.3)] rounded-full"></div>
          <p className="text-[10px] text-gray-500 mt-2 tracking-widest uppercase text-center">Screen</p>
        </div>

        {/* SEAT SECTIONS */}
        <div className="flex flex-col gap-10">
          <Section title={`Silver - ₹${pricing.silver}`}>
            <SeatGrid seats={silverSeats} sectionId="silver" selectedSeats={selectedSeats} onSeatClick={handleSeatClick} />
          </Section>

          <Section title={`Gold - ₹${pricing.gold}`}>
            <SeatGrid seats={goldSeats} sectionId="gold" selectedSeats={selectedSeats} onSeatClick={handleSeatClick} />
          </Section>

          <Section title={`Platinum - ₹${pricing.platinum}`}>
            <SeatGrid seats={platinumSeats} sectionId="platinum" selectedSeats={selectedSeats} onSeatClick={handleSeatClick} />
          </Section>
        </div>

        {/* LEGEND (Information) */}
        <div className="flex justify-center gap-10 mt-12 border-t border-white/10 pt-6">
          <div className="flex items-center gap-2">
            <img src="/images/seat.png" className="w-5 brightness-0 invert opacity-40" alt="Available" />
            <span className="text-xs text-gray-400">Available</span>
          </div>
          <div className="flex items-center gap-2">
            <img src="/images/seat.png" className="w-5 brightness-0 invert-[0.5] sepia-[1] hue-rotate-[70deg] saturate-[10]" alt="Selected" />
            <span className="text-xs text-green-500">Selected</span>
          </div>
        </div>

        {/* PROCEED SECTION (Summary Card) */}
        {selectedSeats.length > 0 && (
          <div className="mt-8 max-w-md mx-auto bg-neutral-900 p-6 rounded-2xl border border-white/10 flex flex-col items-center shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between w-full mb-6 px-2 border-b border-white/5 pb-4">
              <div className="flex flex-col">
                <span className="text-gray-500 text-[10px] uppercase tracking-widest">Seats Selected</span>
                <span className="text-lg font-bold">{selectedSeats.length} Seats</span>
              </div>
              <div className="flex flex-col text-right">
                <span className="text-gray-400 text-[10px] uppercase tracking-widest">Total Payable</span>
                <span className="text-2xl font-black text-green-500">₹{totalPrice}</span>
              </div>
            </div>

            {/* --- RAZORPAY COMPONENT USED HERE --- */}
            <RazorpayPayment 
              amount={totalPrice} 
              selectedSeats={selectedSeats} 
            />
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

/* ================= HELPER COMPONENTS ================= */

function Section({ title, children }) {
  return (
    <div className="text-center">
      <h2 className="text-gray-500 text-[10px] uppercase tracking-[0.4em] mb-6 font-semibold">{title}</h2>
      {children}
    </div>
  );
}

function SeatGrid({ seats, sectionId, selectedSeats, onSeatClick }) {
  return (
    <div 
      className="grid justify-center gap-x-4 gap-y-3 mx-auto" 
      style={{ 
        gridTemplateColumns: "repeat(20, minmax(0, 30px))",
        maxWidth: "fit-content" 
      }}
    >
      {seats.map((_, index) => {
        const seatId = `${sectionId}-${index}`;
        const isSelected = selectedSeats.includes(seatId);

        return (
          <div key={seatId} className="flex justify-center">
            <img
              src="/images/seat.png"
              alt="seat"
              onClick={() => onSeatClick(seatId)}
              className={`w-6 sm:w-7 cursor-pointer transition-all duration-300 ${
                isSelected
                  ? "brightness-0 invert-[0.5] sepia-[1] hue-rotate-[70deg] saturate-[10] scale-125 drop-shadow-[0_0_8px_rgba(34,197,94,0.6)]" 
                  : "brightness-0 invert opacity-40 hover:opacity-100 hover:scale-110" 
              }`}
            />
          </div>
        );
      })}
    </div>
  );
}