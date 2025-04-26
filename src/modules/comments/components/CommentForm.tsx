import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

import { postComment } from "@modules/comments/services/commentService";  // ✅ Corrected import
import { useAuth } from "@/context/AuthContext";

interface Props {
  postId: string;
  onCommentAdded: () => void;
}

interface Comment {
  _id: string;
  content: string;
  userAddress?: string;
  createdAt?: string;
}

const CommentForm = ({ postId, onCommentAdded }: Props) => {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { token, user, loginWithMetaMask } = useAuth();
  const queryClient = useQueryClient();
  const MAX_LENGTH = 200;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!content.trim()) {
      setError("Comment cannot be empty");
      return;
    }

    if (!token) {
      setError("Please log in with MetaMask to comment");
      return;
    }

    const optimisticComment: Comment = {
      _id: `temp-${Date.now()}`,
      content,
      userAddress: user?.ethereumAddress,
      createdAt: new Date().toISOString(),
    };

    console.log(`[CommentForm] Submitting comment for postId: ${postId}`);
    setLoading(true);

    try {
      queryClient.setQueryData<Comment[]>(["comments", postId], (old: Comment[] | undefined) => {
        const oldComments = Array.isArray(old) ? old : [];
        return [optimisticComment, ...oldComments];
      });

      // ✅ Correct function call
      await postComment(postId, content, token);

      queryClient.invalidateQueries({ queryKey: ["comments", postId] });

      setContent("");
      onCommentAdded();
      console.log("[CommentForm] Comment created successfully");
    } catch (err) {
      let errMsg = "Failed to post comment";
      if (err instanceof Error) {
        errMsg = err.message;
        console.error("[CommentForm] Error submitting comment:", err.message);
      } else {
        console.error("[CommentForm] Unknown error submitting comment:", err);
      }

      setError(errMsg);

      queryClient.setQueryData<Comment[]>(["comments", postId], (old: Comment[] | undefined) => {
        const oldComments = Array.isArray(old) ? old : [];
        return oldComments.filter((c: Comment) => c._id !== optimisticComment._id);
      });

      if (errMsg.toLowerCase().includes("unauthorized")) {
        try {
          await loginWithMetaMask();
        } catch (loginErr) {
          if (loginErr instanceof Error) {
            console.error("[CommentForm] Login refresh failed:", loginErr.message);
          } else {
            console.error("[CommentForm] Unknown login refresh error:", loginErr);
          }
        }
      }
    } finally {
      setLoading(false);
    }
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    if (newContent.length <= MAX_LENGTH) {
      setContent(newContent);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      {error && <div className="text-red-500 text-sm">{error}</div>}
      <textarea
        className="w-full border p-2 rounded"
        placeholder="Write your comment..."
        value={content}
        onChange={handleContentChange}
        disabled={loading}
        maxLength={MAX_LENGTH}
      />
      <div className="text-sm text-gray-500">
        {content.length}/{MAX_LENGTH} characters
      </div>
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
        disabled={loading || !content.trim()}
      >
        {loading ? "Posting..." : "Submit Comment"}
      </button>
    </form>
  );
};

export default CommentForm;
