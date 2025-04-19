import React from "react";

import { useAuth } from "@/context/AuthContext";
import EthereumLoginButton from "@/components/Auth/EthereumLoginButton";

const LoginPage = () => {
  const { address, accessToken } = useAuth();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-semibold text-center mb-6">Login with MetaMask</h1>

        <EthereumLoginButton />

        {address && (
          <p className="mt-4 text-green-600 text-sm text-center">
            ✅ Connected as: <span className="font-mono">{address}</span>
          </p>
        )}

        {accessToken && (
          <p className="text-xs text-center text-gray-500 mt-2">
            Token: {accessToken.slice(0, 20)}...
          </p>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
