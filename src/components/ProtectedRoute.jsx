import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { user } = useSelector((state) => state.profile);

  // If no user is logged in, redirect to login page
  if (!user) {
    return <Navigate to="/login" />;
  }

  // If the route is admin-only and the user is not an admin, redirect to home page
  if (adminOnly && user.accountType !== 'admin') {
    return <Navigate to="/" />;
  }

  // Render the children if the user has access
  return children;
};

export default ProtectedRoute;
