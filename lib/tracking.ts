import axios from "axios";

// ✅ Set API URL for tracking (Uses production URL if available)
const TRACKING_API_URL =
  process.env.NEXT_PUBLIC_TRACKING_API || "http://15.235.185.142:5001/metrics";

// ✅ Function to log page views
export const logPageView = async (url: string, referrer?: string) => {
  try {
    console.log(`📡 Logging page view: ${url} (Referrer: ${referrer || "N/A"})`);

    await axios.post(`${TRACKING_API_URL}/page-view`, {
      sessionId: getSessionId(),
      page: url,
      referrer: referrer || document.referrer,
    });

    console.log("✅ Page view logged successfully");
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("❌ Failed to log page view:", error.message);
    } else {
      console.error("❌ Unknown error logging page view:", error);
    }
  }
};

// ✅ Function to manage session ID
const getSessionId = (): string => {
  let sessionId = localStorage.getItem("sessionId");
  if (!sessionId) {
    sessionId = generateSessionId(); // Generate a unique session ID
    localStorage.setItem("sessionId", sessionId);
  }
  return sessionId;
};

// ✅ Generate Session ID Function (More Readable)
const generateSessionId = (): string => {
  return `session-${Math.random().toString(36).substring(2, 15)}`;
};
