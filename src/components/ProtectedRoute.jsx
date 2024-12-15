import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children, adminOnly = false, userOnly = false }) => {
  const { user } = useSelector((state) => state.profile);

  // If no user is logged in, redirect to login page
  if (!user) {
    return <Navigate to="/login" />;
  }

  // If the route is admin-only and the user is not an admin, redirect to the home page
  if (adminOnly && user.accountType !== 'admin') {
    return <Navigate to="/" />;
  }

  // If the route is user-only and the user is not a Vendor or Individual, redirect to the admin dashboard
  if (userOnly && user.accountType !== 'Vendor' && user.accountType !== 'Individual') {
    return <Navigate to="/admin" />;
  }

  // Render the children if the user has access
  return children;
};

export default ProtectedRoute;
