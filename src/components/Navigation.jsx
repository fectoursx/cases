import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaBolt, FaFire, FaRocket, FaUser } from 'react-icons/fa';

const Navigation = () => {
  const location = useLocation();
  
  // Определяем активный путь
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="navigation">
      <Link to="/" className={`nav-item ${isActive('/') ? 'active' : ''}`}>
        <FaHome />
        <span>Main</span>
      </Link>
      <Link to="/weekly" className={`nav-item ${isActive('/weekly') ? 'active' : ''}`}>
        <FaBolt />
        <span>Weekly</span>
      </Link>
      <Link to="/jackpot" className={`nav-item ${isActive('/jackpot') ? 'active' : ''}`}>
        <FaFire />
        <span>JackPot</span>
      </Link>
      <Link to="/upgrade" className={`nav-item ${isActive('/upgrade') ? 'active' : ''}`}>
        <FaRocket />
        <span>Upgrade</span>
      </Link>
      <Link to="/profile" className={`nav-item ${isActive('/profile') ? 'active' : ''}`}>
        <FaUser />
        <span>Profile</span>
      </Link>
    </nav>
  );
};

export default Navigation;

