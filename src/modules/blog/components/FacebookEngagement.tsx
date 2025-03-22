import React, { useEffect } from "react";

// ✅ Better type instead of `any`
declare global {
  interface Window {
    FB: {
      XFBML: {
        parse: () => void;
      };
    };
  }
}

const FacebookEngagement = () => {
  useEffect(() => {
    if (window.FB) {
      window.FB.XFBML.parse();
    } else {
      const script = document.createElement("script");
      script.src = "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v18.0";
      script.async = true;
      script.crossOrigin = "anonymous";
      script.onload = () => window.FB?.XFBML.parse();
      document.body.appendChild(script);
    }
  }, []);

  return (
    <div className="mt-8">
      <div
        className="fb-share-button"
        data-href={typeof window !== "undefined" ? window.location.href : ""}
        data-layout="button_count"
        data-size="large"
      ></div>

      <div
        className="fb-comments mt-6"
        data-href={typeof window !== "undefined" ? window.location.href : ""}
        data-width="100%"
        data-numposts="5"
      ></div>
    </div>
  );
};

export default FacebookEngagement;
