import './LeaderboardRow.css';

/**
 * LeaderboardRow — Rank row for leaderboard positions 4+.
 *
 * @param {object} props.user  - { rank, username, country, flag, points, avatar }
 * @param {number} props.index - Index for staggered animation delay (0-based)
 */
export default function LeaderboardRow({ user, index = 0 }) {
  const { rank, username, country, flag, points, avatar } = user;

  const isEven = index % 2 === 0;

  const rowClass = [
    'leaderboard-row',
    isEven && 'leaderboard-row--even',
  ].filter(Boolean).join(' ');

  const animDelay = `${index * 0.06}s`;

  return (
    <div
      className={rowClass}
      style={{ animationDelay: animDelay }}
      role="row"
      aria-label={`Rank ${rank}: ${username}, ${points} points`}
    >
      {/* Rank */}
      <span className="leaderboard-row__rank" role="cell">
        {rank}
      </span>

      {/* Avatar */}
      <span className="leaderboard-row__avatar" role="cell" aria-hidden="true">
        {avatar || '👤'}
      </span>

      {/* Username */}
      <span className="leaderboard-row__username" role="cell" title={username}>
        {username}
      </span>

      {/* Country flag */}
      {flag && (
        <img
          className="leaderboard-row__flag"
          src={flag}
          alt={`${country || ''} flag`}
          width="20"
          height="20"
          loading="lazy"
        />
      )}

      {/* Points */}
      <span className="leaderboard-row__points" role="cell">
        {points.toLocaleString()} pts
      </span>
    </div>
  );
}
