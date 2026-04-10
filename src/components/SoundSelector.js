import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
const builtInSounds = [
    { id: 'bell', name: 'School Bell', url: '/sounds/bell.mp3', isBuiltIn: true },
    { id: 'chime', name: 'Gentle Chime', url: '/sounds/chime.mp3', isBuiltIn: true },
    { id: 'buzz', name: 'Alert Buzz', url: '/sounds/buzz.mp3', isBuiltIn: true },
];
export function SoundSelector({ selectedSound, customSounds, onSoundChange }) {
    const [playingSound, setPlayingSound] = useState(null);
    const allSounds = [...builtInSounds, ...customSounds];
    const playPreview = (sound) => {
        if (playingSound === sound.id) {
            setPlayingSound(null);
            return;
        }
        const audio = new Audio(sound.url);
        audio.volume = 0.5;
        audio.play().catch(() => {
            // Ignore autoplay errors
        });
        setPlayingSound(sound.id);
        audio.onended = () => {
            setPlayingSound(null);
        };
    };
    return (_jsxs("div", { className: "space-y-4", children: [_jsx("h3", { className: "text-lg font-semibold text-gray-800", children: "Alarm Sound" }), _jsx("div", { className: "space-y-2", children: allSounds.map((sound) => (_jsxs("div", { className: `flex items-center gap-3 p-3 rounded-lg border-2 transition-all ${selectedSound === sound.id
                        ? 'border-tisa-purple bg-tisa-purple/5'
                        : 'border-gray-200 hover:border-gray-300'}`, children: [_jsxs("button", { onClick: () => onSoundChange(sound.id), className: "flex-1 flex items-center gap-3 text-left", children: [_jsx("div", { className: `w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedSound === sound.id ? 'border-tisa-purple' : 'border-gray-300'}`, children: selectedSound === sound.id && (_jsx("div", { className: "w-3 h-3 rounded-full bg-tisa-purple" })) }), _jsxs("div", { className: "flex-1", children: [_jsx("p", { className: "font-medium text-gray-800", children: sound.name }), !sound.isBuiltIn && (_jsx("p", { className: "text-xs text-gray-500", children: "Custom" }))] })] }), _jsx("button", { onClick: () => playPreview(sound), className: "p-2 hover:bg-gray-100 rounded-full transition-colors", title: "Preview", children: playingSound === sound.id ? (_jsxs("svg", { className: "w-5 h-5 text-tisa-purple", fill: "currentColor", viewBox: "0 0 24 24", children: [_jsx("rect", { x: "6", y: "4", width: "4", height: "16" }), _jsx("rect", { x: "14", y: "4", width: "4", height: "16" })] })) : (_jsx("svg", { className: "w-5 h-5 text-gray-600", fill: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { d: "M8 5v14l11-7z" }) })) })] }, sound.id))) })] }));
}
