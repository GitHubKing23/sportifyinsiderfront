import { useState } from "react";

import CommentForm from "./components/CommentForm";
import CommentList from "./components/CommentList";

const CommentSection = ({ postId }: { postId: string }) => {
  const [refresh, setRefresh] = useState(false);

  const handleCommentAdded = () => {
    setRefresh(prev => !prev); // ✅ triggers re-fetch
  };

  return (
    <div className="space-y-4 mt-6">
      <CommentForm postId={postId} onCommentAdded={handleCommentAdded} />
      <CommentList postId={postId} refreshTrigger={refresh} />
    </div>
  );
};

export default CommentSection;

