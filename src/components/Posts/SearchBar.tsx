"use client";

import { useDispatch, useSelector } from "react-redux";
import { setSearchQuery } from "@/store/slices/postSlice";
import { RootState } from "@/store/store";

export default function SearchBar() {
  const dispatch = useDispatch();
  const searchQuery = useSelector(
    (state: RootState) => state.posts.searchQuery,
  );

  return (
    <input
      type="text"
      value={searchQuery}
      onChange={(e) => dispatch(setSearchQuery(e.target.value))}
      placeholder="Search posts by title..."
      className="w-full px-4 py-2 border rounded mb-4"
    />
  );
}
