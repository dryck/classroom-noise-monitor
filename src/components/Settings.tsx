import { useState } from 'react'
import { Theme, CustomImage, ThresholdConfig } from '../types'
import { useSettings } from '../hooks/useSettings'
import { ThemeSelector } from './ThemeSelector'

interface SettingsProps {
  currentTheme: Theme
  customImages: CustomImage[]
  onThemeChange: (theme: Theme) => void
  onClose: () => void
}

type SettingsTab = 'themes' | 'thresholds'

export function Settings({ currentTheme, customImages, onThemeChange, onClose }: SettingsProps) {
  const [activeTab, setActiveTab] = useState<SettingsTab>('themes')
  const { thresholds, errors, updateThreshold, resetToWHO, isUsingWHODefaults } = useSettings()

  const thresholdLabels: Record<keyof ThresholdConfig, string> = {
    quietToModerate: 'Quiet → Moderate',
    moderateToLoud: 'Moderate → Loud',
    loudToTooLoud: 'Loud → Too Loud',
    alarmTrigger: 'Alarm Trigger'
  }

  const thresholdDescriptions: Record<keyof ThresholdConfig, string> = {
    quietToModerate: 'Optimal for learning (<40 dB)',
    moderateToLoud: 'Acceptable level (40-55 dB)',
    loudToTooLoud: 'Disruptive to learning (55-70 dB)',
    alarmTrigger: 'Harmful, immediate action needed (>70 dB)'
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-lg h-[85vh] flex flex-col">
        {/* Header - fixed */}
        <div className="flex justify-between items-center p-4 border-b flex-shrink-0">
          <h2 className="text-xl font-bold text-gray-800">Settings</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Tabs - fixed */}
        <div className="flex gap-2 p-4 bg-gray-100 flex-shrink-0">
          <button
            onClick={() => setActiveTab('themes')}
            className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
              activeTab === 'themes'
                ? 'bg-white text-tisa-purple shadow-sm'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Themes
          </button>
          <button
            onClick={() => setActiveTab('thresholds')}
            className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
              activeTab === 'thresholds'
                ? 'bg-white text-tisa-purple shadow-sm'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Thresholds
          </button>
        </div>

        {/* Content - scrollable */}
        <div className="flex-1 overflow-y-auto p-4">
          {activeTab === 'themes' && (
            <ThemeSelector
              currentTheme={currentTheme}
              customImages={customImages}
              onThemeChange={onThemeChange}
            />
          )}

          {activeTab === 'thresholds' && (
            <div className="space-y-6 pb-4">
              {/* WHO Info Box */}
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <h3 className="font-semibold text-blue-900 mb-2">WHO Guidelines for Classrooms</h3>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• <strong>&lt;40 dB:</strong> Optimal for learning</li>
                  <li>• <strong>40-55 dB:</strong> Acceptable</li>
                  <li>• <strong>55-70 dB:</strong> Disruptive</li>
                  <li>• <strong>&gt;70 dB:</strong> Harmful, action needed</li>
                </ul>
              </div>

              {/* Threshold Sliders */}
              <div className="space-y-6">
                {(Object.keys(thresholds) as Array<keyof ThresholdConfig>).map((key) => (
                  <div key={key}>
                    <div className="flex justify-between items-center mb-2">
                      <label className="font-medium text-gray-700">{thresholdLabels[key]}</label>
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          value={thresholds[key]}
                          onChange={(e) => updateThreshold(key, Number(e.target.value))}
                          className="w-20 px-2 py-1 border rounded text-center"
                          min={20}
                          max={100}
                        />
                        <span className="text-gray-500">dB</span>
                      </div>
                    </div>
                    <input
                      type="range"
                      min={20}
                      max={100}
                      value={thresholds[key]}
                      onChange={(e) => updateThreshold(key, Number(e.target.value))}
                      className="w-full accent-tisa-purple"
                    />
                    <p className="text-xs text-gray-500 mt-1">{thresholdDescriptions[key]}</p>
                    {errors[key] && (
                      <p className="text-xs text-red-500 mt-1">{errors[key]}</p>
                    )}
                  </div>
                ))}
              </div>

              {/* Reset Button */}
              <div className="pt-6 border-t">
                <button
                  onClick={resetToWHO}
                  disabled={isUsingWHODefaults}
                  className="w-full py-3 px-4 bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl font-medium transition-colors"
                >
                  {isUsingWHODefaults ? 'Using WHO Recommendations ✓' : 'Reset to WHO Recommendations'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
