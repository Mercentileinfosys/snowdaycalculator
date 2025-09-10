import React from 'react';

const SnowfallBackground = () => {
  // Generate snowflakes with different characters for variety
  const snowflakeChars = ['❄', '❅', '❆', '⋄', '✦', '✧'];
  
  const snowflakes = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    char: snowflakeChars[i % snowflakeChars.length],
    left: Math.random() * 100,
    animationDelay: Math.random() * 20,
    animationDuration: 10 + Math.random() * 20,
    fontSize: 0.5 + Math.random() * 1.5
  }));

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {snowflakes.map((flake) => (
        <div
          key={flake.id}
          className="snowflake absolute text-white/80"
          style={{
            left: `${flake.left}%`,
            fontSize: `${flake.fontSize}em`,
            animationDelay: `${flake.animationDelay}s`,
            animationDuration: `${flake.animationDuration}s`,
            animationName: 'snowfall',
            animationTimingFunction: 'linear',
            animationIterationCount: 'infinite'
          }}
        >
          {flake.char}
        </div>
      ))}
    </div>
  );
};

export default SnowfallBackground;
