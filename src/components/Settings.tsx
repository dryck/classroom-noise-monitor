import { useState, useRef, ChangeEvent } from 'react'
import { Theme, Sound, CustomImage } from '../types'
import { ThemeSelector } from './ThemeSelector'
import { SoundSelector } from './SoundSelector'

interface SettingsProps {
  theme: Theme
  threshold: number
  selectedSound: string
  customSounds: Sound[]
  customImages: CustomImage[]
  isMuted: boolean
  backgroundColor: string
  upDelay: number
  downDelay: number
  onThemeChange: (theme: Theme) => void
  onThresholdChange: (threshold: number) => void
  onSoundChange: (soundId: string) => void
  onCustomSoundAdd: (sound: Sound) => void
  onCustomImageAdd: (image: CustomImage) => void
  onCustomImageRemove: (id: string) => void
  onMuteToggle: () => void
  onBackgroundChange: (color: string) => void
  onUpDelayChange: (delay: number) => void
  onDownDelayChange: (delay: number) => void
  onClose: () => void
}

const BACKGROUNDS = [
  { id: 'dark', name: 'Dark Blue', color: '#0d1b2e' },
  { id: 'light', name: 'Light Gray', color: '#f5f5f5' },
  { id: 'blue', name: 'Blue', color: '#1a365d' },
  { id: 'purple', name: 'Purple', color: '#2d1b4e' },
  { id: 'green', name: 'Green', color: '#1a2f1a' },
]

export function Settings({
  theme,
  threshold,
  selectedSound,
  customSounds,
  customImages,
  isMuted,
  backgroundColor,
  upDelay,
  downDelay,
  onThemeChange,
  onThresholdChange,
  onSoundChange,
  onCustomSoundAdd,
  onCustomImageAdd,
  onCustomImageRemove,
  onMuteToggle,
  onBackgroundChange,
  onUpDelayChange,
  onDownDelayChange,
  onClose,
}: SettingsProps) {
  const [activeTab, setActiveTab] = useState<'general' | 'themes' | 'sounds'>('general')
  const fileInputRef = useRef<HTMLInputElement>(null)
  const imageInputRef = useRef<HTMLInputElement>(null)

  const handleSoundUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('audio/')) {
      alert('Please upload an audio file')
      return
    }

    const url = URL.createObjectURL(file)
    const newSound: Sound = {
      id: `custom-${Date.now()}`,
      name: file.name.replace(/\.[^/.]+$/, ''),
      url,
      isBuiltIn: false,
    }
    onCustomSoundAdd(newSound)
  }

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file')
      return
    }

    const url = URL.createObjectURL(file)
    const newImage: CustomImage = {
      id: `img-${Date.now()}`,
      name: file.name.replace(/\.[^/.]+$/, ''),
      url,
    }
    onCustomImageAdd(newImage)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="panel w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">Settings</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200">
          {(['general', 'themes', 'sounds'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-3 px-4 text-sm font-medium capitalize transition-colors ${
                activeTab === tab
                  ? 'text-tisa-purple border-b-2 border-tisa-purple'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === 'general' && (
            <div className="space-y-6">
              {/* Threshold */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Noise Threshold: {threshold}%
                </label>
                <input
                  type="range"
                  min="30"
                  max="100"
                  value={threshold}
                  onChange={(e) => onThresholdChange(Number(e.target.value))}
                  className="w-full accent-tisa-purple"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Level at which "too loud" warning triggers
                </p>
              </div>

              {/* Background Color */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Background Color
                </label>
                <div className="flex flex-wrap gap-3">
                  {BACKGROUNDS.map((bg) => (
                    <button
                      key={bg.id}
                      onClick={() => onBackgroundChange(bg.id)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 transition-all ${
                        backgroundColor === bg.id
                          ? 'border-tisa-purple bg-tisa-purple/10'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div
                        className="w-6 h-6 rounded-full border border-gray-300"
                        style={{ backgroundColor: bg.color }}
                      />
                      <span className="text-sm">{bg.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Up Delay */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Delay before raising level: {upDelay}s
                </label>
                <input
                  type="range"
                  min="0.5"
                  max="10"
                  step="0.5"
                  value={upDelay}
                  onChange={(e) => onUpDelayChange(Number(e.target.value))}
                  className="w-full accent-tisa-purple"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Noise must stay loud for this long before level increases
                </p>
              </div>

              {/* Down Delay */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Delay before lowering level: {downDelay}s
                </label>
                <input
                  type="range"
                  min="0.5"
                  max="15"
                  step="0.5"
                  value={downDelay}
                  onChange={(e) => onDownDelayChange(Number(e.target.value))}
                  className="w-full accent-tisa-purple"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Must stay quiet for this long before level decreases
                </p>
              </div>

              {/* Mute */}
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <span className="font-medium text-gray-700">Mute Sound</span>
                  <p className="text-sm text-gray-500">Disable alarm sounds</p>
                </div>
                <button
                  onClick={onMuteToggle}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    isMuted ? 'bg-tisa-purple' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      isMuted ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          )}

          {activeTab === 'themes' && (
            <div className="space-y-6">
              <ThemeSelector currentTheme={theme} customImages={customImages} onThemeChange={onThemeChange} />

              {theme === 'custom' && (
                <div className="mt-6">
                  <h3 className="font-medium text-gray-700 mb-3">Custom Images</h3>
                  
                  <input
                    type="file"
                    ref={imageInputRef}
                    onChange={handleImageUpload}
                    accept="image/*"
                    className="hidden"
                  />
                  
                  <button
                    onClick={() => imageInputRef.current?.click()}
                    className="btn-secondary w-full"
                  >
                    Upload Image
                  </button>

                  {customImages.length > 0 && (
                    <div className="mt-4 space-y-2">
                      {customImages.map((img) => (
                        <div key={img.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <span className="text-sm text-gray-700">{img.name}</span>
                          <button
                            onClick={() => onCustomImageRemove(img.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {activeTab === 'sounds' && (
            <div className="space-y-6">
              <SoundSelector
                selectedSound={selectedSound}
                customSounds={customSounds}
                onSoundChange={onSoundChange}
              />

              <div className="mt-6">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleSoundUpload}
                  accept="audio/*"
                  className="hidden"
                />
                
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="btn-secondary w-full"
                >
                  Upload Custom Sound
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200">
          <button onClick={onClose} className="btn-primary w-full">
            Done
          </button>
        </div>
      </div>
    </div>
  )
}
