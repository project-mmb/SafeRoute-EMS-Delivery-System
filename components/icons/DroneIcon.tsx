import React from 'react';

interface DroneIconProps {
  className?: string;
  size?: number;
  animated?: boolean;
}

const DroneIcon: React.FC<DroneIconProps> = ({ className = '', size = 120, animated = false }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} ${animated ? 'animate-float' : ''}`}
    >
      {/* Glow effect */}
      <defs>
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
        <linearGradient id="droneGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="hsl(187 85% 43%)" />
          <stop offset="100%" stopColor="hsl(195 85% 40%)" />
        </linearGradient>
        <linearGradient id="bodyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="hsl(215 25% 25%)" />
          <stop offset="100%" stopColor="hsl(215 25% 18%)" />
        </linearGradient>
      </defs>

      {/* Arms */}
      <g filter="url(#glow)">
        <line x1="30" y1="35" x2="15" y2="20" stroke="url(#droneGradient)" strokeWidth="3" strokeLinecap="round"/>
        <line x1="90" y1="35" x2="105" y2="20" stroke="url(#droneGradient)" strokeWidth="3" strokeLinecap="round"/>
        <line x1="30" y1="65" x2="15" y2="80" stroke="url(#droneGradient)" strokeWidth="3" strokeLinecap="round"/>
        <line x1="90" y1="65" x2="105" y2="80" stroke="url(#droneGradient)" strokeWidth="3" strokeLinecap="round"/>
      </g>

      {/* Rotors */}
      <g className={animated ? 'animate-spin-slow origin-center' : ''} style={{ transformOrigin: '15px 20px' }}>
        <ellipse cx="15" cy="20" rx="12" ry="4" fill="url(#droneGradient)" opacity="0.6"/>
      </g>
      <g className={animated ? 'animate-spin-slow origin-center' : ''} style={{ transformOrigin: '105px 20px' }}>
        <ellipse cx="105" cy="20" rx="12" ry="4" fill="url(#droneGradient)" opacity="0.6"/>
      </g>
      <g className={animated ? 'animate-spin-slow origin-center' : ''} style={{ transformOrigin: '15px 80px' }}>
        <ellipse cx="15" cy="80" rx="12" ry="4" fill="url(#droneGradient)" opacity="0.6"/>
      </g>
      <g className={animated ? 'animate-spin-slow origin-center' : ''} style={{ transformOrigin: '105px 80px' }}>
        <ellipse cx="105" cy="80" rx="12" ry="4" fill="url(#droneGradient)" opacity="0.6"/>
      </g>

      {/* Rotor centers */}
      <circle cx="15" cy="20" r="3" fill="hsl(187 85% 43%)" filter="url(#glow)"/>
      <circle cx="105" cy="20" r="3" fill="hsl(187 85% 43%)" filter="url(#glow)"/>
      <circle cx="15" cy="80" r="3" fill="hsl(187 85% 43%)" filter="url(#glow)"/>
      <circle cx="105" cy="80" r="3" fill="hsl(187 85% 43%)" filter="url(#glow)"/>

      {/* Body */}
      <rect x="35" y="35" width="50" height="30" rx="8" fill="url(#bodyGradient)" stroke="url(#droneGradient)" strokeWidth="2"/>
      
      {/* Camera/sensor */}
      <circle cx="60" cy="50" r="8" fill="hsl(215 25% 15%)" stroke="url(#droneGradient)" strokeWidth="2"/>
      <circle cx="60" cy="50" r="4" fill="hsl(187 85% 43%)" filter="url(#glow)"/>

      {/* Medical cross */}
      <rect x="57" y="75" width="6" height="20" rx="1" fill="hsl(0 84% 60%)"/>
      <rect x="52" y="82" width="16" height="6" rx="1" fill="hsl(0 84% 60%)"/>

      {/* Status lights */}
      <circle cx="40" cy="40" r="2" fill="hsl(142 76% 45%)" filter="url(#glow)"/>
      <circle cx="80" cy="40" r="2" fill="hsl(142 76% 45%)" filter="url(#glow)"/>
    </svg>
  );
};

export default DroneIcon;
