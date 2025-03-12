import { useState, useEffect, useRef } from 'react';

export default function Dropdown() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className='relative' ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className='hover:text-gray-400 focus:outline-none'
      >
        Sports
      </button>

      {open && (
        <div className='absolute right-0 mt-2 w-48 bg-gray-800 shadow-lg rounded-md'>
          <a href='/sports/nba' className='block px-4 py-2 text-white hover:bg-gray-700'>NBA</a>
          <a href='/sports/nfl' className='block px-4 py-2 text-white hover:bg-gray-700'>NFL</a>
          <a href='/sports/mlb' className='block px-4 py-2 text-white hover:bg-gray-700'>MLB</a>
          <a href='/sports/pga' className='block px-4 py-2 text-white hover:bg-gray-700'>PGA</a>
          <a href='/sports/uefa' className='block px-4 py-2 text-white hover:bg-gray-700'>UEFA</a>
          <a href='/sports/esports' className='block px-4 py-2 text-white hover:bg-gray-700'>Esports</a>
        </div>
      )}
    </div>
  );
}
