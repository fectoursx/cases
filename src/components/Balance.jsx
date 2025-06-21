import { useApp } from '../context/AppContext';

const Balance = () => {
  const { user, deposit } = useApp();

  const handleDeposit = () => {
    // В реальном приложении здесь был бы вызов модального окна для пополнения
    // Для демонстрации просто добавим 10 токенов
    deposit(10);
  };

  return (
    <div className="balance-container">
      <div className="balance-info">
        <span className="balance-label">Balance</span>
        <div className="balance-value">
          {user.balance.toFixed(2)} <span className="token">T</span>
        </div>
      </div>
      <button className="deposit-button" onClick={handleDeposit}>
        Deposit
      </button>
    </div>
  );
};

export default Balance;

