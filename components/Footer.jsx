"use client";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-32 py-8 text-center text-white/50 border-t border-white/10">
      © {year} Movie Ticket Booking. All rights reserved.
    </footer>
  );
}
