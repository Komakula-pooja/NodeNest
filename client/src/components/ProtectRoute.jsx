import { Navigate } from 'react-router-dom';


export const ProtectedRoute = ({element}) => {
  const token = localStorage.getItem('Token'); 

  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return element;
};