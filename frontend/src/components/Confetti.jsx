import { useEffect, useState, useMemo } from 'react';
import './Confetti.css';

const COLORS = ['#2e5fd1', '#f59e0b', '#10b981', '#ef4444', '#8b5cf6'];

export default function Confetti() {
  const [show, setShow] = useState(true);

  // Stop rendering confetti after a few seconds to save CPU
  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  const particles = useMemo(() => {
    return Array.from({ length: 60 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 2}s`,
      animationDuration: `${2 + Math.random() * 2}s`,
      backgroundColor: COLORS[Math.floor(Math.random() * COLORS.length)],
      width: `${6 + Math.random() * 6}px`,
      height: `${12 + Math.random() * 12}px`,
    }));
  }, []);

  if (!show) return null;

  return (
    <div className="confetti-container" aria-hidden="true">
      {particles.map((p) => (
        <div
          key={p.id}
          className="confetti-piece"
          style={{
            left: p.left,
            animationDelay: p.animationDelay,
            animationDuration: p.animationDuration,
            backgroundColor: p.backgroundColor,
            width: p.width,
            height: p.height,
          }}
        />
      ))}
    </div>
  );
}
