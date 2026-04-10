export type Theme = 'egg' | 'eggClassic' | 'glass' | 'custom' | 'thermometer' | 'battery' | 'weather' | 'volcano'

export interface Sound {
  id: string
  name: string
  url: string
  isBuiltIn: boolean
}

export interface CustomImage {
  id: string
  name: string
  url: string
  lowThresholdUrl?: string
  highThresholdUrl?: string
}

export interface NoiseLevel {
  value: number
  isTooLoud: boolean
}

export interface ThemeProps {
  noiseLevel: number
  threshold: number
  isTooLoud: boolean
  customImages: CustomImage[]
  backgroundColor?: string
}

// Props for new themes that use 'level' instead of noiseLevel/threshold
export interface NewThemeProps {
  level: 'quiet' | 'moderate' | 'loud' | 'tooLoud'
  intensity?: number
}

// Threshold configuration for adjustable noise levels
export interface ThresholdConfig {
  quietToModerate: number
  moderateToLoud: number
  loudToTooLoud: number
  alarmTrigger: number
}

// WHO recommendations for classroom noise levels (in dB)
export const WHO_RECOMMENDATIONS: ThresholdConfig = {
  quietToModerate: 40,
  moderateToLoud: 55,
  loudToTooLoud: 70,
  alarmTrigger: 85
}