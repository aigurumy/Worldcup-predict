import { useMemo } from 'react';
import './BottomNav.css';

const TABS = [
  {
    id: 'matches',
    label: 'Matches',
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        {/* Soccer ball */}
        <circle cx="12" cy="12" r="10" />
        <path d="M12 2 L12 6" />
        <path d="M12 18 L12 22" />
        <path d="M2.93 7.5 L6.6 9.5" />
        <path d="M17.4 14.5 L21.07 16.5" />
        <path d="M2.93 16.5 L6.6 14.5" />
        <path d="M17.4 9.5 L21.07 7.5" />
        <path d="M8 12 L16 12" />
        <path d="M6.6 9.5 L8 12 L6.6 14.5" />
        <path d="M17.4 9.5 L16 12 L17.4 14.5" />
        <path d="M12 6 L6.6 9.5" />
        <path d="M12 6 L17.4 9.5" />
        <path d="M12 18 L6.6 14.5" />
        <path d="M12 18 L17.4 14.5" />
      </svg>
    ),
  },
  {
    id: 'leaderboard',
    label: 'Leaderboard',
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        {/* Trophy */}
        <path d="M8 21h8" />
        <path d="M12 17v4" />
        <path d="M7 4h10v5a5 5 0 0 1-10 0V4z" />
        <path d="M7 7H4a1 1 0 0 0-1 1v1a3 3 0 0 0 3 3h1" />
        <path d="M17 7h3a1 1 0 0 1 1 1v1a3 3 0 0 1-3 3h-1" />
      </svg>
    ),
  },
  {
    id: 'profile',
    label: 'Profile',
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        {/* User */}
        <circle cx="12" cy="8" r="4" />
        <path d="M20 21c0-3.87-3.58-7-8-7s-8 3.13-8 7" />
      </svg>
    ),
  },
];

export default function BottomNav({ activeTab = 'matches', onTabChange }) {
  const activeIndex = useMemo(
    () => Math.max(0, TABS.findIndex((t) => t.id === activeTab)),
    [activeTab]
  );

  return (
    <nav className="bottom-nav" aria-label="Main navigation">
      <div className="bottom-nav__tabs" role="tablist">
        {/* Sliding indicator */}
        <span
          className={`bottom-nav__indicator bottom-nav__indicator--${activeIndex}`}
          aria-hidden="true"
        />

        {TABS.map((tab) => {
          const isActive = tab.id === activeTab;
          return (
            <button
              key={tab.id}
              role="tab"
              aria-selected={isActive}
              aria-label={tab.label}
              className={`bottom-nav__tab${isActive ? ' bottom-nav__tab--active' : ''}`}
              onClick={() => onTabChange?.(tab.id)}
            >
              <span className="bottom-nav__icon">{tab.icon}</span>
              <span className="bottom-nav__label">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
