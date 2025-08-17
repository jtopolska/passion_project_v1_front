import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchPostById } from '../../app/redux/slices/postSlice';
import { Comments } from '../../features/comments/Comment';

export const PostPage = () => {
  const { id } = useParams(); // Получаем ID из URL
  const dispatch = useDispatch();

  const post = useSelector(state => state.meta.selectedPost);
  const loading = useSelector(state => state.meta.loading);

  useEffect(() => {
    dispatch(fetchPostById(id));
  }, [dispatch, id]);

  if (!post || loading) {
    return <div>Загрузка поста...</div>;
  }

  return (
    <div>
      <h1>{post.title}</h1>
      <p><strong>Автор:</strong> {post.author?.name}</p>
      <p><strong>Категория:</strong> {post.category?.name}</p>
      <p><strong>Теги:</strong> {post.tags?.map(tag => tag.name).join(', ')}</p>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />

      <hr />
      <Comments postId={id} />
    </div>
  );
};
