import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { reactToPost, getPostById } from '../../app/redux/slices/postSlice';

export const Reactions = ({ postId, reactions }) => {
  const dispatch = useDispatch();
  

  const handleClick = (type) => {
    dispatch(reactToPost({ postId, type }));
  };

 

  return (
    <div>
      <h3>Реакции:</h3>
      <button onClick={() => handleClick('like')}>👍 {reactions?.like}</button>
      <button onClick={() => handleClick('thumbUp')}>🫱 {reactions?.thumbUp}</button>
      <button onClick={() => handleClick('fire')}>🔥 {reactions?.fire}</button>
      <button onClick={() => handleClick('heart')}>❤️ {reactions?.heart}</button>
    </div>
  );
};
