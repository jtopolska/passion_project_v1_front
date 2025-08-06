import { configureStore } from '@reduxjs/toolkit';

// import newsSlice from './slices/newsSlice.js';

export const store = configureStore({
  reducer: {
    // news: newsSlice,
  },
});