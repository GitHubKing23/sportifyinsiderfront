import { useState, useEffect, useRef } from "react";
import Link from "next/link";

export default function Dropdown() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // ✅ Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // ✅ Backend-aligned categories
  const categories = [
    "NBA", "NHL", "NFL", "MLB", "Esports",
    "FIFA", "Wrestling", "WNBA", "PGA", "Other"
  ];

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className="px-4 py-2 hover:bg-gray-800 rounded focus:outline-none"
        aria-label="Toggle Sports Dropdown"
      >
        Sports
      </button>

      {open && (
        <div
          className="absolute left-0 mt-2 w-48 bg-gray-800 shadow-lg rounded-md z-50"
          role="menu"
        >
          {categories.map((category) => (
            <Link
              key={category}
              href={`/sports/${category.toLowerCase()}`}
              className="block px-4 py-2 text-white hover:bg-gray-700"
              role="menuitem"
            >
              {category}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
