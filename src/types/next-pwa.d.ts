// C:\Users\User\sportifyinsider-frontbeta\src\types\next-pwa.d.ts
declare module "next-pwa" {
    import { NextConfig } from "next";
  
    interface RuntimeCaching {
      urlPattern: string | RegExp;
      handler: string;
      options?: {
        cacheName?: string;
        expiration?: {
          maxEntries?: number;
          maxAgeSeconds?: number;
        };
        cacheableResponse?: {
          statuses?: number[];
        };
      };
    }
  
    interface PWAOptions {
      dest: string;
      disable?: boolean;
      register?: boolean;
      scope?: string;
      sw?: string;
      runtimeCaching?: RuntimeCaching[];
      buildExcludes?: string[];
      fallbacks?: { [key: string]: string };
      publicExcludes?: string[];
      additionalManifestEntries?: string[];
      mode?: "production" | "development";
      cacheStartUrl?: boolean;
      reloadOnOnline?: boolean;
      dynamicStartUrl?: boolean;
      skipWaiting?: boolean;
      clientsClaim?: boolean;
    }
  
    function withPWA(config: PWAOptions): (nextConfig: NextConfig) => NextConfig;
  
    export = withPWA;
  }
  