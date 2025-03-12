import { useState } from "react";
import SportSelector from "../components/SportSelector";
import CitySelector from "../components/CitySelector";
import EventList from "../components/EventList";

const Tickets: React.FC = () => {
  const [sport, setSport] = useState("");
  const [city, setCity] = useState("");

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-4xl font-bold text-center mb-6">Find Your Sports Event</h1>

      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        <SportSelector onSelect={setSport} />
        <CitySelector onSelect={setCity} />
      </div>

      {sport && city && <EventList sport={sport} city={city} />}
    </div>
  );
};

// ? Ensure this component is properly exported
export default Tickets;
