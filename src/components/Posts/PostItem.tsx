"use client"
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchComments } from "@/store/slices/postSlice";
import { Comment, Post } from "@/types";
import { RootState, AppDispatch } from "@/store/store";

interface PostItemProps {
  post: Post;
}

export default function PostItem({ post }: PostItemProps) {
  const [showComments, setShowComments] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const comments = useSelector(
    (state: RootState) => state.posts.comments[post.id],
  );

  const handleToggleComments = () => {
    if (!showComments && !comments) {
      dispatch(fetchComments(post.id));
    }
    setShowComments(!showComments);
  };

  return (
    <div className="border rounded p-4 mb-4">
      <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
      <p className="text-gray-700 mb-3">{post.body}</p>

      <button
        onClick={handleToggleComments}
        className="text-blue-500 hover:underline"
      >
        {showComments ? "Hide" : "Show"} Comments
      </button>

      {showComments && comments && (
        <div className="mt-4 pl-4 border-l-2">
          <h4 className="font-semibold mb-2">Comments:</h4>
          {comments.map((comment: Comment) => (
            <div key={comment.id} className="mb-3 p-2 bg-gray-50 rounded">
              <p className="font-medium text-sm">{comment.name}</p>
              <p className="text-xs text-gray-500">{comment.email}</p>
              <p className="text-sm mt-1">{comment.body}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
