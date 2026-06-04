import './DateHeader.css';

export default function DateHeader({ dateLabel = '' }) {
  return (
    <div className="date-header" role="separator" aria-label={dateLabel}>
      <span className="date-header__label">{dateLabel}</span>
    </div>
  );
}
