import { useState } from 'react';
import MatchCard from '../components/MatchCard';
import DateHeader from '../components/DateHeader';

import { matches, groupMatchesByDate } from '../data/mockData';
import './MatchDashboard.css';

function MatchDashboard() {
  const [lockedPredictions, setLockedPredictions] = useState(new Set());

  const toggleLock = (matchId) => {
    setLockedPredictions((prev) => {
      const next = new Set(prev);
      if (next.has(matchId)) {
        next.delete(matchId);
      } else {
        next.add(matchId);
      }
      return next;
    });
  };

  const dateGroups = groupMatchesByDate(matches);
  let globalIndex = 0;

  return (
    <div className="match-dashboard">
      {/* Header Section */}
      <header className="match-dashboard__header">
        <p className="match-dashboard__greeting">Hello, Predictor! 👋</p>
        <h1 className="match-dashboard__title">Upcoming Matches</h1>
        <div className="match-dashboard__stat-bar">
          <span>{matches.length} matches</span>
          <span className="match-dashboard__stat-dot" aria-hidden="true" />
          <span>{dateGroups.length} match days</span>
          <span className="match-dashboard__stat-dot" aria-hidden="true" />
          <span>Group Stage</span>
        </div>
      </header>

      {/* Match Feed */}
      <main className="match-dashboard__feed" role="feed" aria-label="Match predictions feed">
        {dateGroups.map((group) => (
          <section
            key={group.date}
            className="match-dashboard__date-group"
            aria-label={group.dateLabel}
          >
            <DateHeader dateLabel={group.dateLabel} />
            {group.matches.map((match) => {
              const idx = globalIndex++;
              return (
                <div
                  key={match.id}
                  className="match-dashboard__card-wrapper"
                  style={{ animationDelay: `${150 + idx * 80}ms` }}
                >
                  <MatchCard
                    match={match}
                    locked={lockedPredictions.has(match.id)}
                    onLock={() => toggleLock(match.id)}
                  />
                </div>
              );
            })}
          </section>
        ))}
      </main>

      {/* Bottom Spacing */}
      <div className="match-dashboard__bottom-spacer" aria-hidden="true" />


    </div>
  );
}

export default MatchDashboard;
