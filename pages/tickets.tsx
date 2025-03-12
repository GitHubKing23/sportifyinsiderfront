import Navbar from "../src/modules/navbar/components/Navbar"; // Ensure correct path

export default function Tickets() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* ✅ Navbar */}
      <Navbar />

      {/* ✅ Hero Section */}
      <div className="flex flex-col items-center justify-center text-center py-16 bg-gray-800">
        <h1 className="text-5xl font-bold">Find Your Sports Event</h1>
        <p className="text-gray-400 mt-2">Select a sport and city to find tickets.</p>
      </div>

      {/* ✅ Search Section */}
      <div className="max-w-4xl mx-auto mt-10 p-6 bg-gray-800 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center">Search for Tickets</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <select className="p-3 bg-gray-700 text-white rounded-md">
            <option value="">Select Sport</option>
            <option value="NBA">NBA</option>
            <option value="NFL">NFL</option>
            <option value="MLB">MLB</option>
            <option value="PGA">PGA</option>
            <option value="UEFA">UEFA</option>
            <option value="Esports">Esports</option>
          </select>

          <input
            type="text"
            placeholder="Enter City"
            className="p-3 bg-gray-700 text-white rounded-md"
          />
        </div>

        <button className="mt-6 w-full bg-blue-600 hover:bg-blue-700 p-3 rounded-md text-white font-semibold">
          Search Tickets
        </button>
      </div>
    </div>
  );
}
