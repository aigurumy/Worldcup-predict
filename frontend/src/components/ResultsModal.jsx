import { useState } from 'react';
import Confetti from './Confetti';
import './ResultsModal.css';

function calculatePoints(prediction, actual) {
  let points = 0;
  const breakdown = [];

  if (!prediction) {
    return { total: 0, breakdown: [{ label: 'No prediction locked', pts: 0, earned: false }] };
  }

  // Exact Score (30 pts)
  const isExactScore = prediction.scoreA === actual.actualScoreA && prediction.scoreB === actual.actualScoreB;
  if (isExactScore) {
    points += 30;
    breakdown.push({ label: `Exact Score (${actual.actualScoreA}-${actual.actualScoreB})`, pts: 30, earned: true });
  } else {
    breakdown.push({ label: `Exact Score`, pts: 0, earned: false });
  }

  // Winner (10 pts)
  let actualWinner = 'Draw';
  if (actual.actualScoreA > actual.actualScoreB) actualWinner = 'A';
  else if (actual.actualScoreA < actual.actualScoreB) actualWinner = 'B';
  
  if (prediction.winner === actualWinner) {
    points += 10;
    breakdown.push({ label: 'Correct Winner', pts: 10, earned: true });
  } else {
    breakdown.push({ label: 'Correct Winner', pts: 0, earned: false });
  }

  // Goal Difference (15 pts)
  const actualGD = Math.abs(actual.actualScoreA - actual.actualScoreB);
  if (prediction.goalDiff === actualGD) {
    points += 15;
    breakdown.push({ label: 'Goal Difference', pts: 15, earned: true });
  } else {
    breakdown.push({ label: 'Goal Difference', pts: 0, earned: false });
  }

  // Total Goals (10 pts)
  const actualTG = actual.actualScoreA + actual.actualScoreB;
  if (prediction.totalGoals === actualTG) {
    points += 10;
    breakdown.push({ label: 'Total Goals', pts: 10, earned: true });
  } else {
    breakdown.push({ label: 'Total Goals', pts: 0, earned: false });
  }

  // First Scorer (25 pts)
  if (prediction.firstScorer && prediction.firstScorer === actual.actualFirstScorer) {
    points += 25;
    breakdown.push({ label: 'First Goalscorer', pts: 25, earned: true });
  } else if (prediction.firstScorer) {
    breakdown.push({ label: 'First Goalscorer', pts: 0, earned: false });
  }

  // Anytime Scorer (10 pts)
  if (prediction.anytimeScorer && actual.actualAnytimeScorers.includes(prediction.anytimeScorer)) {
    points += 10;
    breakdown.push({ label: 'Anytime Goalscorer', pts: 10, earned: true });
  } else if (prediction.anytimeScorer) {
    breakdown.push({ label: 'Anytime Goalscorer', pts: 0, earned: false });
  }

  return { total: points, breakdown };
}

export default function ResultsModal({ matches = [], userPredictions = {} }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!matches || matches.length === 0 || currentIndex >= matches.length) {
    return null; // All dismissed or nothing to show
  }

  const match = matches[currentIndex];
  const prediction = userPredictions[match.id];
  const { total, breakdown } = calculatePoints(prediction, match);

  const handleNext = () => {
    setCurrentIndex(prev => prev + 1);
  };

  return (
    <div className="results-modal-overlay">
      <div className="results-modal" role="dialog" aria-labelledby="results-title">
        {total > 0 && <Confetti />}
        
        <header className="results-modal__header">
          <h2 id="results-title" className="results-modal__title">Match Finished!</h2>
          <p className="results-modal__subtitle">{match.teamA.name} vs {match.teamB.name}</p>
        </header>

        <div className="results-modal__scoreboard">
          <div className="results-modal__team">
            <div className="results-modal__flag-wrapper">
              <img src={match.teamA.flag} alt={match.teamA.name} className="results-modal__flag" />
            </div>
            <span>{match.actualScoreA}</span>
          </div>
          <span className="results-modal__dash">-</span>
          <div className="results-modal__team">
            <span>{match.actualScoreB}</span>
            <div className="results-modal__flag-wrapper">
              <img src={match.teamB.flag} alt={match.teamB.name} className="results-modal__flag" />
            </div>
          </div>
        </div>

        <div className="results-modal__points-badge">
          <span className="results-modal__points-value">+{total}</span>
          <span className="results-modal__points-label">Points Earned</span>
        </div>

        {total === 0 ? (
          <div className="results-modal__zero-state">
            <p>Tough luck on this one! 😅</p>
            <p>Keep guessing, the next match might be your big win!</p>
          </div>
        ) : (
          <div className="results-modal__breakdown">
            <h3 className="results-modal__breakdown-title">Your Prediction Breakdown:</h3>
            <ul className="results-modal__list">
              {breakdown.map((item, idx) => (
                <li key={idx} className={`results-modal__list-item ${item.earned ? 'earned' : 'missed'}`}>
                  <span className="results-modal__list-icon">{item.earned ? '✅' : '❌'}</span>
                  <span className="results-modal__list-label">{item.label}</span>
                  <span className="results-modal__list-pts">{item.earned ? `+${item.pts}` : '0'} pts</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <button className="results-modal__btn" onClick={handleNext}>
          {currentIndex < matches.length - 1 ? 'Next Match Results' : 'Awesome!'}
        </button>
      </div>
    </div>
  );
}
