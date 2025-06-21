import { useApp } from '../context/AppContext';
import Header from '../components/Header';
import CaseCard from '../components/CaseCard';
import Roulette from '../components/Roulette';
import { FaTriangleExclamation } from 'react-icons/fa6';

const Home = () => {
  const { cases } = useApp();

  return (
    <div className="home-page">
      <Header />
      
      <div className="cases-container">
        <div className="cases-row">
          {/* Верхний ряд с иконками "Live" */}
          <div className="case-icon live">
            <div className="live-indicator"></div>
          </div>
          <div className="case-icon">
            <img src="/assets/images/wizard-hat.png" alt="Wizard Hat" />
          </div>
          <div className="case-icon">
            <img src="/assets/images/token.png" alt="Token" />
          </div>
          <div className="case-icon">
            <img src="/assets/images/token.png" alt="Token" />
          </div>
          <div className="case-icon">
            <img src="/assets/images/gift.png" alt="Gift" />
          </div>
          <div className="case-icon">
            <img src="/assets/images/token-gold.png" alt="Gold Token" />
          </div>
        </div>
        
        {/* Баннер новостей */}
        <div className="news-banner">
          <div className="news-icon">
            <FaTriangleExclamation />
          </div>
          <span className="news-text">Check our news</span>
          <button className="open-case-button">Open @case</button>
        </div>
        
        {/* Сетка кейсов */}
        <div className="cases-grid">
          {cases.map((caseItem) => (
            <CaseCard key={caseItem.id} caseItem={caseItem} />
          ))}
        </div>
      </div>
      
      {/* Компонент рулетки (отображается при открытии кейса) */}
      <Roulette />
    </div>
  );
};

export default Home;

