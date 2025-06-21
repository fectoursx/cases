import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Navigation from './components/Navigation';
import './App.css';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    if (window.Telegram && window.Telegram.WebApp) {
      window.Telegram.WebApp.ready();
      window.Telegram.WebApp.MainButton.setText('Открыть кейс');
      window.Telegram.WebApp.MainButton.show();
    }
  }, []);
  return (
    <AppProvider>
      <Router>
        <div className="app-container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
          <Navigation />
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;

