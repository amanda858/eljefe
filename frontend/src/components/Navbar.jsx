import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Navbar.css';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        <span className="brand-icon">🎯</span>
        <span className="brand-name">ElJefe</span>
      </Link>
      <div className="navbar-links">
        {user ? (
          <>
            <Link to="/dashboard" className="nav-link">Dashboard</Link>
            <Link to="/subscriptions" className="nav-link">Plans</Link>
            <span className={`tier-badge tier-badge--${user.tier}`}>{user.tier.toUpperCase()}</span>
            <button onClick={handleLogout} className="nav-btn nav-btn--outline">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-link">Login</Link>
            <Link to="/register" className="nav-btn nav-btn--primary">Get Started</Link>
          </>
        )}
      </div>
    </nav>
  );
}
