import UserInfo from '../components/UserInfo';
import Balance from '../components/Balance';
import { useApp } from '../context/AppContext';

const Profile = () => {
  const { user } = useApp();

  return (
    <div className="profile-page">
      <UserInfo />
      <Balance />
      
      {/* Если в инвентаре есть предметы, отображаем их */}
      {user.inventory.length > 0 && (
        <div className="inventory-section">
          <h2>Your Items</h2>
          <div className="inventory-grid">
            {user.inventory.map((item, index) => (
              <div key={index} className="inventory-item">
                <img src={item.image} alt={item.name} />
                <div className="item-price">
                  <span className="token-icon">T</span> {item.price.toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Кнопка для открытия кейсов */}
      <div className="open-cases-button-container">
        <button className="open-cases-button">Open Cases</button>
      </div>
      
      {/* Информация о боте */}
      <div className="bot-info">
        @case_official_bot
      </div>
    </div>
  );
};

export default Profile;

