import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const GuestAccessibleRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="container">
        <div className="spinner-container">
          <div className="spinner"></div>
          <div className="spinner-text">Loading...</div>
        </div>
      </div>
    );
  }

  const isGuest = sessionStorage.getItem('guest_access') === 'true';

  if (!user && !isGuest) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default GuestAccessibleRoute;

