import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { FaChevronDown } from 'react-icons/fa';

const Header = () => {
  const { user } = useApp();

  return (
    <header className="header">
      <div className="user-info">
        <Link to="/profile" className="avatar-container">
          <img src={user.avatar} alt="User avatar" className="avatar" />
        </Link>
        <span className="username">{user.name}</span>
      </div>
      
      <div className="wallet-info">
        <div className="wallet-address">
          {user.wallet} <FaChevronDown />
        </div>
        <div className="balance">
          {user.balance.toFixed(2)} <span className="token">T</span>
        </div>
      </div>
    </header>
  );
};

export default Header;

