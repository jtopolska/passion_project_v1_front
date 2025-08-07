import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios/axios';

export const fetchMeta = createAsyncThunk('/fetchMeta', async () => {
  const [categories, tags, authors] = await Promise.all([
    axios.get('/categories'),
    axios.get('/tags'),
    axios.get('/authors')
  ]);
  return {
    categories: categories.data,
    tags: tags.data,
    authors: authors.data
  };
});

export const addPost = createAsyncThunk('/addPost', async (postData) => {
  const { data } = await axios.post('/admin/post', postData);
  return data;
});

export const fetchPosts = createAsyncThunk('posts/fetchAll', async () => {
  const { data } = await axios.get('/posts');
  return data;
});

const metaSlice = createSlice({
  name: 'meta',
  initialState: {
    categories: [],
    tags: [],
    authors: [],
    posts: []
  },
  extraReducers: builder => {
    builder
      .addCase(fetchMeta.fulfilled, (state, action) => {
        state.categories = action.payload.categories;
        state.tags = action.payload.tags;
        state.authors = action.payload.authors;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.posts = action.payload;
      });
  }
});

export default metaSlice.reducer;





// import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import axios from '../../axios/axios';

// export const addPost = createAsyncThunk('/admin/post', async (content) => {
//     console.log('content redux addpost', content)
//     try {
//         const { data } = await axios.post(`/admin/post`, content);
//         return data;
//     } catch (err) {
//         console.log('addReview error redux', err);
//     }
// });

// export const getAllPosts = createAsyncThunk('/getAllPosts', async () => {
//     try {
//         const { data } = await axios.get(`/posts`);
//         console.log('data getAllPosts redux', data)
//         return data;
//     } catch (err) {
//         console.log('getAllReviews error redux', err)
//     }
// });



// export const postsSlice = createSlice({
//     name: 'posts',
//     initialState: {
//         postsArray: [],
//         loading: false
//     },
//     extraReducers: (builder) => {
//         builder
//             .addCase(addPost.pending, (state) => {
//                 state.loading = true;
//             })
//             .addCase(addPost.fulfilled, (state, action) => {
//                 state.loading = false;
//                 console.log('state', state)
//                 console.log('state.postsArray1', state.postsArray)
//                 state.postsArray = action.payload;
//                 console.log('state.postsArray2', state.postsArray)
//                 // state.postsArray = action.payload?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
//             })
//             .addCase(addPost.rejected, (state) => {
//                 state.loading = false;
//             }).addCase(getAllPosts.pending, ( state ) => {
//                 state.loading = true;
//             })
//             .addCase(getAllPosts.fulfilled, ( state, action ) => {
//                 state.loading = false;
//                 state.postsArray = action.payload;
//                 // state.reviewsArray = action.payload?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
//             })
//             .addCase(getAllPosts.rejected, ( state ) => {
//                 state.loading = false;
//             });
//     } 
// })

// // export const getReviewsArray = state => state.reviews.reviewsArray;
// export const getPostsArray = state => state.posts.postsArray;
// export default postsSlice.reducer
