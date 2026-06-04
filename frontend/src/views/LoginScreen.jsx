import { useState, useEffect, useCallback } from 'react';
import CountryPicker from '../components/CountryPicker';
import { allCountries } from '../data/allCountries';
import { checkUsernameExists } from '../data/mockData';
import './LoginScreen.css';

function LoginScreen({ onLogin = () => {} }) {
  const [isSignUpMode, setIsSignUpMode] = useState(false);
  
  // Form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(null);
  
  // UI state
  const [showPassword, setShowPassword] = useState(false);
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);
  const [usernameStatus, setUsernameStatus] = useState(null); // null | 'available' | 'taken'
  
  // Asynchronous Username Validation
  useEffect(() => {
    if (!isSignUpMode || !username.trim() || !selectedCountry) {
      setUsernameStatus(null);
      return;
    }

    setIsCheckingUsername(true);
    
    // Simulate network delay for premium feel
    const timer = setTimeout(() => {
      const isTaken = checkUsernameExists(username, selectedCountry);
      setUsernameStatus(isTaken ? 'taken' : 'available');
      setIsCheckingUsername(false);
    }, 600);
    
    return () => clearTimeout(timer);
  }, [username, selectedCountry, isSignUpMode]);

  // When switching modes, clear specific fields
  const toggleMode = (e) => {
    e.preventDefault();
    setIsSignUpMode(prev => !prev);
    setConfirmPassword('');
    setUsername('');
    setUsernameStatus(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (isSignUpMode) {
      if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
      }
      if (usernameStatus === 'taken') {
        alert("This username is already taken in your country.");
        return;
      }
      if (!selectedCountry) {
        alert("Please select your country of origin.");
        return;
      }
      // Mock signup success -> login
      onLogin({ username, email, password, country: selectedCountry });
    } else {
      // Mock login
      onLogin({ email, password, country: selectedCountry });
    }
  };

  return (
    <div className="login-screen">
      {/* Logo Area */}
      <div className="login-screen__logo">
        <span className="login-screen__ball" role="img" aria-label="Soccer ball">⚽</span>
        <h1 className="login-screen__app-name">Worldcup Goals</h1>
        <p className="login-screen__tagline">Predict. Compete. Win.</p>
      </div>

      {/* Form Card */}
      <form className="login-screen__card" onSubmit={handleSubmit} autoComplete="off">
        
        {/* Sign Up Header (Optional but nice) */}
        {isSignUpMode && (
          <h2 className="login-screen__mode-title">Create an Account</h2>
        )}
        
        {/* Country Picker - Move up for Sign Up since username depends on it */}
        {isSignUpMode && (
          <div className="login-screen__input-group login-screen__country-group">
            <CountryPicker
              countries={allCountries}
              value={selectedCountry}
              onChange={setSelectedCountry}
              placeholder="Select Country of Origin"
            />
          </div>
        )}

        {/* Username Input (Sign Up Only) */}
        {isSignUpMode && (
          <div className="login-screen__input-group">
            <span className="login-screen__input-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </span>
            <input
              className={`login-screen__input ${usernameStatus ? 'has-status' : ''}`}
              type="text"
              placeholder="Unique Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              aria-label="Username"
              disabled={!selectedCountry}
              required
            />
            {/* Validation Indicator */}
            {selectedCountry && username && (
              <div className="login-screen__validation-indicator">
                {isCheckingUsername ? (
                  <span className="validation-spinner"></span>
                ) : usernameStatus === 'available' ? (
                  <span className="validation-icon validation-icon--success" title="Available">✅</span>
                ) : usernameStatus === 'taken' ? (
                  <span className="validation-icon validation-icon--error" title="Taken">❌</span>
                ) : null}
              </div>
            )}
          </div>
        )}

        {/* Username helper text */}
        {isSignUpMode && usernameStatus === 'taken' && (
          <p className="login-screen__error-text">Username already taken in {allCountries.find(c => c.code === selectedCountry)?.name}.</p>
        )}
        {isSignUpMode && !selectedCountry && (
          <p className="login-screen__helper-text">Select a country first to pick a username.</p>
        )}

        {/* Email Input */}
        <div className="login-screen__input-group">
          <span className="login-screen__input-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="M22 7l-10 7L2 7" />
            </svg>
          </span>
          <input
            className="login-screen__input"
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-label="Email address"
            autoComplete="email"
            required
          />
        </div>

        {/* Password Input */}
        <div className="login-screen__input-group">
          <span className="login-screen__input-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0110 0v4" />
            </svg>
          </span>
          <input
            className="login-screen__input"
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            aria-label="Password"
            autoComplete={isSignUpMode ? 'new-password' : 'current-password'}
            required
          />
          <button
            type="button"
            className="login-screen__toggle-btn"
            onClick={() => setShowPassword((prev) => !prev)}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94" />
                <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19" />
                <line x1="1" y1="1" x2="23" y2="23" />
                <path d="M14.12 14.12a3 3 0 11-4.24-4.24" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            )}
          </button>
        </div>

        {/* Confirm Password Input (Sign Up Only) */}
        {isSignUpMode && (
          <div className="login-screen__input-group">
            <span className="login-screen__input-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </span>
            <input
              className={`login-screen__input ${confirmPassword && password !== confirmPassword ? 'has-error' : ''}`}
              type={showPassword ? 'text' : 'password'}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              aria-label="Confirm Password"
              autoComplete="new-password"
              required
            />
          </div>
        )}
        {isSignUpMode && confirmPassword && password !== confirmPassword && (
          <p className="login-screen__error-text">Passwords do not match.</p>
        )}



        {/* Submit Button */}
        <button 
          type="submit" 
          className="login-screen__submit"
          disabled={isSignUpMode && (usernameStatus === 'taken' || password !== confirmPassword || !selectedCountry)}
        >
          {isSignUpMode ? 'Create Account' : 'Sign In'}
        </button>
      </form>

      {/* Footer Toggle */}
      <p className="login-screen__footer">
        {isSignUpMode ? 'Already have an account? ' : "Don't have an account? "}
        <a href="#toggle-mode" className="login-screen__footer-link" onClick={toggleMode}>
          {isSignUpMode ? 'Sign In' : 'Sign Up'}
        </a>
      </p>
    </div>
  );
}

export default LoginScreen;
