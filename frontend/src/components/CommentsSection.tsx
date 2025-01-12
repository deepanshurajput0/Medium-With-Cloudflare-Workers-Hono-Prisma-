import React, { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../config";

interface Comment {
  id: string;
  comment: string;
  user: { name: string };
}

const CommentsSection: React.FC<{ postId: string; userId: number }> = ({ postId, userId }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch comments on component mount
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/v1/blog/comments/${postId}`,{
            headers: { 
                Authorization: localStorage.getItem('token')
             },
        });
        setComments(response.data);
      } catch (err) {
        console.error("Error fetching comments:", err);
      }
    };

    fetchComments();
  }, [postId]);

  // Handle comment submission
  const handleCommentSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newComment.trim()) {
      setError("Comment cannot be empty.");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const response = await axios.post(`${BASE_URL}/api/v1/blog/comment/${postId}`, { comment: newComment, userId:userId }, {
        headers: { 
            Authorization: localStorage.getItem('token')
         },
      });

      // Add the new comment to the existing list
      setComments((prev) => [...prev, response.data.myComment]);
      setNewComment(""); // Clear the input
    } catch (err) {
      console.error("Error posting comment:", err);
      setError("Could not post comment. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="comments-section">
      <h2 className="text-xl font-bold mb-4">Comments</h2>

      {/* Display comments */}
      <div className="comments-list mb-4">
        {comments?.length > 0 ? (
          comments?.map((comment) => (
            <div key={comment.id} className="comment p-2 border-b">
              <p className="text-sm text-gray-800">{comment?.comment}</p>
              <span className="text-xs text-gray-500">- {comment?.user?.name || "Anonymous"}</span>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No comments yet. Be the first to comment!</p>
        )}
      </div>

      {/* Error message */}
      {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

      {/* Comment form */}
      <form onSubmit={handleCommentSubmit} className="comment-form">
        <textarea
          className="w-full p-2 border rounded mb-2"
          placeholder="Write a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        ></textarea>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
          disabled={loading}
        >
          {loading ? "Posting..." : "Post Comment"}
        </button>
      </form>
    </div>
  );
};

export default CommentsSection;
