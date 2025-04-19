const BASE_URL = process.env.NEXT_PUBLIC_COMMENT_API || "https://api.sportifyinsider.com/api";

// ✅ Fetch Comments
export async function fetchComments(postId: string) {
  console.log(`[fetchComments] postId: ${postId}, BASE_URL: ${BASE_URL}`);
  const url = `${BASE_URL}/comments/${postId}`;
  console.log(`[fetchComments] Attempting fetch to: ${url}`);

  try {
    const response = await fetch(url, {
      method: "GET",
      credentials: process.env.NEXT_PUBLIC_WITH_CREDENTIALS === "true" ? "include" : "omit",
      headers: { "Content-Type": "application/json" },
    });

    console.log(`[fetchComments] Response status: ${response.status}, CORS header: ${response.headers.get("access-control-allow-origin")}`);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error(`[fetchComments] Error: ${response.status} ${JSON.stringify(errorData)}`);
      throw new Error(`Failed to fetch comments: ${errorData.message || response.status}`);
    }

    const data = await response.json();
    console.log("[fetchComments] Data:", data);
    return data.comments || [];
  } catch (error) {
    if (error instanceof Error) {
      console.error(`[fetchComments] Failed: ${error.name} - ${error.message}`, error);
    } else {
      console.error("[fetchComments] Unknown error occurred", error);
    }

    console.warn("[fetchComments] Returning mock data due to error");
    return [
      {
        _id: "mock1",
        content: "Mock comment for testing",
        createdAt: new Date().toISOString(),
      },
    ];
  }
}

// ✅ Create Comment
export async function createComment(
  token: string,
  comment: { postId: string; content: string }
) {
  const url = `${BASE_URL}/comments`;
  console.log(`[createComment] postId: ${comment.postId}, BASE_URL: ${BASE_URL}`);

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: JSON.stringify(comment),
    });

    console.log(`[createComment] Response status: ${response.status}`);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error(`[createComment] Error: ${response.status} ${JSON.stringify(errorData)}`);
      throw new Error(`Failed to create comment: ${errorData.message || response.status}`);
    }

    const result = await response.json();
    console.log("[createComment] Result:", result);
    return result;
  } catch (error) {
    if (error instanceof Error) {
      console.error(`[createComment] Failed: ${error.name} - ${error.message}`, error);
    } else {
      console.error("[createComment] Unknown error occurred", error);
    }
    throw error;
  }
}
