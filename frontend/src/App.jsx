import { useState, useEffect } from 'react';
import { onAuthStateChanged, signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc, updateDoc, setDoc } from 'firebase/firestore';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { auth, db } from './firebase';
import { joinGroup } from './utils/groupActions';
import SplashScreen from './components/SplashScreen';
import './App.css';

import LoginScreen from './views/LoginScreen';
import MatchDashboard from './views/MatchDashboard';
import LeaderboardScreen from './views/LeaderboardScreen';
import ProfileScreen from './views/ProfileScreen';
import AdminScreen from './views/AdminScreen';
import BottomNav from './components/BottomNav';
import ResultsModal from './components/ResultsModal';
import { mockFinishedMatches, mockUserPredictions } from './data/mockData';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const [currentView, setCurrentView] = useState('matches');
  const [darkMode, setDarkMode] = useState(false);
  const [showSplash, setShowSplash] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const groupId = params.get('joinGroup');
    if (groupId) {
      sessionStorage.setItem('pendingJoinGroup', groupId);
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // User is signed in, fetch their custom data from Firestore
        try {
          const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            const userObj = { uid: firebaseUser.uid, email: firebaseUser.email, ...userData };
            setCurrentUser(userObj);
            
            // Check for Stripe success
            const params = new URLSearchParams(window.location.search);
            if (params.get('success') === 'true' && params.get('session_id')) {
              try {
                const functions = getFunctions();
                const verifyPayment = httpsCallable(functions, 'verifyStripePayment');
                await verifyPayment({ sessionId: params.get('session_id') });
                // Update local state immediately
                setCurrentUser(prev => ({ ...prev, isPremium: true }));
                alert("Payment successful! You now have full access to all matches.");
                // Clean URL
                window.history.replaceState({}, document.title, window.location.pathname);
              } catch (e) {
                console.error("Payment verification failed", e);
              }
            }

            // Show splash screen for first-time users
            if (!userData.hasSeenSplash) {
              setShowSplash(true);
            }
          } else {
            setCurrentUser({ uid: firebaseUser.uid, email: firebaseUser.email });
            setShowSplash(true);
          }
          setIsLoggedIn(true);

          // Handle pending group joins
          const pendingGroup = sessionStorage.getItem('pendingJoinGroup');
          if (pendingGroup) {
            joinGroup(pendingGroup, firebaseUser.uid).then(res => {
              if (res.success) {
                alert(`You have successfully joined ${res.groupName}!`);
                setCurrentView('leaderboard');
              } else {
                alert(`Failed to join group: ${res.message}`);
              }
              sessionStorage.removeItem('pendingJoinGroup');
            });
          }

        } catch (error) {
          console.error("Error fetching user data:", error);
          alert("Database Error: " + error.message + "\n\nDid you create the Firestore Database in Test Mode?");
          setIsLoggedIn(false);
        } finally {
          setIsAuthLoading(false);
        }
      } else {
        // User is signed out
        setIsLoggedIn(false);
        setCurrentUser(null);
        setIsAuthLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setCurrentView('matches');
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const handleDismissSplash = async () => {
    setShowSplash(false);
    if (currentUser?.uid) {
      try {
        await updateDoc(doc(db, 'users', currentUser.uid), { hasSeenSplash: true });
      } catch (error) {
        console.error('Error saving splash flag:', error);
      }
    }
  };

  const handleTabChange = (tab) => {
    setCurrentView(tab);
  };

  const handleLogin = async (credentials) => {
    try {
      if (credentials.username) {
        // Sign Up
        const userCredential = await createUserWithEmailAndPassword(auth, credentials.email, credentials.password);
        // Create user document
        await setDoc(doc(db, 'users', userCredential.user.uid), {
          username: credentials.username,
          country: credentials.country,
          hasSeenSplash: false,
          score: 0,
          predictions: {}
        });
      } else {
        // Log In
        await signInWithEmailAndPassword(auth, credentials.email, credentials.password);
      }
    } catch (error) {
      console.error("Authentication error:", error);
      alert("Authentication failed: " + error.message);
    }
  };

  if (isAuthLoading) {
    return (
      <div style={{ display: 'flex', height: '100vh', justifyContent: 'center', alignItems: 'center', backgroundColor: 'var(--bg-color, #F4F7FE)' }}>
        <div style={{ width: '40px', height: '40px', border: '4px solid rgba(0,0,0,0.1)', borderLeftColor: 'var(--primary-color, #1A3C8E)', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
        <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <div className="app">
        <LoginScreen onLogin={handleLogin} />
      </div>
    );
  }

  const isAdmin = currentUser?.email === 'yohanisa@gmail.com';

  return (
    <div className="app">
      {showSplash && <SplashScreen onDismiss={handleDismissSplash} />}
      <main className="app__main">
        {currentView === 'matches' && <MatchDashboard currentUser={currentUser} />}
        {currentView === 'leaderboard' && <LeaderboardScreen currentUser={currentUser} />}
        {currentView === 'profile' && <ProfileScreen currentUser={currentUser} onLogout={handleLogout} darkMode={darkMode} onToggleDarkMode={() => setDarkMode(prev => !prev)} />}
        {currentView === 'admin' && isAdmin && <AdminScreen currentUser={currentUser} />}
      </main>
      <BottomNav activeTab={currentView} onTabChange={handleTabChange} isAdmin={isAdmin} />
      <ResultsModal matches={[]} userPredictions={{}} />
    </div>
  );
}

export default App;
