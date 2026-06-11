import { useState, useEffect, useMemo } from 'react';
import { collection, getDocs, query, orderBy, where, addDoc } from 'firebase/firestore';
import { db } from '../firebase';
import TabSwitcher from '../components/TabSwitcher';
import Podium from '../components/Podium';
import LeaderboardRow from '../components/LeaderboardRow';
import GroupsDropdown from '../components/GroupsDropdown';
import { AvatarIcon } from '../components/Avatars';
import { allCountries } from '../data/allCountries';
import { leaveGroup } from '../utils/groupActions';
import './LeaderboardScreen.css';

const BASE_TABS = [
  { id: 'global', label: 'Global' },
  { id: 'national', label: 'National' }
];

function LeaderboardScreen({ currentUser }) {
  const [activeTab, setActiveTab] = useState('global');
  const [usersData, setUsersData] = useState([]);
  const [userGroups, setUserGroups] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Fetch all users sorted by points
        const usersRef = collection(db, 'users');
        const q = query(usersRef, orderBy('points', 'desc'));
        const snap = await getDocs(q);
        
        const fetchedUsers = [];
        snap.forEach(doc => {
          fetchedUsers.push({ id: doc.id, ...doc.data() });
        });
        setUsersData(fetchedUsers);

        // Fetch user's groups
        if (currentUser?.uid) {
          const groupsRef = collection(db, 'groups');
          const gq = query(groupsRef, where('members', 'array-contains', currentUser.uid));
          const gSnap = await getDocs(gq);
          const fetchedGroups = [];
          gSnap.forEach(doc => {
            fetchedGroups.push({ id: doc.id, ...doc.data() });
          });
          setUserGroups(fetchedGroups);
        }

      } catch (error) {
        console.error("Error fetching leaderboard data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [currentUser]);

  // Derive country info from currentUser
  const userCountryObj = currentUser?.country 
    ? allCountries.find((c) => c.code === currentUser.country)
    : { name: 'United States', flag: '/flags/usa.png' };

  // Build tabs dynamically
  const tabs = [
    ...userGroups.map(g => ({ id: `group-${g.id}`, label: g.name })),
    BASE_TABS[0],
    { ...BASE_TABS[1], label: `National` }
  ];

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };

  const isGroupTab = activeTab.startsWith('group-');
  const activeGroupId = isGroupTab ? activeTab.replace('group-', '') : null;
  const activeGroup = isGroupTab ? userGroups.find(g => g.id === activeGroupId) : null;

  const processedData = useMemo(() => {
    let list = usersData;
    
    if (activeTab === 'national') {
      list = list.filter(u => u.country === currentUser?.country);
    } else if (isGroupTab && activeGroup) {
      list = list.filter(u => activeGroup.members.includes(u.id));
    }
    
    return list.map((u, index) => {
      const countryObj = allCountries.find(c => c.code === u.country) || {};
      return {
        id: u.id,
        rank: index + 1,
        username: u.id === currentUser?.uid ? 'You' : u.username,
        flag: countryObj.flag || '/flags/usa.png',
        country: countryObj.name || 'Unknown',
        points: u.points || 0,
        avatar: u.avatar || null
      };
    });
  }, [usersData, activeTab, currentUser, activeGroup, isGroupTab]);

  const currentUserEntry = processedData.find(u => u.id === currentUser?.uid) || {
    rank: '-',
    username: 'You',
    flag: userCountryObj.flag,
    country: userCountryObj.name,
    points: currentUser?.points || 0,
    avatar: currentUser?.avatar || null,
  };

  const podiumEntries = processedData.filter(u => u.points > 0).slice(0, 3);
  const listEntries = processedData.slice(podiumEntries.length);

  const handleCreateGroup = async () => {
    const groupName = prompt("Enter a name for your new group:");
    if (!groupName || !groupName.trim()) return;

    try {
      const newGroupRef = await addDoc(collection(db, 'groups'), {
        name: groupName.trim(),
        createdBy: currentUser.uid,
        members: [currentUser.uid]
      });

      const newGroup = {
        id: newGroupRef.id,
        name: groupName.trim(),
        createdBy: currentUser.uid,
        members: [currentUser.uid]
      };
      
      setUserGroups(prev => [...prev, newGroup]);
      setActiveTab(`group-${newGroup.id}`);
    } catch (error) {
      console.error("Error creating group:", error);
      alert("Failed to create group.");
    }
  };

  const handleLeaveGroup = async (groupId, groupName) => {
    const confirmLeave = window.confirm(`Are you sure you want to leave the group "${groupName}"?`);
    if (!confirmLeave) return;

    try {
      const result = await leaveGroup(groupId, currentUser.uid);
      if (result.success) {
        // Remove from local state
        setUserGroups(prev => prev.filter(g => g.id !== groupId));
        // If the active tab was this group, switch back to global
        if (activeTab === `group-${groupId}`) {
          setActiveTab('global');
        }
        alert(`You have successfully left ${groupName}.`);
      } else {
        alert(`Failed to leave group: ${result.message}`);
      }
    } catch (error) {
      console.error("Error leaving group:", error);
      alert("Failed to leave group.");
    }
  };

  const handleCopyInvite = () => {
    if (!activeGroupId) return;
    const inviteUrl = `${window.location.origin}/?joinGroup=${activeGroupId}`;
    navigator.clipboard.writeText(inviteUrl);
    alert("Invite link copied to clipboard!");
  };

  if (isLoading) {
    return <div className="leaderboard-screen"><p style={{padding: '2rem'}}>Loading leaderboard...</p></div>;
  }

  return (
    <div className="leaderboard-screen">
      {/* Header */}
      <header className="leaderboard-screen__header">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 className="leaderboard-screen__title">Leaderboard</h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '0.25rem' }}>
              <p className="leaderboard-screen__subtitle" style={{ margin: 0 }}>
                {isGroupTab ? `Group Rankings` : `See how you stack up`}
              </p>
              {isGroupTab && activeGroup && (
                <button 
                  className="invite-btn" 
                  onClick={handleCopyInvite}
                  style={{ padding: '0.25rem 0.75rem', fontSize: '0.75rem', margin: 0, height: 'auto', minHeight: 'auto' }}
                >
                  🔗 Copy Invite Link
                </button>
              )}
            </div>
          </div>
          <GroupsDropdown 
            userGroups={userGroups} 
            onCreateGroup={handleCreateGroup} 
            onSelectGroup={(id) => setActiveTab(`group-${id}`)} 
            onLeaveGroup={handleLeaveGroup}
          />
        </div>

      </header>

      {/* Tab Switcher */}
      <div className="leaderboard-screen__tabs">
        <TabSwitcher tabs={tabs} activeTab={activeTab} onTabChange={handleTabChange} />
      </div>

      {/* Podium */}
      <section className="leaderboard-screen__podium" aria-label="Top 3 rankings">
        <Podium topThree={podiumEntries} />
      </section>

      {/* Divider */}
      {listEntries.length > 0 && (
        <div className="leaderboard-screen__divider" aria-hidden="true">
          Other Rankings
        </div>
      )}

      {/* Rankings List */}
      <div className="leaderboard-screen__list" role="list" aria-label="Rankings list">
        {listEntries.map((entry, index) => (
          <div
            key={`${activeTab}-${entry.rank}`}
            className="leaderboard-screen__row-wrapper"
            style={{ animationDelay: `${100 + index * 40}ms` }}
            role="listitem"
          >
            <LeaderboardRow user={entry} index={index} />
          </div>
        ))}
      </div>

      {/* Your Position Card */}
      <div className="leaderboard-screen__user-card" aria-label="Your ranking position">
        <span className="leaderboard-screen__user-label">Your Position</span>
        <span className="leaderboard-screen__user-rank">#{currentUserEntry.rank}</span>
        <span className="leaderboard-screen__user-avatar" role="img" aria-label="Your avatar">
          <AvatarIcon 
            type={currentUserEntry.avatar?.type || 'player'} 
            color={currentUserEntry.avatar?.color || '#3B82F6'} 
            size={36} 
            gender={currentUserEntry.avatar?.gender || 'male'}
          />
        </span>
        <div className="leaderboard-screen__user-info">
          <p className="leaderboard-screen__user-name">{currentUserEntry.username}</p>
          <div className="leaderboard-screen__user-country">
            <img
              className="leaderboard-screen__user-flag"
              src={currentUserEntry.flag}
              alt={`${currentUserEntry.country} flag`}
            />
            <span>{currentUserEntry.country}</span>
          </div>
        </div>
        <div>
          <span className="leaderboard-screen__user-points">{currentUserEntry.points.toLocaleString()}</span>
          <span className="leaderboard-screen__user-points-label"> pts</span>
        </div>
      </div>

      {/* Bottom Spacing */}
      <div className="leaderboard-screen__bottom-spacer" aria-hidden="true" />
    </div>
  );
}

export default LeaderboardScreen;
