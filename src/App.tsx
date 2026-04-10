import { useState, useCallback, useEffect } from 'react'
import { NoiseMonitor } from './components/NoiseMonitor'
import { Settings } from './components/Settings'
import { Theme, Sound, CustomImage } from './types'

const STORAGE_KEY = 'quiet-in-class-settings'

interface AppSettings {
  theme: Theme
  threshold: number
  selectedSound: string
  customSounds: Sound[]
  customImages: CustomImage[]
  isMuted: boolean
}

const defaultSettings: AppSettings = {
  theme: 'egg',
  threshold: 60,
  selectedSound: 'bell',
  customSounds: [],
  customImages: [],
  isMuted: false,
}

function App() {
  const [settings, setSettings] = useState<AppSettings>(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? { ...defaultSettings, ...JSON.parse(saved) } : defaultSettings
  })
  
  const [showSettings, setShowSettings] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings))
  }, [settings])

  // Settings handlers will be expanded in future updates

  const handleMuteToggle = useCallback(() => {
    setSettings(prev => ({ ...prev, isMuted: !prev.isMuted }))
  }, [])

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => {
        setIsFullscreen(true)
      }).catch(() => {
        console.error('Fullscreen not supported')
      })
    } else {
      document.exitFullscreen().then(() => {
        setIsFullscreen(false)
      })
    }
  }, [])

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }
    document.addEventListener('fullscreenchange', handleFullscreenChange)
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange)
  }, [])

  return (
    <div className="h-full w-full bg-gradient-to-br from-gray-50 to-gray-100">
      <NoiseMonitor
        theme={settings.theme}
        threshold={settings.threshold}
        selectedSound={settings.selectedSound}
        customSounds={settings.customSounds}
        customImages={settings.customImages}
        isMuted={settings.isMuted}
        onSettingsClick={() => setShowSettings(true)}
        onFullscreenClick={toggleFullscreen}
        onMuteClick={handleMuteToggle}
        isFullscreen={isFullscreen}
      />
      
      {showSettings && (
        <Settings
          currentTheme={settings.theme}
          customImages={settings.customImages}
          onThemeChange={(theme) => setSettings(prev => ({ ...prev, theme }))}
          onClose={() => setShowSettings(false)}
        />
      )}
    </div>
  )
}

export default App