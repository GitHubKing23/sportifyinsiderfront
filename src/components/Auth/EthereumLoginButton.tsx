// C:\Users\User\sportifyinsider-frontbeta\src\components\Auth\EthereumLoginButton.tsx
'use client';

import React, { useContext } from 'react';

import { AuthContext } from '@/context/AuthContext';

const EthereumLoginButton = () => {
  const { loginWithMetaMask, loading, error } = useContext(AuthContext);

  const handleClick = async () => {
    console.log("🔘 Login button clicked");
    try {
      await loginWithMetaMask(); // ✅ Removed result since the function returns void
      console.log("✅ Login with MetaMask successful");
    } catch (err) {
      console.error("❌ Login with MetaMask failed:", err);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-2">
      <button
        onClick={handleClick}
        disabled={loading}
        className={`px-6 py-3 rounded-xl font-semibold shadow transition-all ${
          loading
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-indigo-600 hover:bg-indigo-700 text-white'
        }`}
      >
        {loading ? '🔄 Connecting to MetaMask...' : 'Login with MetaMask'}
      </button>

      {error && (
        <p className="text-red-500 text-sm font-medium mt-2">⚠️ {error}</p>
      )}
    </div>
  );
};

export default EthereumLoginButton;
