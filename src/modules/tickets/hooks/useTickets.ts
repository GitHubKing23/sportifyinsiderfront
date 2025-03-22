import { useState } from "react";
// import { fetchTickets } from "../services/ticketService"; // ❌ Temporarily disabled API call

export const useTickets = () => {
  const [events, setEvents] = useState<Record<string, any>[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // const fetchEvents = async (sport: string, city: string) => {
  //   setLoading(true);
  //   setError(null);

  //   try {
  //     const data = await fetchTickets(sport, city);
  //     setEvents(data);
  //   } catch (err) {
  //     console.error("❌ Error fetching tickets:", err);
  //     setError("Failed to fetch events.");
  //   }

  //   setLoading(false);
  // };

  const fetchEvents = async () => {
    setLoading(true);
    setTimeout(() => {
      setEvents([]); // No events available
      setError("🎟️ Ticket sales are coming soon! Stay tuned.");
      setLoading(false);
    }, 1000);
  };

  return { events, loading, error, fetchEvents };
};
