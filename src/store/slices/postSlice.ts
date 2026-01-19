import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Post, Comment } from '@/types';
import axios from 'axios';

interface PostState {
  posts: Post[];
  comments: { [postId: number]: Comment[] };
  loading: boolean;
  error: string | null;
  searchQuery: string;
}

const initialState: PostState = {
  posts: [],
  comments: {},
  loading: false,
  error: null,
  searchQuery: '',
};

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
  return response.data;
});

export const fetchComments = createAsyncThunk(
  'posts/fetchComments',
  async (postId: number) => {
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
    );
    return { postId, comments: response.data };
  }
);

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch posts';
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.comments[action.payload.postId] = action.payload.comments;
      });
  },
});

export const { setSearchQuery } = postSlice.actions;
export default postSlice.reducer;