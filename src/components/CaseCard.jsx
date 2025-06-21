import { useApp } from '../context/AppContext';

const CaseCard = ({ caseItem }) => {
  const { spinRoulette } = useApp();

  const handleOpenCase = () => {
    spinRoulette(caseItem.id, false);
  };

  return (
    <div 
      className="case-card" 
      onClick={handleOpenCase}
      style={{ background: caseItem.background }}
    >
      <img src={caseItem.image} alt={caseItem.name} className="case-image" />
      <div className="case-info">
        <h3 className="case-name">{caseItem.name}</h3>
        {caseItem.price > 0 && (
          <div className="case-price">
            {caseItem.price} <span className="token">T</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default CaseCard;

