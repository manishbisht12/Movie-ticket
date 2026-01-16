"use client";
import React from "react";
import axios from "axios";

const RazorpayPayment = ({ amount, selectedSeats, movieInfo }) => {
  const handlePayment = async () => {
    try {
      // Step 1: Backend se Order ID mangwayein
      const { data: orderData } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/payment/checkout`, {
        amount,
      });

      const options = {
        key: "rzp_test_S2ynz8v3J36ueP", // Aapki Test Key ID
        amount: orderData.order.amount,
        currency: "INR",
        name: "Movie Magic",
        description: `Booking for ${movieInfo.movie}`,
        order_id: orderData.order.id,
        handler: async function (response) {
          // Step 2: Payment success hone par Backend mein booking save karein
          try {
            const { data: bookingData } = await axios.post("http://localhost:5000/api/bookings/new", {
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
              movie: movieInfo.movie,
              seats: selectedSeats,
              showTime: movieInfo.showTime,
              totalPrice: amount
            }, { withCredentials: true });

            if (bookingData.success) {
              alert("Payment Successful! Your seats are booked.");
              window.location.href = "/profile"; // Redirect to tickets page
            }
          } catch (err) {
            alert("Payment success but booking failed. Please contact support.");
          }
        },
        theme: { color: "#dc2626" }, // Red theme to match your UI
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Payment Error:", error);
      alert("Something went wrong with Razorpay.");
    }
  };

  return (
    <button
      onClick={handlePayment}
      className="w-full py-4 bg-red-600 hover:bg-red-700 text-white font-black rounded-xl shadow-lg transition-all active:scale-95 uppercase tracking-widest"
    >
      Pay ₹{amount} & Book Now
    </button>
  );
};

export default RazorpayPayment;