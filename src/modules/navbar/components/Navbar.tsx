import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  return (
    <nav className="bg-gray-900 text-white p-4 fixed w-full top-0 left-0 z-50 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold">
          SportifyInsider
        </Link>

        {/* Navigation Links */}
        <div className="flex space-x-6">
          <Link href="/" className="px-4 py-2 hover:bg-gray-800 rounded">
            Home
          </Link>
          <Link href="/tickets" className="px-4 py-2 hover:bg-gray-800 rounded">
            Tickets
          </Link>

          {/* Sports Tab with Dropdown */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!isDropdownOpen)}
              className="px-4 py-2 hover:bg-gray-800 rounded"
            >
              Sports
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute top-full left-0 bg-gray-800 shadow-lg rounded-lg mt-1 w-48 z-50">
                <Link href="/sports/nba" className="block px-4 py-2 hover:bg-gray-700">
                  NBA
                </Link>
                <Link href="/sports/nfl" className="block px-4 py-2 hover:bg-gray-700">
                  NFL
                </Link>
                <Link href="/sports/mlb" className="block px-4 py-2 hover:bg-gray-700">
                  MLB
                </Link>
                <Link href="/sports/pga" className="block px-4 py-2 hover:bg-gray-700">
                  PGA
                </Link>
                <Link href="/sports/uefa" className="block px-4 py-2 hover:bg-gray-700">
                  UEFA
                </Link>
                <Link href="/sports/esports" className="block px-4 py-2 hover:bg-gray-700">
                  Esports
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
