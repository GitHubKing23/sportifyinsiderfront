import React from "react";
import Navbar from "../src/modules/navbar/components/Navbar"; // ✅ Corrected path
// import { fetchTicketsFromAPI } from "../src/modules/tickets/services/ticketService"; // ❌ Commented out

export default function Tickets() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      <div className="flex flex-col items-center justify-center text-center py-16 bg-gray-800">
        <h1 className="text-5xl font-bold">🎟️ Tickets Coming Soon!</h1>
        <p className="text-gray-400 mt-2">
          We are working on bringing you the best sports ticket deals. Stay tuned!
        </p>
      </div>
    </div>
  );
}
