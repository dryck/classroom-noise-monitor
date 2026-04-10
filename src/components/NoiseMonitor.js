import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect, useCallback, useRef } from 'react';
import { EggTheme } from '../themes/EggTheme';
import { EggClassicTheme } from '../themes/EggClassicTheme';
import { GlassTheme } from '../themes/GlassTheme';
import { CustomTheme } from '../themes/CustomTheme';
import { ThermometerTheme } from '../themes/ThermometerTheme';
import { BatteryTheme } from '../themes/BatteryTheme';
import { WeatherTheme } from '../themes/WeatherTheme';
import { VolcanoTheme } from '../themes/VolcanoTheme';
import { useAudio } from '../hooks/useAudio';
import { calculateNoiseLevel } from '../utils/noiseCalculator';
export function NoiseMonitor({ theme, threshold, selectedSound, customSounds, customImages, isMuted, backgroundColor = 'dark', upDelay: _upDelay = 2, downDelay: _downDelay = 4, onSettingsClick, onFullscreenClick, onMuteClick, isFullscreen, }) {
    const [noiseLevel, setNoiseLevel] = useState(0);
    const [isTooLoud, setIsTooLoud] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const [error, setError] = useState(null);
    const audioContextRef = useRef(null);
    const analyserRef = useRef(null);
    const microphoneRef = useRef(null);
    const animationFrameRef = useRef(null);
    const wasTooLoudRef = useRef(false);
    const { playAlarm } = useAudio(selectedSound, customSounds, isMuted);
    const startListening = useCallback(async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
            analyserRef.current = audioContextRef.current.createAnalyser();
            analyserRef.current.fftSize = 256;
            microphoneRef.current = audioContextRef.current.createMediaStreamSource(stream);
            microphoneRef.current.connect(analyserRef.current);
            setIsListening(true);
            setError(null);
        }
        catch (err) {
            setError('Microphone access denied. Please allow microphone access to use the noise monitor.');
            setIsListening(false);
        }
    }, []);
    const stopListening = useCallback(() => {
        if (animationFrameRef.current) {
            cancelAnimationFrame(animationFrameRef.current);
        }
        if (microphoneRef.current) {
            microphoneRef.current.disconnect();
        }
        if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
            audioContextRef.current.close();
        }
        setIsListening(false);
        setNoiseLevel(0);
        setIsTooLoud(false);
    }, []);
    useEffect(() => {
        if (!isListening || !analyserRef.current)
            return;
        const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
        const updateNoiseLevel = () => {
            if (!analyserRef.current)
                return;
            analyserRef.current.getByteFrequencyData(dataArray);
            const level = calculateNoiseLevel(dataArray);
            const tooLoud = level > threshold;
            setNoiseLevel(level);
            setIsTooLoud(tooLoud);
            // Play alarm when threshold is crossed
            if (tooLoud && !wasTooLoudRef.current) {
                playAlarm();
            }
            wasTooLoudRef.current = tooLoud;
            animationFrameRef.current = requestAnimationFrame(updateNoiseLevel);
        };
        updateNoiseLevel();
        return () => {
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, [isListening, threshold, playAlarm]);
    useEffect(() => {
        return () => {
            stopListening();
        };
    }, [stopListening]);
    const renderTheme = () => {
        const props = { noiseLevel, threshold, isTooLoud, customImages, backgroundColor };
        // Convert to level format for new themes
        const getLevel = () => {
            if (isTooLoud)
                return 'tooLoud';
            const ratio = noiseLevel / threshold;
            if (ratio < 0.5)
                return 'quiet';
            if (ratio < 0.8)
                return 'moderate';
            return 'loud';
        };
        const levelProps = { level: getLevel() };
        switch (theme) {
            case 'egg':
                return _jsx(EggTheme, { ...props });
            case 'eggClassic':
                return _jsx(EggClassicTheme, { ...props });
            case 'glass':
                return _jsx(GlassTheme, { ...props });
            case 'custom':
                return _jsx(CustomTheme, { ...props });
            case 'thermometer':
                return _jsx(ThermometerTheme, { ...levelProps });
            case 'battery':
                return _jsx(BatteryTheme, { ...levelProps });
            case 'weather':
                return _jsx(WeatherTheme, { ...levelProps });
            case 'volcano':
                return _jsx(VolcanoTheme, { ...levelProps });
            default:
                return _jsx(EggTheme, { ...props });
        }
    };
    return (_jsxs("div", { className: `relative flex flex-col items-center justify-center ${isFullscreen ? 'fullscreen bg-black' : 'h-full w-full'}`, children: [_jsxs("div", { className: "absolute top-4 left-4 right-4 flex justify-between items-center z-20", children: [_jsxs("div", { className: "flex gap-2", children: [_jsx("button", { onClick: onMuteClick, className: "p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all active:scale-95", title: isMuted ? 'Unmute' : 'Mute', children: isMuted ? (_jsxs("svg", { className: "w-6 h-6 text-gray-600", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: [_jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" }), _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" })] })) : (_jsx("svg", { className: "w-6 h-6 text-gray-600", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" }) })) }), _jsx("button", { onClick: onFullscreenClick, className: "p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all active:scale-95", title: isFullscreen ? 'Exit Fullscreen' : 'Fullscreen', children: isFullscreen ? (_jsx("svg", { className: "w-6 h-6 text-gray-600", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M6 18L18 6M6 6l12 12" }) })) : (_jsx("svg", { className: "w-6 h-6 text-gray-600", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" }) })) })] }), _jsx("button", { onClick: onSettingsClick, className: "p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all active:scale-95", title: "Settings", children: _jsxs("svg", { className: "w-6 h-6 text-gray-600", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: [_jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" }), _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M15 12a3 3 0 11-6 0 3 3 0 016 0z" })] }) })] }), _jsx("div", { className: "flex-1 flex items-center justify-center w-full", children: !isListening ? (_jsxs("div", { className: "text-center p-8", children: [error ? (_jsxs("div", { className: "mb-6", children: [_jsx("div", { className: "w-20 h-20 mx-auto mb-4 rounded-full bg-red-100 flex items-center justify-center", children: _jsx("svg", { className: "w-10 h-10 text-red-500", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" }) }) }), _jsx("p", { className: "text-red-600 max-w-md", children: error })] })) : (_jsxs("div", { className: "mb-8", children: [_jsx("div", { className: "w-32 h-32 mx-auto mb-6 rounded-full bg-tisa-purple/10 flex items-center justify-center animate-pulse-slow", children: _jsx("svg", { className: "w-16 h-16 text-tisa-purple", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 1.5, d: "M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" }) }) }), _jsx("h1", { className: "text-3xl font-bold text-gray-800 mb-2", children: "Quiet in Class" }), _jsx("p", { className: "text-gray-600", children: "Monitor classroom noise levels" })] })), _jsx("button", { onClick: startListening, className: "btn-primary text-lg px-8 py-4", children: error ? 'Try Again' : 'Start Monitoring' })] })) : (_jsx("div", { className: "w-full h-full flex items-center justify-center", children: renderTheme() })) }), isListening && (_jsx("div", { className: "absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20", children: _jsx("div", { className: "bg-white/90 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg", children: _jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: `w-3 h-3 rounded-full ${isTooLoud ? 'bg-red-500 animate-pulse' : 'bg-green-500'}` }), _jsxs("span", { className: "font-semibold text-gray-700", children: [Math.round(noiseLevel), " dB"] }), _jsx("span", { className: "text-gray-400", children: "|" }), _jsx("span", { className: `font-medium ${isTooLoud ? 'text-red-600' : 'text-green-600'}`, children: isTooLoud ? 'Too Loud!' : 'Quiet' })] }) }) }))] }));
}
