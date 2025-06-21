const PrizeItem = ({ item }) => {
  return (
    <div className="prize-item">
      <img src={item.image} alt={item.name} className="prize-image" />
      <div className="prize-price">
        <span className="token-icon">T</span> {item.price.toFixed(2)}
      </div>
    </div>
  );
};

export default PrizeItem;

