import React, { useEffect, useState } from 'react';

export default function CustomHeartCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [trails, setTrails] = useState([]);
  const [isFinePointer, setIsFinePointer] = useState(false);

  useEffect(() => {
    // Check if device has mouse/fine pointer (don't show on touchscreens)
    const media = window.matchMedia('(pointer: fine)');
    setIsFinePointer(media.matches);

    const onMediaChange = (e) => setIsFinePointer(e.matches);
    media.addEventListener('change', onMediaChange);

    if (!media.matches) return;

    let counter = 0;
    const handleMouseMove = (e) => {
      setPos({ x: e.clientX, y: e.clientY });

      counter++;
      if (counter % 3 === 0) {
        const id = Math.random();
        setTrails((prev) => [
          ...prev.slice(-10),
          {
            id,
            x: e.clientX,
            y: e.clientY,
            size: Math.random() * 8 + 6,
            alpha: 0.8,
          },
        ]);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Fade out trails
    const interval = setInterval(() => {
      setTrails((prev) =>
        prev
          .map((t) => ({ ...t, alpha: t.alpha - 0.08, y: t.y - 1 }))
          .filter((t) => t.alpha > 0.1)
      );
    }, 40);

    return () => {
      media.removeEventListener('change', onMediaChange);
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(interval);
    };
  }, []);

  if (!isFinePointer) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden" aria-hidden="true">
      {/* Main Cursor Heart */}
      <div
        className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 pointer-events-none transition-transform duration-75 ease-out"
        style={{
          transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
        }}
      >
        <svg
          viewBox="0 0 24 24"
          className="w-5 h-5 text-rosegold-400 drop-shadow-[0_0_8px_rgba(244,114,182,0.8)] fill-current"
        >
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      </div>

      {/* Trailing Micro-Hearts */}
      {trails.map((t) => (
        <div
          key={t.id}
          className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          style={{
            transform: `translate3d(${t.x}px, ${t.y}px, 0)`,
            opacity: t.alpha,
          }}
        >
          <svg
            viewBox="0 0 24 24"
            style={{ width: `${t.size}px`, height: `${t.size}px` }}
            className="text-pink-300 fill-current drop-shadow-[0_0_4px_rgba(244,114,182,0.6)]"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </div>
      ))}
    </div>
  );
}
