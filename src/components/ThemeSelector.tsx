import { Theme, CustomImage } from '../types'

interface ThemeSelectorProps {
  currentTheme: Theme
  customImages: CustomImage[]
  onThemeChange: (theme: Theme) => void
}

const themes: { id: Theme; name: string; description: string; preview: string }[] = [
  {
    id: 'egg',
    name: 'Egg',
    description: 'A cute egg character that reacts to noise',
    preview: '🥚',
  },
  {
    id: 'glass',
    name: 'Glass',
    description: 'Elegant glass that fills with color',
    preview: '🥛',
  },
  {
    id: 'thermometer',
    name: 'Thermometer',
    description: 'Rising temperature shows noise level',
    preview: '🌡️',
  },
  {
    id: 'battery',
    name: 'Battery',
    description: 'Battery drains as noise increases',
    preview: '🔋',
  },
  {
    id: 'weather',
    name: 'Weather',
    description: 'Sunny to thunderstorm progression',
    preview: '☀️',
  },
  {
    id: 'volcano',
    name: 'Volcano',
    description: 'Volcano builds pressure until eruption',
    preview: '🌋',
  },
  {
    id: 'custom',
    name: 'Custom',
    description: 'Use your own uploaded images',
    preview: '🖼️',
  },
]

export function ThemeSelector({ currentTheme, customImages, onThemeChange }: ThemeSelectorProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-800">Choose Theme</h3>
      
      <div className="grid gap-3">
        {themes.map((theme) => (
          <button
            key={theme.id}
            onClick={() => onThemeChange(theme.id)}
            disabled={theme.id === 'custom' && customImages.length === 0}
            className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-all text-left ${
              currentTheme === theme.id
                ? 'border-tisa-purple bg-tisa-purple/5'
                : 'border-gray-200 hover:border-gray-300'
            } ${theme.id === 'custom' && customImages.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <span className="text-4xl">{theme.preview}</span>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <p className="font-semibold text-gray-800">{theme.name}</p>
                {currentTheme === theme.id && (
                  <span className="px-2 py-0.5 bg-tisa-purple text-white text-xs rounded-full">
                    Active
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-500">{theme.description}</p>
              {theme.id === 'custom' && customImages.length === 0 && (
                <p className="text-xs text-amber-600 mt-1">Upload images to enable</p>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}