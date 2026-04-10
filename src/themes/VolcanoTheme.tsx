import React from 'react';
import { NewThemeProps } from '../types';

/**
 * Volcano Theme
 * Visualizes noise level as a volcano building pressure
 * Level 1 (Quiet): Dormant volcano, peaceful, birds flying
 * Level 2 (Moderate): Rumbling, smoke wisps, slight tremor
 * Level 3 (Loud): Active smoke, lava glow, shaking
 * Level 4 (Too Loud): Full eruption, lava flow, explosion
 */

export const VolcanoTheme: React.FC<NewThemeProps> = ({ level }) => {
  const getSkyColor = () => {
    switch (level) {
      case 'quiet': return 'from-cyan-300 to-blue-400';
      case 'moderate': return 'from-blue-300 to-purple-300';
      case 'loud': return 'from-orange-300 to-red-400';
      case 'tooLoud': return 'from-red-500 to-gray-800';
      default: return 'from-cyan-300 to-blue-400';
    }
  };

  return (
    <div className={`w-full h-full flex items-end justify-center bg-gradient-to-b ${getSkyColor()} transition-all duration-700 relative overflow-hidden`}>
      {/* Stars (visible in quiet) */}
      {level === 'quiet' && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
              style={{
                left: `${10 + Math.random() * 80}%`,
                top: `${5 + Math.random() * 40}%`,
                animationDelay: `${Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      )}

      {/* Birds for quiet */}
      {level === 'quiet' && (
        <div className="absolute top-16 left-1/4 animate-pulse">
          <svg width="60" height="40" viewBox="0 0 60 40">
            <path d="M10 20 Q20 10 30 20 Q40 10 50 20" stroke="#1F2937" strokeWidth="2" fill="none">
              <animate attributeName="d" values="M10 20 Q20 10 30 20 Q40 10 50 20;M10 20 Q20 25 30 20 Q40 25 50 20;M10 20 Q20 10 30 20 Q40 10 50 20" dur="0.5s" repeatCount="indefinite"/>
            </path>
          </svg>
        </div>
      )}

      {/* Smoke particles - moderate+ */}
      {(level === 'moderate' || level === 'loud' || level === 'tooLoud') && (
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 pointer-events-none">
          {[...Array(level === 'tooLoud' ? 8 : level === 'loud' ? 5 : 3)].map((_, i) => (
            <div
              key={i}
              className="absolute"
              style={{
                left: `${-30 + i * 15}px`,
                animation: `smoke ${3 + i * 0.5}s ease-out ${i * 0.4}s infinite`
              }}
            >
              <div 
                className={`rounded-full ${
                  level === 'tooLoud' ? 'bg-gray-700' : level === 'loud' ? 'bg-gray-500' : 'bg-gray-400'
                }`}
                style={{ width: `${20 + i * 8}px`, height: `${20 + i * 8}px` }}
              />
            </div>
          ))}
          <style>{`
            @keyframes smoke {
              0% { transform: translateY(0) scale(0.5); opacity: 0.8; }
              100% { transform: translateY(-150px) scale(2); opacity: 0; }
            }
          `}</style>
        </div>
      )}

      {/* Ground shake effect for loud+ */}
      {(level === 'loud' || level === 'tooLoud') && (
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            animation: level === 'tooLoud' ? 'shake 0.3s ease-in-out infinite' : 'shake 0.5s ease-in-out infinite'
          }}
        >
          <style>{`
            @keyframes shake {
              0%, 100% { transform: translateX(0); }
              25% { transform: translateX(-2px); }
              75% { transform: translateX(2px); }
            }
          `}</style>
        </div>
      )}

      {/* Volcano */}
      <div className="relative z-10">
        <svg width="300" height="250" viewBox="0 0 300 250" className="drop-shadow-2xl">
          {/* Mountain base */}
          <path 
            d="M50 250 L120 80 Q150 60 180 80 L250 250 Z" 
            fill={level === 'tooLoud' ? '#4B5563' : level === 'loud' ? '#6B7280' : '#57534E'}
            className="transition-colors duration-500"
          />
          
          {/* Mountain texture */}
          <path 
            d="M80 250 L130 120 L150 250 M180 250 L170 150 L220 250" 
            stroke="#000" 
            strokeWidth="1" 
            opacity="0.2"
            fill="none"
          />

          {/* Lava glow inside crater - loud+ */}
          {(level === 'loud' || level === 'tooLoud') && (
            <ellipse cx="150" cy="85" rx="25" ry="8" fill="#EF4444" opacity="0.8">
              <animate attributeName="opacity" values="0.6;1;0.6" dur={level === 'tooLoud' ? '0.3s' : '1s'} repeatCount="indefinite"/>
            </ellipse>
          )}

          {/* Crater rim */}
          <ellipse cx="150" cy="80" rx="30" ry="10" fill="#44403C"/>

          {/* Lava flow - tooLoud only */}
          {level === 'tooLoud' && (
            <>
              {/* Left flow */}
              <path d="M130 85 Q110 120 90 180 Q85 200 80 250 L110 250 Q115 200 125 160 Q135 120 140 85" fill="#DC2626">
                <animate attributeName="opacity" values="0.8;1;0.8" dur="0.5s" repeatCount="indefinite"/>
              </path>
              {/* Right flow */}
              <path d="M170 85 Q190 120 210 180 Q215 200 220 250 L190 250 Q185 200 175 160 Q165 120 160 85" fill="#DC2626">
                <animate attributeName="opacity" values="0.8;1;0.8" dur="0.5s" begin="0.25s" repeatCount="indefinite"/>
              </path>
              {/* Center flow */}
              <path d="M145 85 Q140 150 135 250 L165 250 Q160 150 155 85" fill="#EF4444">
                <animate attributeName="opacity" values="0.9;1;0.9" dur="0.4s" repeatCount="indefinite"/>
              </path>
            </>
          )}

          {/* Eruption particles - tooLoud only */}
          {level === 'tooLoud' && (
            <>
              {[...Array(10)].map((_, i) => (
                <circle 
                  key={i}
                  cx={150 + (Math.random() - 0.5) * 60}
                  cy={80}
                  r={3 + Math.random() * 5}
                  fill={Math.random() > 0.5 ? '#EF4444' : '#FCD34D'}
                >
                  <animate 
                    attributeName="cy" 
                    values="80;20;-20" 
                    dur={`${0.8 + Math.random() * 0.5}s`}
                    repeatCount="indefinite"
                  />
                  <animate 
                    attributeName="cx" 
                    values={`${150 + (Math.random() - 0.5) * 20};${150 + (Math.random() - 0.5) * 100}`}
                    dur={`${0.8 + Math.random() * 0.5}s`}
                    repeatCount="indefinite"
                  />
                  <animate 
                    attributeName="opacity" 
                    values="1;1;0" 
                    dur={`${0.8 + Math.random() * 0.5}s`}
                    repeatCount="indefinite"
                  />
                </circle>
              ))}
            </>
          )}

          {/* Face on volcano */}
          <g transform="translate(150, 160)">
            {/* Eyes */}
            {level === 'quiet' && (
              <>
                <circle cx="-20" cy="-10" r="6" fill="#1F2937"/>
                <circle cx="20" cy="-10" r="6" fill="#1F2937"/>
                <circle cx="-18" cy="-12" r="2" fill="white"/>
                <circle cx="22" cy="-12" r="2" fill="white"/>
              </>
            )}
            {level === 'moderate' && (
              <>
                <line x1="-25" y1="-10" x2="-15" y2="-10" stroke="#1F2937" strokeWidth="3"/>
                <line x1="15" y1="-10" x2="25" y2="-10" stroke="#1F2937" strokeWidth="3"/>
              </>
            )}
            {level === 'loud' && (
              <>
                <circle cx="-20" cy="-10" r="8" fill="white"/>
                <circle cx="20" cy="-10" r="8" fill="white"/>
                <circle cx="-20" cy="-10" r="3" fill="#1F2937"/>
                <circle cx="20" cy="-10" r="3" fill="#1F2937"/>
              </>
            )}
            {level === 'tooLoud' && (
              <>
                <path d="M-28 -15 L-12 -5 M-28 -5 L-12 -15" stroke="#EF4444" strokeWidth="4" strokeLinecap="round"/>
                <path d="M12 -15 L28 -5 M12 -5 L28 -15" stroke="#EF4444" strokeWidth="4" strokeLinecap="round"/>
              </>
            )}

            {/* Mouth */}
            {level === 'quiet' && <path d="M-15 15 Q0 25 15 15" stroke="#1F2937" strokeWidth="3" fill="none"/>}
            {level === 'moderate' && <line x1="-10" y1="20" x2="10" y2="20" stroke="#1F2937" strokeWidth="3"/>}
            {level === 'loud' && <ellipse cx="0" cy="20" rx="10" ry="8" fill="#1F2937"/>}
            {level === 'tooLoud' && <path d="M-15 10 Q0 35 15 10" fill="#7F1D1D" stroke="#EF4444" strokeWidth="2"/>}
          </g>
        </svg>
      </div>

      {/* Foreground ground */}
      <div className="absolute bottom-0 left-0 right-0 h-16">
        <svg width="100%" height="100%" preserveAspectRatio="none" viewBox="0 0 400 60">
          <path 
            d="M0 60 L0 30 Q100 20 200 35 Q300 50 400 25 L400 60 Z" 
            fill={level === 'tooLoud' ? '#292524' : '#44403C'}
            className="transition-colors duration-500"
          />
        </svg>
      </div>

      {/* Trees for quiet */}
      {level === 'quiet' && (
        <div className="absolute bottom-12 left-8">
          <svg width="40" height="60" viewBox="0 0 40 60">
            <rect x="17" y="40" width="6" height="20" fill="#78350F"/>
            <path d="M20 10 L5 45 H35 Z" fill="#15803D"/>
            <path d="M20 0 L10 25 H30 Z" fill="#16A34A"/>
          </svg>
        </div>
      )}
      {level === 'quiet' && (
        <div className="absolute bottom-10 right-12">
          <svg width="30" height="50" viewBox="0 0 30 50">
            <rect x="12" y="30" width="6" height="20" fill="#78350F"/>
            <path d="M15 5 L5 35 H25 Z" fill="#15803D"/>
          </svg>
        </div>
      )}

      {/* Status indicator */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2">
        <div className={`px-6 py-3 rounded-2xl font-bold text-lg shadow-xl transition-all duration-300 ${
          level === 'quiet' ? 'bg-green-500 text-white' :
          level === 'moderate' ? 'bg-yellow-500 text-yellow-900' :
          level === 'loud' ? 'bg-orange-500 text-white' :
          'bg-red-600 text-white animate-pulse'
        }`}>
          {level === 'quiet' && '🌋 Sleeping peacefully'}
          {level === 'moderate' && '🌫️ Starting to smoke...'}
          {level === 'loud' && '🔥 Getting hot!'}
          {level === 'tooLoud' && '💥 ERUPTION!'}
        </div>
      </div>
    </div>
  );
};

export default VolcanoTheme;
