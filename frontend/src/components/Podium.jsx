import './Podium.css';

/**
 * Default placeholder for when topThree has fewer than 3 entries.
 */
const EMPTY_USER = {
  rank: '-',
  username: '—',
  country: '',
  flag: '',
  points: 0,
  avatar: '👤',
};

/**
 * Podium — Top 3 leaderboard display.
 *
 * @param {Array} props.topThree - Array of up to 3 user objects:
 *   { rank, username, country, flag, points, avatar }
 *
 * Renders in visual order: 2nd (left) · 1st (center, taller) · 3rd (right)
 * Uses CSS order property for correct visual placement.
 */
export default function Podium({ topThree = [] }) {
  // Ensure we always have exactly 3 entries
  const users = [0, 1, 2].map((i) => topThree[i] || { ...EMPTY_USER, rank: i + 1 });

  return (
    <div className="podium" role="list" aria-label="Top 3 leaderboard">
      {users.map((user, i) => {
        const place = i + 1; // 1, 2, 3
        return (
          <div
            key={user.username + place}
            className={`podium__column podium__column--${place}`}
            role="listitem"
            aria-label={`Rank ${place}: ${user.username}, ${user.points} points`}
          >
            {/* Crown for 1st place */}
            {place === 1 && (
              <span className="podium__crown" aria-hidden="true">
                👑
              </span>
            )}

            {/* Avatar */}
            <div className="podium__avatar" aria-hidden="true">
              {user.avatar || '👤'}
            </div>

            {/* Username */}
            <span className="podium__username" title={user.username}>
              {user.username}
            </span>

            {/* Country */}
            {user.country && (
              <div className="podium__country">
                {user.flag && (
                  <img
                    className="podium__country-flag"
                    src={user.flag}
                    alt={`${user.country} flag`}
                    width="20"
                    height="20"
                    loading="lazy"
                  />
                )}
                <span className="podium__country-name">{user.country}</span>
              </div>
            )}

            {/* Points badge */}
            <span className="podium__points">
              {user.points.toLocaleString()} pts
            </span>

            {/* Podium block */}
            <div className={`podium__block podium__block--${place}`}>
              <span className="podium__rank">{place}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
