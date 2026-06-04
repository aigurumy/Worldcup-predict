import { useState } from 'react';
import './App.css';

import LoginScreen from './views/LoginScreen';
import MatchDashboard from './views/MatchDashboard';
import LeaderboardScreen from './views/LeaderboardScreen';
import ProfileScreen from './views/ProfileScreen';
import BottomNav from './components/BottomNav';
import ResultsModal from './components/ResultsModal';
import { mockFinishedMatches, mockUserPredictions } from './data/mockData';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [currentView, setCurrentView] = useState('matches');

  const handleLogin = (user) => {
    setIsLoggedIn(true);
    setCurrentUser(user);
    setCurrentView('matches');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    setCurrentView('matches');
  };

  const handleTabChange = (tab) => {
    setCurrentView(tab);
  };

  if (!isLoggedIn) {
    return (
      <div className="app">
        <LoginScreen onLogin={handleLogin} />
      </div>
    );
  }

  return (
    <div className="app">
      <main className="app__main">
        {currentView === 'matches' && <MatchDashboard />}
        {currentView === 'leaderboard' && <LeaderboardScreen currentUser={currentUser} />}
        {currentView === 'profile' && <ProfileScreen currentUser={currentUser} onLogout={handleLogout} />}
      </main>
      <BottomNav activeTab={currentView} onTabChange={handleTabChange} />
      <ResultsModal matches={mockFinishedMatches} userPredictions={mockUserPredictions} />
    </div>
  );
}

export default App;
