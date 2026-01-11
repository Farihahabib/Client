import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../Hooks/useAuth';
import useRole from '../Hooks/useRole';

const ModeratorRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const [role, isRoleLoading] = useRole();
  const location = useLocation();

  if (loading || isRoleLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loading loading-spinner loading-lg"></div>
      </div>
    );
  }

  if (user && (role === 'Moderator' || role === 'Admin')) {
    return children;
  }

  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default ModeratorRoute;