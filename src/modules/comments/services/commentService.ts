import axios from "axios";

// ✅ Ensure API_URL is always a string
const API_URL: string = process.env.NEXT_PUBLIC_COMMENT_API || "http://localhost:5004/api/comments";

// ✅ Fetch comments for a blog post
export const fetchComments = async (postId: string, page = 1) => {
  console.log("🔗 Fetching comments from:", API_URL, "Post ID:", postId, "Page:", page);
  const res = await axios.get(API_URL, {
    params: { postId, page }
  });
  return res.data;
};

// ✅ Post a new comment
export const postComment = async (postId: string, content: string, token: string) => {
  const res = await axios.post(
    API_URL,
    { postId, content },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
  return res.data;
};

// ✅ Delete a comment
export const deleteComment = async (id: string, token: string) => {
  const res = await axios.delete(`${API_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
