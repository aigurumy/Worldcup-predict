import { useMemo } from 'react';
import './TabSwitcher.css';

const DEFAULT_TABS = [
  { id: 'global', label: 'Global Rankings' },
  { id: 'national', label: 'National Rankings' },
];

export default function TabSwitcher({
  tabs = DEFAULT_TABS,
  activeTab,
  onTabChange,
}) {
  const activeIndex = useMemo(
    () => Math.max(0, tabs.findIndex((t) => t.id === activeTab)),
    [tabs, activeTab]
  );

  const tabCount = tabs.length;

  // Calculate indicator width and offset dynamically
  const indicatorStyle = useMemo(() => {
    // Width accounts for the 4px padding on both sides
    const widthPercent = 100 / tabCount;
    return {
      width: `calc(${widthPercent}% - ${4 * 2 / tabCount}px)`,
      transform: `translateX(calc(${activeIndex * 100}% + ${activeIndex * (8 / tabCount)}px))`,
    };
  }, [activeIndex, tabCount]);

  return (
    <div className="tab-switcher" role="tablist" aria-label="View switcher">
      {/* Sliding background indicator */}
      <span
        className="tab-switcher__indicator"
        style={indicatorStyle}
        aria-hidden="true"
      />

      {tabs.map((tab) => {
        const isActive = tab.id === activeTab;
        return (
          <button
            key={tab.id}
            role="tab"
            aria-selected={isActive}
            className={`tab-switcher__tab${isActive ? ' tab-switcher__tab--active' : ''}`}
            onClick={() => onTabChange?.(tab.id)}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
