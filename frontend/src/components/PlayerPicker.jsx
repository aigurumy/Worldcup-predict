import { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import './PlayerPicker.css';

export default function PlayerPicker({
  players = [],
  value = '',
  onChange,
  disabled = false,
  placeholder = "Select a player..."
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const containerRef = useRef(null);
  const searchInputRef = useRef(null);

  // Selected player object
  const selected = useMemo(
    () => players.find((p) => p.name === value) || null,
    [players, value]
  );

  // Filtered list based on search query
  const filtered = useMemo(() => {
    if (!search.trim()) return players;
    const q = search.toLowerCase().trim();
    return players.filter((p) => p.name.toLowerCase().includes(q));
  }, [players, search]);

  // Close dropdown when clicking outside
  useEffect(() => {
    if (!isOpen) return;

    function handleClickOutside(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
        setSearch('');
      }
    }

    document.addEventListener('pointerdown', handleClickOutside);
    return () => document.removeEventListener('pointerdown', handleClickOutside);
  }, [isOpen]);

  // Auto-focus search input when dropdown opens
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(e) {
      if (e.key === 'Escape') {
        setIsOpen(false);
        setSearch('');
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const toggleOpen = useCallback(() => {
    if (disabled) return;
    setIsOpen((prev) => !prev);
    if (isOpen) setSearch('');
  }, [isOpen, disabled]);

  const handleSelect = useCallback(
    (name) => {
      onChange?.(name);
      setIsOpen(false);
      setSearch('');
    },
    [onChange]
  );

  return (
    <div
      className={`player-picker${isOpen ? ' player-picker--open' : ''}${disabled ? ' player-picker--disabled' : ''}`}
      ref={containerRef}
    >
      {/* Trigger button */}
      <button
        type="button"
        className="player-picker__trigger"
        onClick={toggleOpen}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={selected ? `Selected: ${selected.name}` : placeholder}
        disabled={disabled}
      >
        {selected ? (
          <>
            <span className="player-picker__number">{selected.number}</span>
            <span className="player-picker__value">{selected.name}</span>
            <span className="player-picker__position">{selected.position}</span>
          </>
        ) : (
          <span className="player-picker__placeholder">{value ? value : placeholder}</span>
        )}

        {/* Chevron */}
        <svg
          className="player-picker__chevron"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {/* Dropdown panel */}
      {isOpen && !disabled && (
        <div className="player-picker__dropdown" role="listbox" aria-label="Player list">
          {/* Search */}
          <div className="player-picker__search-wrapper">
            <div className="player-picker__search">
              <svg
                className="player-picker__search-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                ref={searchInputRef}
                className="player-picker__search-input"
                type="text"
                placeholder="Search players..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                aria-label="Search players"
              />
            </div>
          </div>

          {/* List */}
          <div className="player-picker__list">
            <button
              type="button"
              role="option"
              aria-selected={value === 'None'}
              className={`player-picker__option${value === 'None' ? ' player-picker__option--selected' : ''}`}
              onClick={() => handleSelect('None')}
            >
              <span className="player-picker__option-name">No Goalscorer (None)</span>
            </button>
            {filtered.length > 0 ? (
              filtered.map((player) => {
                const isSelected = player.name === value;
                return (
                  <button
                    key={player.id}
                    type="button"
                    role="option"
                    aria-selected={isSelected}
                    className={`player-picker__option${
                      isSelected ? ' player-picker__option--selected' : ''
                    }`}
                    onClick={() => handleSelect(player.name)}
                  >
                    <span className="player-picker__number">{player.number}</span>
                    <span className="player-picker__option-name">{player.name}</span>
                    <span className="player-picker__position">{player.position}</span>

                    {isSelected && (
                      <svg
                        className="player-picker__check"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                  </button>
                );
              })
            ) : (
              <div className="player-picker__empty">No players found</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
