import { configureStore } from '@reduxjs/toolkit';
import metaReducer from './slices/postSlice';
import commentReducer from './slices/commentSlice';
import authReducer from './slices/authSlice';
// import logger from 'redux-logger';

export const store = configureStore({
  reducer: {
    post: metaReducer,
    comments: commentReducer,
    auth: authReducer
  }
  // ,
  // middleware: getDefaultMiddleware => getDefaultMiddleware().concat(logger)
});






// import { configureStore } from '@reduxjs/toolkit';
// import { postsSlice } from './slices/slices';

// export const store = configureStore({
//   reducer: {
//     posts: postsSlice.reducer,
//   },
// });