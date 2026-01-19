"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "@/store/slices/postSlice";
import { RootState, AppDispatch } from "@/store/store";
import PostItem from "./PostItem";
import SearchBar from "./SearchBar";
import { Post } from "@/types";
import Link from "next/link";

export default function PostList() {
  const dispatch = useDispatch<AppDispatch>();
  const { posts, loading, error, searchQuery } = useSelector(
    (state: RootState) => state.posts,
  );

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const filteredPosts = posts.filter((post: Post) =>
    searchQuery
      ? post.title.toLowerCase().includes(searchQuery.toLowerCase())
      : true,
  );

  if (loading) {
    return <div className="text-center py-8">Loading posts...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex gap-4 text-center items-center  mb-6">
        <h1 className="text-3xl font-bold">Posts</h1>
        <Link href={"/"} className="text-gray-500 hover:text-blue-400">
          go to Todo List
        </Link>
      </div>

      <SearchBar />

      {filteredPosts.length === 0 ? (
        <p className="text-gray-500 text-center py-8">No posts found</p>
      ) : (
        <div>
          {filteredPosts.map((post: Post) => (
            <PostItem key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
