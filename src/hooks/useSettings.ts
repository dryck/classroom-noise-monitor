import { useState, useEffect } from 'react'
import { ThresholdConfig, WHO_RECOMMENDATIONS } from '../types'

const STORAGE_KEY = 'noise-monitor-thresholds'

export function useSettings() {
  const [thresholds, setThresholds] = useState<ThresholdConfig>(WHO_RECOMMENDATIONS)
  const [errors, setErrors] = useState<Partial<Record<keyof ThresholdConfig, string>>>({})

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        setThresholds(parsed)
      } catch {
        // Invalid stored data, use defaults
      }
    }
  }, [])

  // Save to localStorage on change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(thresholds))
  }, [thresholds])

  const validateThresholds = (newThresholds: ThresholdConfig): boolean => {
    const newErrors: Partial<Record<keyof ThresholdConfig, string>> = {}
    
    if (newThresholds.quietToModerate >= newThresholds.moderateToLoud) {
      newErrors.moderateToLoud = 'Must be greater than Quiet→Moderate'
    }
    if (newThresholds.moderateToLoud >= newThresholds.loudToTooLoud) {
      newErrors.loudToTooLoud = 'Must be greater than Moderate→Loud'
    }
    if (newThresholds.loudToTooLoud >= newThresholds.alarmTrigger) {
      newErrors.alarmTrigger = 'Must be greater than Loud→Too Loud'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const updateThreshold = (key: keyof ThresholdConfig, value: number) => {
    const newThresholds = { ...thresholds, [key]: value }
    if (validateThresholds(newThresholds)) {
      setThresholds(newThresholds)
    } else {
      setThresholds(newThresholds) // Still update but show error
    }
  }

  const resetToWHO = () => {
    setThresholds(WHO_RECOMMENDATIONS)
    setErrors({})
  }

  const isUsingWHODefaults = 
    thresholds.quietToModerate === WHO_RECOMMENDATIONS.quietToModerate &&
    thresholds.moderateToLoud === WHO_RECOMMENDATIONS.moderateToLoud &&
    thresholds.loudToTooLoud === WHO_RECOMMENDATIONS.loudToTooLoud &&
    thresholds.alarmTrigger === WHO_RECOMMENDATIONS.alarmTrigger

  return {
    thresholds,
    errors,
    updateThreshold,
    resetToWHO,
    isUsingWHODefaults
  }
}
