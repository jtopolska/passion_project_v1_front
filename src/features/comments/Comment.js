import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchCommentsByPost,
  createComment,
  deleteComment,
  updateComment
} from '../../app/redux/slices/commentSlice';

export const Comments = ({ postId }) => {
  const dispatch = useDispatch();
  const { items: comments, loading } = useSelector(state => state.comments);

  const [form, setForm] = useState({ name: '', email: '', password: '', content: '' });
  const [editId, setEditId] = useState(null);
  const [editContent, setEditContent] = useState('');
  const [editPassword, setEditPassword] = useState('');

  useEffect(() => {
    dispatch(fetchCommentsByPost(postId));
  }, [dispatch, postId]);

  const handleSubmit = () => {
    dispatch(createComment({ postId, commentData: form }));
    setForm({ name: '', email: '', password: '', content: '' });
  };

  const handleDelete = (id) => {
    const password = prompt('Введите пароль для удаления');
    if (password) {
      dispatch(deleteComment({ id, password }));
    }
  };

  const handleEdit = (id, content) => {
    setEditId(id);
    setEditContent(content);
  };

  const handleUpdate = () => {
    dispatch(updateComment({ id: editId, password: editPassword, content: editContent }));
    setEditId(null);
    setEditContent('');
    setEditPassword('');
  };

  return (
    <div>
      <h3>Комментарии</h3>
      {loading && <p>Загрузка...</p>}
      {comments.map(c => (
        <div key={c._id}>
          <strong>{c.name}</strong>: {c.content}
          <button onClick={() => handleDelete(c._id)}>Удалить</button>
          <button onClick={() => handleEdit(c._id, c.content)}>Редактировать</button>
        </div>
      ))}

      {editId && (
        <div>
          <textarea value={editContent} onChange={e => setEditContent(e.target.value)} />
          <input type="password" placeholder="Пароль" value={editPassword} onChange={e => setEditPassword(e.target.value)} />
          <button onClick={handleUpdate}>Сохранить</button>
        </div>
      )}

      <h4>Оставить комментарий</h4>
      <input placeholder="Имя" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
      <input placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
      <input placeholder="Пароль" type="password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
      <textarea placeholder="Комментарий" value={form.content} onChange={e => setForm({ ...form, content: e.target.value })} />
      <button onClick={handleSubmit}>Отправить</button>
    </div>
  );
};
