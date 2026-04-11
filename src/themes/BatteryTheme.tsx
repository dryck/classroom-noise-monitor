import React from 'react';
import { NewThemeProps } from '../types';

/**
 * Battery Theme
 * Visualizes noise level as battery draining/charging
 * Level 1 (Quiet): Full green battery, happy face
 * Level 2 (Moderate): 75% yellow-green, content face
 * Level 3 (Loud): 50% orange, worried face, warning
 * Level 4 (Too Loud): Critical red, empty, sad/angry face, sparks
 */

export const BatteryTheme: React.FC<NewThemeProps> = ({ level }) => {
  const getBatteryLevel = () => {
    switch (level) {
      case 'quiet': return 100;
      case 'moderate': return 75;
      case 'loud': return 40;
      case 'tooLoud': return 15;
      default: return 100;
    }
  };

  const getBatteryColor = () => {
    switch (level) {
      case 'quiet': return '#22C55E'; // Green
      case 'moderate': return '#84CC16'; // Lime
      case 'loud': return '#F97316'; // Orange
      case 'tooLoud': return '#EF4444'; // Red
      default: return '#22C55E';
    }
  };

  const getFaceExpression = () => {
    switch (level) {
      case 'quiet': return { eyes: '^ ^', mouth: 'ᴗ', blush: true };
      case 'moderate': return { eyes: '◠ ◠', mouth: '‿', blush: false };
      case 'loud': return { eyes: '◯ ◯', mouth: 'ω', blush: false };
      case 'tooLoud': return { eyes: '> <', mouth: '︵', blush: false };
      default: return { eyes: '^ ^', mouth: 'ᴗ', blush: true };
    }
  };

  const batteryLevel = getBatteryLevel();
  const batteryColor = getBatteryColor();
  const face = getFaceExpression();

  return (
    <div className={`w-full h-full flex items-center justify-center transition-all duration-500 ${
      level === 'quiet' ? 'bg-gradient-to-br from-green-50 to-emerald-100' :
      level === 'moderate' ? 'bg-gradient-to-br from-lime-50 to-yellow-100' :
      level === 'loud' ? 'bg-gradient-to-br from-orange-50 to-amber-100' :
      'bg-gradient-to-br from-red-50 to-rose-100'
    }`}>
      <div className="relative">
        {/* Sparks for too loud */}
        {level === 'tooLoud' && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="absolute animate-ping"
                style={{
                  left: `${20 + Math.random() * 60}%`,
                  top: `${20 + Math.random() * 60}%`,
                  animationDelay: `${i * 0.15}s`,
                  animationDuration: '0.8s'
                }}
              >
                <svg width="20" height="20" viewBox="0 0 20 20">
                  <path d="M10 0 L12 8 L20 10 L12 12 L10 20 L8 12 L0 10 L8 8 Z" fill="#FCD34D"/>
                </svg>
              </div>
            ))}
          </div>
        )}

        {/* Main battery */}
        <div className="relative">
          <svg width="200" height="280" viewBox="0 0 200 280" className="drop-shadow-2xl">
            {/* Battery body */}
            <rect x="20" y="40" width="160" height="200" rx="20" fill="#374151" stroke="#1F2937" strokeWidth="4"/>
            
            {/* Battery positive terminal */}
            <rect x="70" y="20" width="60" height="25" rx="5" fill="#374151"/>
            
            {/* Battery fill background */}
            <rect x="35" y="55" width="130" height="170" rx="12" fill="#1F2937"/>
            
            {/* Battery fill - animated */}
            <rect 
              x="35" 
              y={55 + (170 * (1 - batteryLevel / 100))}
              width="130" 
              height={170 * (batteryLevel / 100)}
              rx="12" 
              fill={batteryColor}
              className="transition-all duration-700"
            >
              <animate 
                attributeName="height" 
                values={`${170 * (batteryLevel / 100)};${170 * (batteryLevel / 100) - 5};${170 * (batteryLevel / 100)}`}
                dur={level === 'tooLoud' ? '0.3s' : '2s'}
                repeatCount="indefinite"
              />
            </rect>

            {/* Grid lines for battery segments */}
            {[1, 2, 3].map((i) => (
              <line 
                key={i}
                x1="35" 
                y1={55 + i * 42.5} 
                x2="165" 
                y2={55 + i * 42.5} 
                stroke="#374151" 
                strokeWidth="2"
                opacity="0.5"
              />
            ))}

            {/* Face */}
            <g transform="translate(100, 140)">
              {/* Eyes */}
              <text x="0" y="-10" textAnchor="middle" fontSize="28" fill="white" fontFamily="Arial" fontWeight="bold">
                {face.eyes}
              </text>
              {/* Mouth */}
              <text x="0" y="25" textAnchor="middle" fontSize="24" fill="white" fontFamily="Arial">
                {face.mouth}
              </text>
              {/* Blush for quiet */}
              {face.blush && (
                <>
                  <circle cx="-35" cy="0" r="8" fill="#F472B6" opacity="0.6"/>
                  <circle cx="35" cy="0" r="8" fill="#F472B6" opacity="0.6"/>
                </>
              )}
            </g>

            {/* Lightning bolt for charging effect (quiet/moderate) */}
            {(level === 'quiet' || level === 'moderate') && (
              <g transform="translate(100, 220)" opacity="0.8">
                <path d="M-8 -15 L2 -5 L-5 -5 L8 15 L-2 5 L5 5 Z" fill="#FCD34D">
                  <animate attributeName="opacity" values="0.8;0.3;0.8" dur="1.5s" repeatCount="indefinite"/>
                </path>
              </g>
            )}

            {/* Cracks for tooLoud */}
            {level === 'tooLoud' && (
              <>
                <path d="M30 60 L45 80 L35 95" stroke="#EF4444" strokeWidth="2" fill="none" opacity="0.7">
                  <animate attributeName="opacity" values="0.7;1;0.7" dur="0.5s" repeatCount="indefinite"/>
                </path>
                <path d="M170 220 L155 200 L165 185" stroke="#EF4444" strokeWidth="2" fill="none" opacity="0.7">
                  <animate attributeName="opacity" values="0.7;1;0.7" dur="0.5s" begin="0.2s" repeatCount="indefinite"/>
                </path>
              </>
            )}

            {/* Shine effect */}
            <rect x="40" y="60" width="20" height="150" rx="8" fill="white" opacity="0.1"/>
          </svg>
        </div>

        {/* 4 Colored dots indicator - BELOW the battery */}
        <div className="flex items-center justify-center gap-3 mt-6">
          {[0, 1, 2, 3].map((dotIndex) => {
            const levelIndex = level === 'quiet' ? 0 : level === 'moderate' ? 1 : level === 'loud' ? 2 : 3;
            const dotColors = ['#22C55E', '#84CC16', '#F97316', '#EF4444']; // Green, Lime, Orange, Red
            const isActive = dotIndex <= levelIndex;
            return (
              <div
                key={dotIndex}
                className={`w-4 h-4 rounded-full transition-all duration-300 ${
                  isActive ? 'scale-100 opacity-100' : 'scale-75 opacity-30'
                }`}
                style={{
                  backgroundColor: dotColors[dotIndex],
                  boxShadow: isActive ? `0 0 8px ${dotColors[dotIndex]}` : 'none'
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BatteryTheme;
