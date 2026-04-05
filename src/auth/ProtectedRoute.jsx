import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';

export default function ProtectedRoute({ children, role }) {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (role && user.role !== role) {
    return (
      <div className="pt-32 pb-16 text-center max-w-xl mx-auto px-4">
        <div className="glass-card p-12">
            <h2 className="text-3xl font-bold text-red-400 mb-4">Access Denied 🛑</h2>
            <p className="text-white/60 mb-6">You do not have permission to view this page. This area requires <strong className="text-white capitalize">{role}</strong> privileges.</p>
            <p className="text-white/40 text-sm">Please apply for a Franchise to access this content.</p>
        </div>
      </div>
    );
  }

  return children;
}
