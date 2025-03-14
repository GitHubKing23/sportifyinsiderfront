import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { FiMenu, FiX } from "react-icons/fi"; // ✅ Import hamburger menu icons

export default function Navbar() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // ✅ Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-gray-900 text-white p-4 fixed w-full top-0 left-0 z-50 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* 🔹 Logo */}
        <Link href="/" className="text-xl font-bold">
          SportifyInsider
        </Link>

        {/* 🔹 Desktop Menu (Hidden on Mobile) */}
        <div className="hidden md:flex space-x-6">
          <Link href="/" className="px-4 py-2 hover:bg-gray-800 rounded">Home</Link>
          <Link href="/tickets" className="px-4 py-2 hover:bg-gray-800 rounded">Tickets</Link>

          {/* 🔹 Sports Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button onClick={() => setDropdownOpen(!isDropdownOpen)} className="px-4 py-2 hover:bg-gray-800 rounded">
              Sports
            </button>

            {isDropdownOpen && (
              <div className="absolute top-full left-0 bg-gray-800 shadow-lg rounded-lg mt-1 w-48 z-50">
                <Link href="/sports/nba" className="block px-4 py-2 hover:bg-gray-700">NBA</Link>
                <Link href="/sports/nfl" className="block px-4 py-2 hover:bg-gray-700">NFL</Link>
                <Link href="/sports/mlb" className="block px-4 py-2 hover:bg-gray-700">MLB</Link>
                <Link href="/sports/pga" className="block px-4 py-2 hover:bg-gray-700">PGA</Link>
                <Link href="/sports/uefa" className="block px-4 py-2 hover:bg-gray-700">UEFA</Link>
                <Link href="/sports/esports" className="block px-4 py-2 hover:bg-gray-700">Esports</Link>
              </div>
            )}
          </div>
        </div>

        {/* 🔹 Mobile Menu Button */}
        <button className="md:hidden p-2 focus:outline-none" onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
        </button>
      </div>

      {/* 🔹 Mobile Menu (Hidden on Desktop) */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-gray-900 shadow-lg rounded-md absolute top-16 left-0 w-full">
          <Link href="/" className="block px-4 py-2 hover:bg-gray-800">Home</Link>
          <Link href="/tickets" className="block px-4 py-2 hover:bg-gray-800">Tickets</Link>

          {/* Mobile Sports Dropdown */}
          <div className="relative px-4">
            <button onClick={() => setDropdownOpen(!isDropdownOpen)} className="w-full text-left py-2 hover:bg-gray-800 rounded">
              Sports
            </button>

            {isDropdownOpen && (
              <div className="bg-gray-800 shadow-lg rounded-lg mt-1">
                <Link href="/sports/nba" className="block px-4 py-2 hover:bg-gray-700">NBA</Link>
                <Link href="/sports/nfl" className="block px-4 py-2 hover:bg-gray-700">NFL</Link>
                <Link href="/sports/mlb" className="block px-4 py-2 hover:bg-gray-700">MLB</Link>
                <Link href="/sports/pga" className="block px-4 py-2 hover:bg-gray-700">PGA</Link>
                <Link href="/sports/uefa" className="block px-4 py-2 hover:bg-gray-700">UEFA</Link>
                <Link href="/sports/esports" className="block px-4 py-2 hover:bg-gray-700">Esports</Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
