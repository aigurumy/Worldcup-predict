import { useMemo, useState, useRef } from 'react';
import { mockAchievements } from '../data/mockData';
import { allCountries } from '../data/allCountries';
import './ProfileScreen.css';

function ProfileScreen({ currentUser, onLogout }) {
  const [avatarUrl, setAvatarUrl] = useState(null);
  const fileInputRef = useRef(null);

  // Derive user display info, defaulting to mock data if not available
  const userCountryObj = currentUser?.country 
    ? allCountries.find((c) => c.code === currentUser.country)
    : { name: 'United States', flag: '/flags/usa.png' };

  const displayUser = {
    username: currentUser?.username || 'Guest Predictor',
    email: currentUser?.email || 'guest@example.com',
    flag: userCountryObj.flag,
    country: userCountryObj.name,
    points: 1990,
    rank: 9,
    nationalRank: 2,
    avatar: avatarUrl ? <img src={avatarUrl} alt="Avatar" className="profile-screen__avatar-img" /> : '👤'
  };

  const unlockedCount = useMemo(() => mockAchievements.filter(a => a.isUnlocked).length, []);

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setAvatarUrl(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="profile-screen">
      {/* Header / Cover Area */}
      <div className="profile-screen__cover">
        <div 
          className="profile-screen__avatar-container" 
          onClick={handleAvatarClick} 
          role="button" 
          tabIndex={0}
          aria-label="Upload Avatar"
        >
          <input 
            type="file" 
            ref={fileInputRef} 
            style={{ display: 'none' }} 
            accept="image/*" 
            onChange={handleFileChange}
          />
          <div className="profile-screen__avatar">
            {displayUser.avatar}
          </div>
          <div className="profile-screen__avatar-overlay">
            <span role="img" aria-label="Change Avatar">📷</span>
          </div>
          <div className="profile-screen__avatar-flag-wrapper">
            <img 
              className="profile-screen__avatar-flag" 
              src={displayUser.flag} 
              alt={`${displayUser.country} flag`} 
              title={displayUser.country}
            />
          </div>
        </div>
      </div>

      {/* User Info */}
      <div className="profile-screen__info">
        <h1 className="profile-screen__username">{displayUser.username}</h1>
        <p className="profile-screen__email">{displayUser.email}</p>
        
        <div className="profile-screen__stats">
          <div className="profile-screen__stat-box">
            <span className="profile-screen__stat-value">{displayUser.points.toLocaleString()}</span>
            <span className="profile-screen__stat-label">Total Points</span>
          </div>
          <div className="profile-screen__stat-box">
            <span className="profile-screen__stat-value">#{displayUser.rank}</span>
            <span className="profile-screen__stat-label">Global Rank</span>
          </div>
          <div className="profile-screen__stat-box">
            <span className="profile-screen__stat-value">#{displayUser.nationalRank}</span>
            <span className="profile-screen__stat-label">Country Rank</span>
          </div>
        </div>
      </div>

      {/* Trophy Cabinet */}
      <div className="profile-screen__cabinet">
        <div className="profile-screen__cabinet-header">
          <h2 className="profile-screen__section-title">Trophy Cabinet</h2>
          <span className="profile-screen__cabinet-count">{unlockedCount} / {mockAchievements.length}</span>
        </div>
        
        <div className="profile-screen__badges">
          {mockAchievements.map((achievement) => (
            <div 
              key={achievement.id} 
              className={`profile-screen__badge ${achievement.isUnlocked ? 'unlocked' : 'locked'}`}
              title={achievement.title}
            >
              <div className="profile-screen__badge-icon-wrapper">
                <span className="profile-screen__badge-icon">{achievement.icon}</span>
              </div>
              <p className="profile-screen__badge-title">{achievement.title}</p>
              <p className="profile-screen__badge-desc">{achievement.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Settings / Actions */}
      <div className="profile-screen__actions">
        <button className="profile-screen__btn profile-screen__btn--logout" onClick={onLogout}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
          Sign Out
        </button>
      </div>
      
      {/* Spacer for bottom nav */}
      <div className="profile-screen__bottom-spacer" />
    </div>
  );
}

export default ProfileScreen;
