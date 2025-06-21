import { useApp } from '../context/AppContext';
import { FaUserFriends } from 'react-icons/fa';

const UserInfo = () => {
  const { user, disconnectWallet } = useApp();

  const handleDisconnect = () => {
    disconnectWallet();
  };

  const handleInvite = () => {
    // В реальном приложении здесь был бы функционал приглашения друзей
    alert('Invite link copied to clipboard!');
  };

  const handleShowInventory = () => {
    // В реальном приложении здесь был бы функционал отображения инвентаря
    alert('Showing inventory...');
  };

  return (
    <div className="user-info-container">
      <div className="user-profile">
        <img src={user.avatar} alt="User avatar" className="profile-avatar" />
        <div className="profile-name">
          {user.name} <span className="profile-id">{user.id}</span>
        </div>
      </div>

      <div className="wallet-container">
        <div className="wallet-info">
          <span className="wallet-label">Connected wallet:</span>
          <span className="wallet-address">{user.wallet}</span>
        </div>
        <button className="disconnect-button" onClick={handleDisconnect}>
          Disconnect
        </button>
      </div>

      <div className="invite-container">
        <div className="invite-icon">
          <FaUserFriends />
        </div>
        <span className="invite-text">Invite Friends</span>
        <button className="invite-button" onClick={handleInvite}>
          Invite
        </button>
      </div>

      <div className="inventory-container">
        <span className="inventory-label">Inventory:</span>
        <button className="inventory-button" onClick={handleShowInventory}>
          Show available
        </button>
      </div>
    </div>
  );
};

export default UserInfo;

