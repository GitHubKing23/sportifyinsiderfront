// C:\Users\User\sportifyinsider-frontbeta\src\types\global.d.ts

export {}; // Prevents this file from becoming a global script module

interface EthereumProvider {
  isMetaMask?: boolean;
  request: (args: { method: string; params?: unknown[] }) => Promise<unknown>;
  on?: (event: string, handler: (...params: unknown[]) => void) => void;
  removeListener?: (event: string, handler: (...params: unknown[]) => void) => void;
}

declare global {
  interface Window {
    ethereum?: EthereumProvider;
  }
}
