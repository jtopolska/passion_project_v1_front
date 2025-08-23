import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getPostById } from '../../app/redux/slices/postSlice';
import { Comments } from '../../features/comments/Comment';
import { Reactions } from '../../features/reactions/Reactions';
import { format } from "date-fns";
import { ru } from "date-fns/locale";

export const PostPage = () => {
  const { id } = useParams(); // Получаем ID из URL
  const dispatch = useDispatch();

  const post = useSelector(state => state.post.selectedPost);
  console.log('post', post)
  const loading = useSelector(state => state.post.loading);

  useEffect(() => {
    dispatch(getPostById(id));
  }, [dispatch, id]);

  if (!post || loading) {
    return <div>Загрузка поста...</div>;
  }

  const isoDate = post.publishDate;
  const formattedDate = format(new Date(isoDate), "dd.MM.yyyy", { locale: ru });

  return (
    <div>
      <h1>{ post.title }</h1>
      
      <p><strong>Категория:</strong> { post.category }</p>
      <div dangerouslySetInnerHTML={ { __html: post.content } } />
      <p><strong>Теги:</strong> { post.tags?.map(tag => tag).join(', ') }</p>
      <p><strong>Автор:</strong> { post.author }</p>
      <p>{ formattedDate }</p>
      
      <Reactions postId={id} reactions={post.reactions} />

      <hr />
      <Comments postId={id} />
    </div>
  );
};
