import { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import './CountryPicker.css';

export default function CountryPicker({
  countries = [],
  value = '',
  onChange,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const containerRef = useRef(null);
  const searchInputRef = useRef(null);

  // Selected country object
  const selected = useMemo(
    () => countries.find((c) => c.code === value) || null,
    [countries, value]
  );

  // Filtered list based on search query
  const filtered = useMemo(() => {
    if (!search.trim()) return countries;
    const q = search.toLowerCase().trim();
    return countries.filter((c) => c.name.toLowerCase().includes(q));
  }, [countries, search]);

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
    setIsOpen((prev) => !prev);
    if (isOpen) setSearch('');
  }, [isOpen]);

  const handleSelect = useCallback(
    (code) => {
      onChange?.(code);
      setIsOpen(false);
      setSearch('');
    },
    [onChange]
  );

  return (
    <div
      className={`country-picker${isOpen ? ' country-picker--open' : ''}`}
      ref={containerRef}
    >
      {/* Trigger button */}
      <button
        type="button"
        className="country-picker__trigger"
        onClick={toggleOpen}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={selected ? `Selected: ${selected.name}` : 'Select a country'}
      >
        {selected ? (
          <>
            <img
              className="country-picker__flag"
              src={selected.flag}
              alt=""
              loading="lazy"
            />
            <span className="country-picker__value">{selected.name}</span>
          </>
        ) : (
          <span className="country-picker__placeholder">Select a country</span>
        )}

        {/* Chevron */}
        <svg
          className="country-picker__chevron"
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
      {isOpen && (
        <div className="country-picker__dropdown" role="listbox" aria-label="Country list">
          {/* Search */}
          <div className="country-picker__search-wrapper">
            <div className="country-picker__search">
              <svg
                className="country-picker__search-icon"
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
                className="country-picker__search-input"
                type="text"
                placeholder="Search countries…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                aria-label="Search countries"
              />
            </div>
          </div>

          {/* List */}
          <div className="country-picker__list">
            {filtered.length > 0 ? (
              filtered.map((country) => {
                const isSelected = country.code === value;
                return (
                  <button
                    key={country.code}
                    type="button"
                    role="option"
                    aria-selected={isSelected}
                    className={`country-picker__option${
                      isSelected ? ' country-picker__option--selected' : ''
                    }`}
                    onClick={() => handleSelect(country.code)}
                  >
                    <img
                      className="country-picker__flag"
                      src={country.flag}
                      alt=""
                      loading="lazy"
                    />
                    <span className="country-picker__option-name">{country.name}</span>

                    {isSelected && (
                      <svg
                        className="country-picker__check"
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
              <div className="country-picker__empty">No countries found</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
