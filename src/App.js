import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useCallback, useEffect } from 'react';
import { NoiseMonitor } from './components/NoiseMonitor';
import { Settings } from './components/Settings';
const STORAGE_KEY = 'quiet-in-class-settings';
const defaultSettings = {
    theme: 'egg',
    threshold: 60,
    selectedSound: 'bell',
    customSounds: [],
    customImages: [],
    isMuted: false,
};
function App() {
    const [settings, setSettings] = useState(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        return saved ? { ...defaultSettings, ...JSON.parse(saved) } : defaultSettings;
    });
    const [showSettings, setShowSettings] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    }, [settings]);
    const _handleThemeChange = useCallback((theme) => {
        setSettings(prev => ({ ...prev, theme }));
    }, []);
    const _handleThresholdChange = useCallback((threshold) => {
        setSettings(prev => ({ ...prev, threshold }));
    }, []);
    const _handleSoundChange = useCallback((soundId) => {
        setSettings(prev => ({ ...prev, selectedSound: soundId }));
    }, []);
    const _handleCustomSoundsAdd = useCallback((sound) => {
        setSettings(prev => ({ ...prev, customSounds: [...prev.customSounds, sound] }));
    }, []);
    const _handleCustomImageAdd = useCallback((image) => {
        setSettings(prev => ({ ...prev, customImages: [...prev.customImages, image] }));
    }, []);
    const _handleCustomImageRemove = useCallback((id) => {
        setSettings(prev => ({
            ...prev,
            customImages: prev.customImages.filter(img => img.id !== id)
        }));
    }, []);
    const handleMuteToggle = useCallback(() => {
        setSettings(prev => ({ ...prev, isMuted: !prev.isMuted }));
    }, []);
    const toggleFullscreen = useCallback(() => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().then(() => {
                setIsFullscreen(true);
            }).catch(() => {
                console.error('Fullscreen not supported');
            });
        }
        else {
            document.exitFullscreen().then(() => {
                setIsFullscreen(false);
            });
        }
    }, []);
    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement);
        };
        document.addEventListener('fullscreenchange', handleFullscreenChange);
        return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
    }, []);
    return (_jsxs("div", { className: "h-full w-full bg-gradient-to-br from-gray-50 to-gray-100", children: [_jsx(NoiseMonitor, { theme: settings.theme, threshold: settings.threshold, selectedSound: settings.selectedSound, customSounds: settings.customSounds, customImages: settings.customImages, isMuted: settings.isMuted, onSettingsClick: () => setShowSettings(true), onFullscreenClick: toggleFullscreen, onMuteClick: handleMuteToggle, isFullscreen: isFullscreen }), showSettings && (_jsx(Settings, { onClose: () => setShowSettings(false) }))] }));
}
export default App;
