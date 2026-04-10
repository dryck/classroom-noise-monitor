export type Theme = 'egg' | 'glass' | 'custom' | 'thermometer' | 'battery' | 'weather' | 'volcano'

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