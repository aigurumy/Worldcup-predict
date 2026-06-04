import { useState, useEffect, useCallback, useMemo } from 'react';
import { mockPlayers } from '../data/mockData';
import PlayerPicker from './PlayerPicker';
import './MatchCard.css';

/**
 * Calculates remaining time from now to a target date.
 * Returns { days, hours, minutes, expired }.
 */
function getTimeRemaining(kickoff) {
  const total = new Date(kickoff).getTime() - Date.now();
  if (total <= 0) {
    return { days: 0, hours: 0, minutes: 0, expired: true };
  }
  return {
    days: Math.floor(total / (1000 * 60 * 60 * 24)),
    hours: Math.floor((total / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((total / (1000 * 60)) % 60),
    expired: false,
  };
}

/**
 * MatchCard — Core match prediction card.
 */
export default function MatchCard({ match, onLock, locked = false, index = 0 }) {
  const { id, group, matchLabel, teamA, teamB, kickoff, venue } = match;

  // --- Countdown state ---
  const [timeLeft, setTimeLeft] = useState(() => getTimeRemaining(kickoff));

  useEffect(() => {
    if (timeLeft.expired) return;

    const timer = setInterval(() => {
      const next = getTimeRemaining(kickoff);
      setTimeLeft(next);
      if (next.expired) clearInterval(timer);
    }, 1000);

    return () => clearInterval(timer);
  }, [kickoff, timeLeft.expired]);

  // Combine rosters for dropdowns
  const matchPlayers = useMemo(() => {
    const pA = mockPlayers[teamA.code] || [];
    const pB = mockPlayers[teamB.code] || [];
    return [...pA, ...pB];
  }, [teamA.code, teamB.code]);

  // --- Prediction States ---
  const [scoreA, setScoreA] = useState('');
  const [scoreB, setScoreB] = useState('');
  const [winner, setWinner] = useState(''); // 'A', 'Draw', 'B'
  const [totalGoals, setTotalGoals] = useState('');
  const [goalDiff, setGoalDiff] = useState('');
  const [firstScorer, setFirstScorer] = useState('');
  const [anytimeScorer, setAnytimeScorer] = useState('');

  // Accordion state
  const [showAdvanced, setShowAdvanced] = useState(false);

  // Auto-derive stats when scores change
  useEffect(() => {
    if (scoreA !== '' && scoreB !== '') {
      const a = Number(scoreA);
      const b = Number(scoreB);
      
      if (a > b) setWinner('A');
      else if (a < b) setWinner('B');
      else setWinner('Draw');

      setTotalGoals(String(a + b));
      setGoalDiff(String(Math.abs(a - b)));
    }
  }, [scoreA, scoreB]);

  const handleScoreChange = useCallback((setter) => (e) => {
    const val = e.target.value;
    if (val === '' || (/^\d{1,2}$/.test(val) && Number(val) >= 0)) {
      setter(val);
    }
  }, []);

  const handleNumberChange = useCallback((setter) => (e) => {
    const val = e.target.value;
    if (val === '' || (/^\d{1,2}$/.test(val) && Number(val) >= 0)) {
      setter(val);
    }
  }, []);

  // Lock rule: cannot lock if match has started (expired)
  const isExpired = timeLeft.expired;
  const isLocked = locked || isExpired; // auto-lock if expired

  const handleLock = useCallback(() => {
    // Cannot lock or unlock if match has started
    if (isExpired) return;
    
    // If not locked yet, require at least a winner or score to lock
    if (!locked && scoreA === '' && scoreB === '' && winner === '') return;

    onLock?.({ 
      matchId: id, 
      scoreA: scoreA !== '' ? Number(scoreA) : null, 
      scoreB: scoreB !== '' ? Number(scoreB) : null,
      winner,
      totalGoals: totalGoals !== '' ? Number(totalGoals) : null,
      goalDiff: goalDiff !== '' ? Number(goalDiff) : null,
      firstScorer,
      anytimeScorer
    });
  }, [isExpired, locked, scoreA, scoreB, winner, totalGoals, goalDiff, firstScorer, anytimeScorer, id, onLock]);

  // Pad numbers to 2 digits for display
  const pad = (n) => String(n).padStart(2, '0');

  const cardClass = [
    'match-card',
    isLocked && 'match-card--locked',
  ].filter(Boolean).join(' ');

  const countdownClass = [
    'match-card__countdown',
    isExpired && 'match-card__countdown--expired',
  ].filter(Boolean).join(' ');

  const animDelay = `${index * 0.08}s`;

  return (
    <article
      className={cardClass}
      style={{ animationDelay: animDelay }}
      aria-label={`Match prediction: ${teamA.name} vs ${teamB.name}`}
    >
      {/* Locked badge */}
      {isLocked && (
        <span className="match-card__locked-badge" aria-label={isExpired ? "Match Started" : "Prediction locked"}>
          {isExpired && !locked ? '🔒 Started' : '✓ Locked'}
        </span>
      )}

      {/* Top bar */}
      <div className="match-card__top-bar">
        <span className="match-card__meta">
          {group} · {matchLabel}
        </span>
        <span className="match-card__venue" title={venue}>
          {venue}
        </span>
      </div>

      {/* Teams */}
        <div className="match-card__teams">
          <div className="match-card__team">
            <div className="match-card__flag-wrapper">
              <img className="match-card__flag" src={match.teamA.flag} alt={match.teamA.name} />
            </div>
            <span className="match-card__team-name">{match.teamA.name}</span>
          </div>
          
          <div className="match-card__vs">VS</div>
          
          <div className="match-card__team">
            <div className="match-card__flag-wrapper">
              <img className="match-card__flag" src={match.teamB.flag} alt={match.teamB.name} />
            </div>
            <span className="match-card__team-name">{match.teamB.name}</span>
          </div>
        </div>

      {/* Countdown */}
      <div className={countdownClass} aria-label="Time until kickoff">
        {isExpired ? (
          <span className="match-card__live-label">Match in Progress / Finished</span>
        ) : (
          <>
            <div className="match-card__countdown-segment">
              <span className="match-card__countdown-value">{pad(timeLeft.days)}</span>
              <span className="match-card__countdown-label">D</span>
            </div>
            <span className="match-card__countdown-separator" aria-hidden="true">:</span>
            <div className="match-card__countdown-segment">
              <span className="match-card__countdown-value">{pad(timeLeft.hours)}</span>
              <span className="match-card__countdown-label">H</span>
            </div>
            <span className="match-card__countdown-separator" aria-hidden="true">:</span>
            <div className="match-card__countdown-segment">
              <span className="match-card__countdown-value match-card__countdown-value--minutes">{pad(timeLeft.minutes)}</span>
              <span className="match-card__countdown-label">M</span>
            </div>
          </>
        )}
      </div>

      {/* Basic: Who Wins */}
      <div className="match-card__section">
        <h3 className="match-card__section-title">Who Wins? <span className="match-card__pts">(10 pts)</span></h3>
        <div className="match-card__segmented-control">
          <button 
            type="button"
            className={`match-card__segment ${winner === 'A' ? 'match-card__segment--active' : ''}`}
            onClick={() => !isLocked && setWinner('A')}
            disabled={isLocked}
          >
            {teamA.name}
          </button>
          <button 
            type="button"
            className={`match-card__segment ${winner === 'Draw' ? 'match-card__segment--active' : ''}`}
            onClick={() => !isLocked && setWinner('Draw')}
            disabled={isLocked}
          >
            Draw
          </button>
          <button 
            type="button"
            className={`match-card__segment ${winner === 'B' ? 'match-card__segment--active' : ''}`}
            onClick={() => !isLocked && setWinner('B')}
            disabled={isLocked}
          >
            {teamB.name}
          </button>
        </div>
      </div>

      {/* Exact Score */}
      <div className="match-card__section match-card__section--score">
        <h3 className="match-card__section-title">Exact Score <span className="match-card__pts">(30 pts)</span></h3>
        <div className="match-card__scores">
          <input
            className="match-card__score-input"
            type="number"
            min="0" max="99"
            value={scoreA}
            onChange={handleScoreChange(setScoreA)}
            disabled={isLocked}
            placeholder="0"
            inputMode="numeric"
          />
          <span className="match-card__score-dash" aria-hidden="true">–</span>
          <input
            className="match-card__score-input"
            type="number"
            min="0" max="99"
            value={scoreB}
            onChange={handleScoreChange(setScoreB)}
            disabled={isLocked}
            placeholder="0"
            inputMode="numeric"
          />
        </div>
      </div>

      {/* Advanced / Expert Toggle */}
      <button 
        className="match-card__accordion-toggle"
        onClick={() => setShowAdvanced(!showAdvanced)}
        aria-expanded={showAdvanced}
      >
        <span>Advanced & Expert Predictions</span>
        <svg 
          className={`match-card__accordion-icon ${showAdvanced ? 'match-card__accordion-icon--open' : ''}`} 
          viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {/* Advanced / Expert Content */}
      <div className={`match-card__accordion-content ${showAdvanced ? 'match-card__accordion-content--open' : ''}`}>
        <div className="match-card__advanced-grid">
          <div className="match-card__input-group">
            <label className="match-card__label">Total Goals <span className="match-card__pts">(10 pts)</span></label>
            <input 
              type="number" 
              className="match-card__input" 
              value={totalGoals} 
              onChange={handleNumberChange(setTotalGoals)} 
              disabled={isLocked}
              placeholder="e.g. 3"
              inputMode="numeric"
            />
          </div>
          <div className="match-card__input-group">
            <label className="match-card__label">Goal Diff <span className="match-card__pts">(15 pts)</span></label>
            <input 
              type="number" 
              className="match-card__input" 
              value={goalDiff} 
              onChange={handleNumberChange(setGoalDiff)} 
              disabled={isLocked}
              placeholder="e.g. 1"
              inputMode="numeric"
            />
          </div>
          <div className="match-card__input-group match-card__input-group--full">
            <label className="match-card__label">First Goalscorer <span className="match-card__pts">(25 pts)</span></label>
            <PlayerPicker 
              players={matchPlayers}
              value={firstScorer} 
              onChange={setFirstScorer} 
              disabled={isLocked}
              placeholder="Select first goalscorer..."
            />
          </div>
          <div className="match-card__input-group match-card__input-group--full">
            <label className="match-card__label">Anytime Goalscorer <span className="match-card__pts">(10 pts)</span></label>
            <PlayerPicker 
              players={matchPlayers}
              value={anytimeScorer} 
              onChange={setAnytimeScorer} 
              disabled={isLocked}
              placeholder="Select anytime goalscorer..."
            />
          </div>
        </div>
      </div>

      {/* Lock button */}
      <button
        className={`match-card__lock-btn ${locked && !isExpired ? 'match-card__lock-btn--edit' : isExpired ? 'match-card__lock-btn--locked' : ''}`}
        onClick={handleLock}
        disabled={isExpired}
      >
        {isExpired ? 'Match Started (Locked) 🔒' : locked ? 'Edit Prediction ✏️' : 'Lock Prediction 🔒'}
      </button>
    </article>
  );
}
