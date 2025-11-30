import React from 'react';
import DroneIcon from '@/components/icons/DroneIcon';

interface DroneFlightAnimationProps {
  progress: number; // 0 to 100
  fromLabel?: string;
  toLabel?: string;
}

const DroneFlightAnimation: React.FC<DroneFlightAnimationProps> = ({
  progress,
  fromLabel = 'Dispatch',
  toLabel = 'Destination'
}) => {
  return (
    <div className="relative w-full h-24 bg-secondary/30 rounded-lg overflow-hidden">
      {/* Background grid */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(hsl(var(--primary) / 0.5) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--primary) / 0.5) 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px'
        }}
      />

      {/* Flight path */}
      <div className="absolute top-1/2 left-8 right-8 h-0.5 -translate-y-1/2">
        <div className="absolute inset-0 bg-border" />
        <div 
          className="absolute left-0 top-0 h-full bg-gradient-primary transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
        {/* Path dots */}
        <div className="absolute inset-0 flex justify-between items-center">
          {[...Array(10)].map((_, i) => (
            <div 
              key={i}
              className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${
                (i / 9) * 100 <= progress ? 'bg-primary' : 'bg-border'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Start point */}
      <div className="absolute left-4 top-1/2 -translate-y-1/2 flex flex-col items-center">
        <div className="w-4 h-4 rounded-full bg-success border-2 border-success-foreground shadow-[0_0_10px_hsl(var(--success))]" />
        <span className="text-xs text-muted-foreground mt-1">{fromLabel}</span>
      </div>

      {/* End point */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col items-center">
        <div className={`w-4 h-4 rounded-full border-2 ${
          progress >= 100 
            ? 'bg-success border-success-foreground shadow-[0_0_10px_hsl(var(--success))]' 
            : 'bg-destructive border-destructive-foreground animate-pulse'
        }`} />
        <span className="text-xs text-muted-foreground mt-1">{toLabel}</span>
      </div>

      {/* Drone */}
      <div 
        className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 transition-all duration-500"
        style={{ left: `calc(2rem + ${progress}% * 0.85)` }}
      >
        <DroneIcon size={40} animated />
      </div>
    </div>
  );
};

export default DroneFlightAnimation;
