import { useState } from 'react';
import TabSwitcher from '../components/TabSwitcher';
import Podium from '../components/Podium';
import LeaderboardRow from '../components/LeaderboardRow';
import { allCountries } from '../data/allCountries';
import { leaderboardGlobal, leaderboardNational } from '../data/mockData';
import './LeaderboardScreen.css';

const BASE_TABS = [
  { id: 'global', label: 'Global Rankings' },
  { id: 'national', label: 'National Rankings' },
];

const CURRENT_USER = {
  rank: 9,
  username: 'You',
  flag: '/flags/usa.png',
  country: 'United States',
  points: 1990,
  avatar: '💥',
};

function LeaderboardScreen({ currentUser }) {
  const [activeTab, setActiveTab] = useState('global');

  // Derive country info from currentUser
  const userCountryObj = currentUser?.country 
    ? allCountries.find((c) => c.code === currentUser.country)
    : { name: 'United States', flag: '/flags/usa.png' };

  // Re-build tabs to inject country name
  const tabs = [
    BASE_TABS[0],
    { ...BASE_TABS[1], label: `National (${userCountryObj.name})` }
  ];

  // Derive user info
  const displayUser = {
    rank: 9, // Mock
    username: currentUser?.username || 'You',
    flag: userCountryObj.flag,
    country: userCountryObj.name,
    points: 1990,
    avatar: '💥',
  };

  const data = activeTab === 'global' ? leaderboardGlobal : leaderboardNational;
  const podiumEntries = data.slice(0, 3);
  const listEntries = data.slice(3);

  return (
    <div className="leaderboard-screen">
      {/* Header */}
      <header className="leaderboard-screen__header">
        <h1 className="leaderboard-screen__title">Leaderboard</h1>
        <p className="leaderboard-screen__subtitle">
          See how you stack up against your home country and the world
        </p>
      </header>

      {/* Tab Switcher */}
      <div className="leaderboard-screen__tabs">
        <TabSwitcher tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
      </div>

      {/* Podium */}
      <section className="leaderboard-screen__podium" aria-label="Top 3 rankings">
        <Podium topThree={podiumEntries} />
      </section>

      {/* Divider */}
      <div className="leaderboard-screen__divider" aria-hidden="true">
        Other Rankings
      </div>

      {/* Rankings List */}
      <div className="leaderboard-screen__list" role="list" aria-label="Rankings list">
        {listEntries.map((entry, index) => (
          <div
            key={`${activeTab}-${entry.rank}`}
            className="leaderboard-screen__row-wrapper"
            style={{ animationDelay: `${300 + index * 60}ms` }}
            role="listitem"
          >
            <LeaderboardRow user={entry} index={index} />
          </div>
        ))}
      </div>

      {/* Your Position Card */}
      <div className="leaderboard-screen__user-card" aria-label="Your ranking position">
        <span className="leaderboard-screen__user-label">Your Position</span>
        <span className="leaderboard-screen__user-rank">#{displayUser.rank}</span>
        <span className="leaderboard-screen__user-avatar" role="img" aria-label="Your avatar">
          {displayUser.avatar}
        </span>
        <div className="leaderboard-screen__user-info">
          <p className="leaderboard-screen__user-name">{displayUser.username}</p>
          <div className="leaderboard-screen__user-country">
            <img
              className="leaderboard-screen__user-flag"
              src={displayUser.flag}
              alt={`${displayUser.country} flag`}
            />
            <span>{displayUser.country}</span>
          </div>
        </div>
        <div>
          <span className="leaderboard-screen__user-points">{displayUser.points.toLocaleString()}</span>
          <span className="leaderboard-screen__user-points-label"> pts</span>
        </div>
      </div>

      {/* Bottom Spacing */}
      <div className="leaderboard-screen__bottom-spacer" aria-hidden="true" />


    </div>
  );
}

export default LeaderboardScreen;
