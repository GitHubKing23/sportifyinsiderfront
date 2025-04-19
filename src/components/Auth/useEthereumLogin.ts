// src/components/Auth/useEthereumLogin.ts

import { useState } from 'react';
import { ethers } from 'ethers';
import { authApi as axios } from '@/utils/api';

interface MetaMaskError {
  code?: number;
}

interface AxiosErrorShape {
  response?: {
    data?: {
      error?: string;
    };
  };
  message?: string;
  config?: {
    baseURL?: string;
    url?: string;
    method?: string;
  };
  status?: number;
}

export const useEthereumLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loginWithEthereum = async (): Promise<{ address: string; token: string }> => {
    console.log("🔐 Starting Ethereum login...");
    setLoading(true);
    setError(null);

    try {
      if (!window.ethereum) {
        throw new Error('MetaMask is not installed.');
      }

      const provider = new ethers.BrowserProvider(window.ethereum);

      try {
        await provider.send('eth_requestAccounts', []);
      } catch (metaErr: unknown) {
        const mmErr = metaErr as MetaMaskError;
        if (mmErr.code === -32002) {
          throw new Error("MetaMask is already processing a request.");
        }
        throw new Error("MetaMask request was rejected or closed.");
      }

      const signer = await provider.getSigner();
      const address = await signer.getAddress();

      if (!address) {
        throw new Error("No Ethereum address found.");
      }

      console.log("✅ Wallet address:", address);
      const nonceRes = await axios.post('/api/auth/nonce', { ethereumAddress: address });

      if (!nonceRes.data?.nonce) {
        throw new Error("No nonce received from server");
      }

      const nonce = nonceRes.data.nonce;
      const message = `Sign this message to authenticate. Nonce: ${nonce}`;
      const signature = await signer.signMessage(message);

      const verifyRes = await axios.post('/api/auth/verify', {
        ethereumAddress: address,
        signature,
      });

      const { token } = verifyRes.data;
      if (!token) {
        throw new Error("Token missing in server response.");
      }

      localStorage.setItem('access_token', token);
      localStorage.setItem('ethereum_address', address);

      console.log("✅ Login complete, token:", token.slice(0, 10) + "...");
      return { address, token };
    } catch (err: unknown) {
      const axiosErr = err as AxiosErrorShape;
      console.error("[useEthereumLogin] Ethereum login failed:", {
        message: axiosErr?.message,
        response: axiosErr?.response?.data,
        status: axiosErr?.status,
        fullUrl: `${axiosErr?.config?.baseURL ?? ''}${axiosErr?.config?.url ?? ''}`,
        method: axiosErr?.config?.method,
      });
      setError(axiosErr?.response?.data?.error || axiosErr?.message || 'Ethereum login failed.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { loginWithEthereum, loading, error };
};
