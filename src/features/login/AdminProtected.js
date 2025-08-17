import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { Admin } from '../../pages/adminPage/Admin';

export const AdminProtected = () => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  return isAuthenticated ? <Admin /> : <Navigate to="/admin" />;
};
