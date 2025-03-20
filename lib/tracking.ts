import axios from "axios";

// ✅ Set API URL for tracking
const TRACKING_API_URL = process.env.NEXT_PUBLIC_TRACKING_API || "http://localhost:5001";

// ✅ Function to log page views
export const logPageView = async (url: string, referrer?: string) => {
  try {
    console.log(`📡 Logging page view: ${url} (Referrer: ${referrer || "N/A"})`);

    await axios.post(`${TRACKING_API_URL}/metrics/page-view`, {
      sessionId: getSessionId(),
      page: url,
      referrer: referrer || document.referrer,
    });

    console.log("✅ Page view logged successfully");
  } catch (error) {
    console.error("❌ Failed to log page view:", error.message);
  }
};

// ✅ Function to manage session ID
const getSessionId = (): string => {
  let sessionId = localStorage.getItem("sessionId");
  if (!sessionId) {
    sessionId = crypto.randomUUID(); // Generate a unique session ID
    localStorage.setItem("sessionId", sessionId);
  }
  return sessionId;
};
