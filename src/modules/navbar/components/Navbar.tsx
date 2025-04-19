// C:\Users\User\sportifyinsider-frontbeta\src\modules\navbar\components\Navbar.tsx
import { useState, useRef, useEffect, useContext } from "react";
import Link from "next/link";
import { FiMenu, FiX } from "react-icons/fi";

import { AuthContext } from "@/context/AuthContext";

export default function Navbar() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { user, accessToken, loginWithMetaMask, logout, loading, error } = useContext(AuthContext);

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

  const handleLogin = async () => {
    console.log("[Navbar] Triggering MetaMask login...");
    try {
      await loginWithMetaMask();
      console.log("[Navbar] Login successful");
    } catch (err) {
      console.error("[Navbar] Login failed:", err);
    }
  };

  return (
    <nav className="bg-gray-900 text-white p-4 fixed w-full top-0 left-0 z-50 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          SportifyInsider
        </Link>

        <div className="hidden md:flex space-x-6">
          <Link href="/" className="px-4 py-2 hover:bg-gray-800 rounded">Home</Link>
          <Link href="/tickets" className="px-4 py-2 hover:bg-gray-800 rounded">Tickets</Link>

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

          {accessToken ? (
            <div className="flex items-center space-x-4">
              <span className="text-sm">👋 {user?.username || "User"}</span>
              <button onClick={logout} className="px-3 py-1 bg-red-500 hover:bg-red-600 rounded text-sm">Logout</button>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <button
                onClick={handleLogin}
                disabled={loading}
                className={`px-4 py-2 rounded text-white transition ${
                  loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {loading ? "Connecting..." : "Login with MetaMask"}
              </button>
              {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
            </div>
          )}
        </div>

        <button className="md:hidden p-2 focus:outline-none" onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-gray-900 shadow-lg rounded-md absolute top-16 left-0 w-full">
          <Link href="/" className="block px-4 py-2 hover:bg-gray-800">Home</Link>
          <Link href="/tickets" className="block px-4 py-2 hover:bg-gray-800">Tickets</Link>

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

          <div className="px-4 py-2 text-center">
            {accessToken ? (
              <>
                <div className="mb-2 text-sm text-white">👋 {user?.username || "User"}</div>
                <button onClick={logout} className="w-full py-2 bg-red-500 hover:bg-red-600 rounded text-sm">
                  Logout
                </button>
              </>
            ) : (
              <div className="flex flex-col items-center">
                <button
                  onClick={handleLogin}
                  disabled={loading}
                  className={`w-full py-2 rounded text-sm ${
                    loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
                  }`}
                >
                  {loading ? "Connecting..." : "Login with MetaMask"}
                </button>
                {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}