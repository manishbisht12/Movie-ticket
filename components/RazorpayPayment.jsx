"use client";

const loadScript = (src) => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export default function RazorpayPayment({ amount, selectedSeats, onToggleLoading }) {
  
  const handlePayment = async () => {
    if (amount <= 0) {
      alert("Please select seats first");
      return;
    }

    const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

    if (!res) {
      alert("Razorpay SDK failed to load. Check your connection.");
      return;
    }

   const options = {
  key: "rzp_test_S2unR8OVHyrAkl", 
  amount: amount * 100,
  currency: "INR",
  name: "MovieTicket Pro",
  description: `Booking for ${selectedSeats.length} seats`,
  handler: function (response) {
    alert("Payment Successful! ID: " + response.razorpay_payment_id);
  },
  // --- UPI ko enable aur priority dene ke liye ye add karein ---
  config: {
    display: {
      blocks: {
        upi: {
          name: "Pay via UPI",
          instruments: [
            { method: "upi" }, // Isse GPay, PhonePe, Paytm sab dikhenge
          ],
        },
      },
      sequence: ["block.upi", "block.card"],
      preferences: {
        show_default_blocks: true,
      },
    },
  },
  prefill: {
    name: "Manish",
    email: "manibisht345@gmail.com",
    contact: "9557387436",
    method: "upi", // Isse popup khulte hi UPI wala section focus mein rahega
  },
  theme: {
    color: "#ef4444",
  },
};

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return (
    <button
      onClick={handlePayment}
      className="w-full py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg font-bold transition-all active:scale-95 text-sm"
    >
      PROCEED TO PAY ₹{amount}
    </button>
  );
}