"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import axios from "axios";

export default function SeatsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const movie = searchParams.get("movie");
  const theater = searchParams.get("theater");
  const time = searchParams.get("time");
  const date = searchParams.get("date");
  const showTimeKey = `${date} | ${time} | ${theater}`;

  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]);
  const [loading, setLoading] = useState(false);

  // 1. Fetch Booked Seats from DB
  useEffect(() => {
    const fetchBooked = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/api/bookings/booked-seats`, {
          params: { movie, showTime: showTimeKey }
        });
        if (data.success) setBookedSeats(data.bookedSeats);
      } catch (err) {
        console.error("Fetch Error:", err);
      }
    };
    if (movie) fetchBooked();
  }, [movie, showTimeKey]);

  // Pricing & Calculations
  const pricing = { silver: 150, gold: 250, platinum: 350 };
  const totalPrice = selectedSeats.reduce((acc, seatId) => acc + pricing[seatId.split("-")[0]], 0);

  // 2. Handle Payment & Booking
  const handlePayment = async () => {
    try {
      setLoading(true);
      // Step A: Create Order on Backend
      const { data: orderData } = await axios.post("http://localhost:5000/api/payment/checkout", {
        amount: totalPrice
      });

      const options = {
        key: "rzp_test_S2ynz8v3J36ueP", // Your Test Key ID
        amount: orderData.order.amount,
        currency: "INR",
        name: "Movie Magic",
        description: `Booking for ${movie}`,
        order_id: orderData.order.id,
        handler: async function (response) {
          // Step B: Save Booking to DB on Success
          try {
            const res = await axios.post("http://localhost:5000/api/bookings/new", {
              movie: movie,
              seats: selectedSeats,
              showTime: showTimeKey,
              totalPrice,
              paymentId: response.razorpay_payment_id
            }, { withCredentials: true });

            if (res.data.success) {
              alert("Seats Booked Successfully!");
              setBookedSeats([...bookedSeats, ...selectedSeats]);
              setSelectedSeats([]);
              router.refresh();
            }
          } catch (err) {
            alert("Payment done but DB update failed. Contact Admin.");
          }
        },
        theme: { color: "#dc2626" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Order Failed:", error.response?.data);
      alert("Razorpay Order Failed. Check backend terminal for errors.");
    } finally {
      setLoading(false);
    }
  };

  const handleSeatClick = (seatId) => {
    if (bookedSeats.includes(seatId)) return; // Prevent click on Red seats
    setSelectedSeats((prev) =>
      prev.includes(seatId) ? prev.filter((id) => id !== seatId) : [...prev, seatId]
    );
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Navbar />
      <div className="flex-grow px-5 md:px-10 pt-32 pb-4">
        <h1 className="text-3xl font-bold mb-2 text-center uppercase tracking-widest">{movie}</h1>
        <p className="text-center text-gray-500 mb-10 text-xs tracking-widest">{showTimeKey}</p>

        {/* SCREEN SECTION */}
        <div className="mb-16 flex flex-col items-center">
          <div className="w-full max-w-2xl h-1 bg-white/40 shadow-[0_0_20px_rgba(255,255,255,0.3)] rounded-full"></div>
          <p className="text-[10px] text-gray-500 mt-2 tracking-widest uppercase text-center">Screen</p>
        </div>

        {/* SEAT SECTIONS */}
        <div className="flex flex-col gap-10">
          <Section title={`Silver - ₹${pricing.silver}`}>
            <SeatGrid seats={60} sectionId="silver" selected={selectedSeats} booked={bookedSeats} onClick={handleSeatClick} />
          </Section>
          <Section title={`Gold - ₹${pricing.gold}`}>
            <SeatGrid seats={80} sectionId="gold" selected={selectedSeats} booked={bookedSeats} onClick={handleSeatClick} />
          </Section>
          <Section title={`Platinum - ₹${pricing.platinum}`}>
            <SeatGrid seats={20} sectionId="platinum" selected={selectedSeats} booked={bookedSeats} onClick={handleSeatClick} />
          </Section>
        </div>

        {/* LEGEND */}
        <div className="flex justify-center gap-10 mt-12 border-t border-white/10 pt-6">
          <LegendItem src="/images/seat.png" label="Available" style="brightness-0 invert opacity-40" />
          <LegendItem src="/images/seat.png" label="Booked" style="brightness-0 sepia(1) saturate-[100] hue-rotate-[320deg]" textStyle="text-red-500" />
          <LegendItem src="/images/seat.png" label="Selected" style="brightness-0 invert-[0.5] sepia-[1] hue-rotate-[70deg] saturate-[10]" textStyle="text-green-500" />
        </div>

        {/* PROCEED PANEL */}
        {selectedSeats.length > 0 && (
          <div className="mt-8 max-w-md mx-auto bg-neutral-900 p-6 rounded-2xl border border-white/10 shadow-2xl flex flex-col items-center">
            <div className="flex justify-between w-full mb-6 border-b border-white/5 pb-4">
              <div className="flex flex-col">
                <span className="text-gray-500 text-[10px] uppercase tracking-widest">Selected</span>
                <span className="text-lg font-bold">{selectedSeats.length} Seats</span>
              </div>
              <div className="flex flex-col text-right">
                <span className="text-gray-400 text-[10px] uppercase tracking-widest">Total</span>
                <span className="text-2xl font-black text-green-500">₹{totalPrice}</span>
              </div>
            </div>
            <button 
              onClick={handlePayment} 
              disabled={loading}
              className="w-full py-4 bg-red-600 hover:bg-red-700 text-white font-black rounded-xl uppercase tracking-widest transition-all active:scale-95 disabled:opacity-50"
            >
              {loading ? "Please Wait..." : `Pay ₹${totalPrice} & Book`}
            </button>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

/* --- HELPER COMPONENTS --- */

function Section({ title, children }) {
  return (
    <div className="text-center">
      <h2 className="text-gray-500 text-[10px] uppercase tracking-[0.4em] mb-6 font-semibold">{title}</h2>
      {children}
    </div>
  );
}

function LegendItem({ src, label, style, textStyle = "text-gray-400" }) {
  return (
    <div className="flex items-center gap-2">
      <img src={src} className={`w-5 ${style}`} alt={label} />
      <span className={`text-xs ${textStyle}`}>{label}</span>
    </div>
  );
}

function SeatGrid({ seats, sectionId, selected, booked, onClick }) {
  return (
    <div className="grid justify-center gap-x-4 gap-y-3 mx-auto" style={{ gridTemplateColumns: "repeat(20, minmax(0, 30px))", maxWidth: "fit-content" }}>
      {Array.from({ length: seats }).map((_, index) => {
        const id = `${sectionId}-${index}`;
        const isSelected = selected.includes(id);
        const isBooked = booked.includes(id);

        return (
          <div key={id} className="flex justify-center">
           <img
  src="/images/seat.png"
  alt="seat"
  onClick={() => !isBooked && onClick(id)}
  className={`w-6 sm:w-7 transition-all duration-300 ${
    isBooked ? "cursor-not-allowed opacity-100" : "cursor-pointer hover:scale-110"
  }`}
  style={{
    filter: isBooked 
      ? "brightness(0) saturate(100%) invert(20%) sepia(90%) saturate(5000%) hue-rotate(0deg) brightness(100%) contrast(100%)" 
      : isSelected
      ? "invert(55%) sepia(93%) saturate(415%) hue-rotate(78deg) brightness(98%) contrast(91%)" // Green
      : "brightness(0) invert(1) opacity(0.4)", // Available (Grey/White)
  }}
/>
          </div>
        );
      })}
    </div>
  );
}