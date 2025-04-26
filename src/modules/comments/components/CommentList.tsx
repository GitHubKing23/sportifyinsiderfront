import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import Image from "next/image";

import { fetchComments } from "@modules/comments/services/commentService";
import { fetchUserProfile } from "@/services/userService";

interface Comment {
  _id: string;
  content: string;
  createdAt?: string;
  userAddress?: string;
}

interface CommentListProps {
  postId: string;
  refreshTrigger?: boolean;
}

interface ProfileCache {
  [address: string]: {
    username: string;
    avatarUrl?: string;
  };
}

const CommentList = ({ postId, refreshTrigger }: CommentListProps) => {
  const {
    data,
    isLoading,
    error,
  }: UseQueryResult<{ comments: Comment[] }, Error> = useQuery({
    queryKey: ["comments", postId, refreshTrigger],
    queryFn: () => fetchComments(postId),
    retry: 2,
  });

  const comments = data?.comments || [];

  const [profileCache, setProfileCache] = useState<ProfileCache>({});

  useEffect(() => {
    const fetchProfiles = async () => {
      const uniqueAddresses = Array.from(
        new Set(comments.map((c) => c.userAddress).filter(Boolean))
      );

      const fetches = uniqueAddresses
        .filter((addr): addr is string => typeof addr === "string" && !profileCache[addr])
        .map(async (addr) => {
          try {
            const profile = await fetchUserProfile(addr);
            return { addr, profile };
          } catch {
            console.warn(`[CommentList] Could not fetch profile for ${addr}`);
            return null;
          }
        });

      const results = await Promise.all(fetches);

      const newProfiles: ProfileCache = {};
      results.forEach((res) => {
        if (res) {
          newProfiles[res.addr] = {
            username: res.profile.username,
            avatarUrl: res.profile.avatarUrl,
          };
        }
      });

      if (Object.keys(newProfiles).length > 0) {
        setProfileCache((prev) => ({ ...prev, ...newProfiles }));
      }
    };

    if (comments.length > 0) fetchProfiles();
  }, [comments, profileCache]);  // Ensuring dependencies are correct

  console.log(`[CommentList] Rendering postId: ${postId}, Comments:`, comments);

  if (isLoading) return <div>Loading comments...</div>;
  if (error) {
    console.error(`[CommentList] Query error for postId: ${postId}`, error);
    return <div className="text-red-500">Error loading comments.</div>;
  }

  return (
    <div className="space-y-3">
      {comments.length > 0 ? (
        comments.map((comment) => {
          const profile = comment.userAddress
            ? profileCache[comment.userAddress]
            : null;

          return (
            <div
              key={comment._id}
              data-testid={`comment-${comment._id}`}
              className={`border p-3 rounded transition-all ${
                comment._id.startsWith("temp-")
                  ? "opacity-60 italic text-gray-500 animate-pulse"
                  : "bg-white"
              }`}
            >
              <div className="flex items-center space-x-2 mb-1">
                <Image
                  src={profile?.avatarUrl || "/default-avatar.png"}
                  alt="avatar"
                  width={24}
                  height={24}
                  className="rounded-full"
                />
                <span className="text-sm font-semibold">
                  {profile?.username ||
                    (comment.userAddress
                      ? comment.userAddress.slice(0, 6) +
                        "..." +
                        comment.userAddress.slice(-4)
                      : "Anonymous")}
                </span>
              </div>

              <div>{comment.content}</div>

              {comment.createdAt && (
                <div className="text-xs text-gray-400 mt-1">
                  {new Date(comment.createdAt).toLocaleString()}
                </div>
              )}
            </div>
          );
        })
      ) : (
        <div className="text-sm text-gray-500">No comments yet for this post.</div>
      )}
    </div>
  );
};

export default CommentList;
