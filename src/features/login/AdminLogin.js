import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginAdmin } from '../../app/redux/slices/authSlice';
import { Navigate } from 'react-router-dom';

export const AdminLogin = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  const [form, setForm] = useState({ username: '', password: '' });

  const handleSubmit = async () => {
    await dispatch(loginAdmin(form));
  };

  if (isAuthenticated) {
    return <Navigate to="/admin/panel" />;
  }

  return (
    <div>
      <h2>Вход в админ-панель</h2>
      <input placeholder="Логин" value={form.username} onChange={e => setForm({ ...form, username: e.target.value })} />
      <input placeholder="Пароль" type="password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
      <button onClick={handleSubmit}>Войти</button>
    </div>
  );
};
