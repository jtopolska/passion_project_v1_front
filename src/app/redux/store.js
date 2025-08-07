import { configureStore } from '@reduxjs/toolkit';
import metaReducer from './slices/slices';
// import logger from 'redux-logger';

export const store = configureStore({
  reducer: {
    meta: metaReducer
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