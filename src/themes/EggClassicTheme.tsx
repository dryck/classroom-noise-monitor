import { ThemeProps } from '../types'

export function EggClassicTheme({ noiseLevel, threshold, isTooLoud }: ThemeProps) {
  // Calculate level (1-4)
  const ratio = noiseLevel / threshold
  const level = isTooLoud ? 4 : ratio < 0.5 ? 1 : ratio < 0.8 ? 2 : 3

  // Get status text based on level
  const getStatusText = () => {
    switch (level) {
      case 1: return 'Quiet'
      case 2: return 'Getting loud'
      case 3: return 'Careful...'
      case 4: return 'TOO LOUD!'
      default: return 'Quiet'
    }
  }

  // Egg SVG paths for each state
  const renderEgg = () => {
    const baseEgg = (
      <path
        d="M150 50 C 220 50, 260 150, 260 220 C 260 310, 210 350, 150 350 C 90 350, 40 310, 40 220 C 40 150, 80 50, 150 50 Z"
        fill="#FFFEF0"
        stroke="#E5E4D8"
        strokeWidth="3"
      />
    )

    // Hairline cracks for level 2
    const hairlineCracks = (
      <g stroke="#D4D3C7" strokeWidth="1.5" fill="none" opacity="0.7">
        <path d="M120 120 L125 140 L122 155" />
        <path d="M180 180 L175 200 L178 215" />
        <path d="M140 250 L145 265 L142 280" />
      </g>
    )

    // Deep cracks for level 3
    const deepCracks = (
      <g stroke="#B8B7AB" strokeWidth="2.5" fill="none">
        <path d="M110 100 L120 130 L115 160 L125 190" />
        <path d="M190 140 L180 170 L185 200 L175 230" />
        <path d="M130 240 L140 270 L135 300" />
        <path d="M170 260 L165 290" />
      </g>
    )

    // Shattered pieces for level 4
    const shattered = (
      <g>
        {/* Main broken egg pieces */}
        <path
          d="M150 50 C 220 50, 260 150, 260 220 C 260 250, 250 280, 230 300 L200 280 L220 250 L180 240 L200 200 L160 190 L150 50 Z"
          fill="#FFFEF0"
          stroke="#E5E4D8"
          strokeWidth="2"
        />
        <path
          d="M150 50 C 80 50, 40 150, 40 220 C 40 250, 50 280, 70 300 L100 280 L80 250 L120 240 L100 200 L140 190 L150 50 Z"
          fill="#FFFEF0"
          stroke="#E5E4D8"
          strokeWidth="2"
        />
        <path
          d="M70 300 L100 280 L120 310 L90 330 Z"
          fill="#FFFEF0"
          stroke="#E5E4D8"
          strokeWidth="2"
        />
        <path
          d="M230 300 L200 280 L180 310 L210 330 Z"
          fill="#FFFEF0"
          stroke="#E5E4D8"
          strokeWidth="2"
        />
        <path
          d="M100 280 L140 270 L160 290 L120 310 Z"
          fill="#FFFEF0"
          stroke="#E5E4D8"
          strokeWidth="2"
        />
        <path
          d="M200 280 L160 270 L140 290 L180 310 Z"
          fill="#FFFEF0"
          stroke="#E5E4D8"
          strokeWidth="2"
        />
        {/* Yolk */}
        <ellipse cx="150" cy="290" rx="35" ry="25" fill="#FFB800" />
        <ellipse cx="150" cy="285" rx="20" ry="15" fill="#FFD54F" />
      </g>
    )

    return (
      <g>
        {/* Shadow */}
        <ellipse
          cx="150"
          cy="360"
          rx="80"
          ry="20"
          fill="rgba(0,0,0,0.2)"
        />
        
        {level === 4 ? shattered : (
          <>
            {baseEgg}
            {level >= 2 && hairlineCracks}
            {level >= 3 && deepCracks}
          </>
        )}
      </g>
    )
  }

  return (
    <div className="relative flex flex-col items-center justify-center">
      {/* Egg SVG */}
      <svg
        width="300"
        height="400"
        viewBox="0 0 300 400"
        className="drop-shadow-2xl"
      >
        {renderEgg()}
      </svg>

      {/* Level dots - 4 colored dots showing current level */}
      <div className="flex gap-4 mt-6">
        {[1, 2, 3, 4].map((l) => (
          <div
            key={l}
            className={`w-4 h-4 rounded-full transition-all duration-300 ${
              l <= level
                ? l === 4
                  ? 'bg-red-500 scale-125'
                  : l === 3
                  ? 'bg-orange-500 scale-110'
                  : l === 2
                  ? 'bg-yellow-500'
                  : 'bg-green-500'
                : 'bg-white/20'
            }`}
          />
        ))}
      </div>

      {/* Status text */}
      <div className="mt-6 text-center">
        <p
          className={`text-2xl font-bold transition-colors ${
            isTooLoud ? 'text-red-400' : 'text-white'
          }`}
        >
          {getStatusText()}
        </p>
      </div>
    </div>
  )
}

export default EggClassicTheme
