import { useEffect, useState } from "react";
// import { getTickets } from "../services/ticketService";  // ❌ Temporarily disabled

const EventList: React.FC = () => {
  // const [events, setEvents] = useState<Event[]>([]);
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState<string | null>(null);

  // useEffect(() => {
  //   if (sport && city) {
  //     fetchEvents(sport, city);
  //   }
  // }, [sport, city]);

  // // ✅ Fetch Events from API
  // const fetchEvents = async (sport: string, city: string) => {
  //   setLoading(true);
  //   setError(null);

  //   try {
  //     const data = await getTickets(sport, city);

  //     if (Array.isArray(data.tickets)) {
  //       setEvents(data.tickets);
  //     } else {
  //       throw new Error("Invalid data format from API");
  //     }
  //   } catch (err) {
  //     console.error("❌ Error fetching events:", err);
  //     setError("Failed to fetch events.");
  //   }

  //   setLoading(false);
  // };

  return (
    <div className="mt-6 text-center">
      <h2 className="text-2xl text-white font-bold">🎟️ Events Coming Soon!</h2>
      <p className="text-gray-400">
        We are working on bringing you the best sports ticket deals. Stay tuned!
      </p>
    </div>
  );
};

export default EventList;
