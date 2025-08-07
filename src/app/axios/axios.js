import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:7000/api/v1/',
});
// const instance = axios.create({
//   baseURL: 'https://ea-news-backend.onrender.com/api/v1',
// });

export default instance;