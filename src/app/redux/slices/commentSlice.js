import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios/axios';

// Получить комментарии по посту
export const fetchCommentsByPost = createAsyncThunk('comments/fetchByPost', async (postId) => {
  const { data } = await axios.get(`/post/${postId}/comments`);
  return data;
});

// Создать комментарий
export const createComment = createAsyncThunk('comments/create', async ({ postId, commentData }) => {
  const { data } = await axios.post(`/post/${postId}/comment`, commentData);
  return data;
});

// Удалить комментарий (пользователь)
export const deleteComment = createAsyncThunk('comments/delete', async ({ id, password }) => {
  await axios.delete(`/comment/${id}`, { data: { password } });
  return id;
});

// Обновить комментарий (пользователь)
export const updateComment = createAsyncThunk('comments/update', async ({ id, password, content }) => {
  const { data } = await axios.put(`/comment/${id}`, { password, content });
  return data;
});

const commentSlice = createSlice({
  name: 'comments',
  initialState: {
    items: [],
    loading: false,
    error: null
  },
  extraReducers: builder => {
    builder
      .addCase(fetchCommentsByPost.pending, state => {
        state.loading = true;
      })
      .addCase(fetchCommentsByPost.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(createComment.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.items = state.items.filter(c => c._id !== action.payload);
      })
      .addCase(updateComment.fulfilled, (state, action) => {
        const index = state.items.findIndex(c => c._id === action.payload._id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      });
  }
});

export default commentSlice.reducer;
