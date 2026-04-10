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
  onThemeChange: (theme: Theme) => void
  onThresholdChange: (threshold: number) => void
  onSoundChange: (soundId: string) => void
  onCustomSoundAdd: (sound: Sound) => void
  onCustomImageAdd: (image: CustomImage) => void
  onCustomImageRemove: (id: string) => void
  onMuteToggle: () => void
  onClose: () => void
}

export function Settings({
  theme,
  threshold,
  selectedSound,
  customSounds,
  customImages,
  isMuted,
  onThemeChange,
  onThresholdChange,
  onSoundChange,
  onCustomSoundAdd,
  onCustomImageAdd,
  onCustomImageRemove,
  onMuteToggle,
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
              className={`flex-1 py-4 px-6 font-medium capitalize transition-colors ${
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
                  Noise Threshold: {threshold} dB
                </label>
                <input
                  type="range"
                  min="30"
                  max="100"
                  value={threshold}
                  onChange={(e) => onThresholdChange(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-tisa-purple"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>30 dB (Quiet)</span>
                  <span>100 dB (Loud)</span>
                </div>
              </div>

              {/* Mute Toggle */}
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${isMuted ? 'bg-red-100' : 'bg-green-100'}`}>
                    {isMuted ? (
                      <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                      </svg>
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">Alarm Sound</p>
                    <p className="text-sm text-gray-500">{isMuted ? 'Muted' : 'Enabled'}</p>
                  </div>
                </div>
                <button
                  onClick={onMuteToggle}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    isMuted ? 'bg-gray-200' : 'bg-tisa-purple'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      isMuted ? 'translate-x-1' : 'translate-x-6'
                    }`}
                  />
                </button>
              </div>
            </div>
          )}

          {activeTab === 'themes' && (
            <div className="space-y-6">
              <ThemeSelector
                currentTheme={theme}
                customImages={customImages}
                onThemeChange={onThemeChange}
              />

              {/* Custom Images */}
              <div className="pt-6 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Custom Images</h3>
                
                <input
                  ref={imageInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                
                <button
                  onClick={() => imageInputRef.current?.click()}
                  className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-tisa-purple hover:text-tisa-purple transition-colors flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Upload Custom Image
                </button>

                {customImages.length > 0 && (
                  <div className="mt-4 grid grid-cols-3 gap-3">
                    {customImages.map((image) => (
                      <div key={image.id} className="relative group">
                        <img
                          src={image.url}
                          alt={image.name}
                          className="w-full h-24 object-cover rounded-lg"
                        />
                        <button
                          onClick={() => onCustomImageRemove(image.id)}
                          className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                        <p className="text-xs text-gray-600 mt-1 truncate">{image.name}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'sounds' && (
            <div className="space-y-6">
              <SoundSelector
                selectedSound={selectedSound}
                customSounds={customSounds}
                onSoundChange={onSoundChange}
              />

              {/* Upload Custom Sound */}
              <div className="pt-6 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Add Custom Sound</h3>
                
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="audio/*"
                  onChange={handleSoundUpload}
                  className="hidden"
                />
                
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-tisa-purple hover:text-tisa-purple transition-colors flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Upload Audio File
                </button>
                <p className="text-xs text-gray-500 mt-2">Supported formats: MP3, WAV, OGG</p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 flex justify-end">
          <button onClick={onClose} className="btn-primary">
            Done
          </button>
        </div>
      </div>
    </div>
  )
}