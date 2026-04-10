import { useCallback, useRef, useEffect, useState } from 'react';
import { generateBellSound, generateChimeSound, generateBuzzSound } from '../utils/soundGenerator';
const builtInSounds = [
    { id: 'bell', name: 'School Bell', url: '', isBuiltIn: true },
    { id: 'chime', name: 'Gentle Chime', url: '', isBuiltIn: true },
    { id: 'buzz', name: 'Alert Buzz', url: '', isBuiltIn: true },
];
export function useAudio(selectedSoundId, customSounds, isMuted) {
    const audioRef = useRef(null);
    const currentSoundUrlRef = useRef(null);
    const [generatedUrls, setGeneratedUrls] = useState({});
    // Generate sounds on first use
    useEffect(() => {
        const generateSounds = async () => {
            const urls = {};
            try {
                urls['bell'] = generateBellSound();
                urls['chime'] = generateChimeSound();
                urls['buzz'] = generateBuzzSound();
                setGeneratedUrls(urls);
            }
            catch (e) {
                console.error('Failed to generate sounds:', e);
            }
        };
        generateSounds();
    }, []);
    // Find the selected sound
    const getSelectedSound = useCallback(() => {
        const allSounds = [...builtInSounds, ...customSounds];
        const sound = allSounds.find(s => s.id === selectedSoundId) || builtInSounds[0];
        // Replace empty URL with generated URL for built-in sounds
        if (sound.isBuiltIn && generatedUrls[sound.id]) {
            return { ...sound, url: generatedUrls[sound.id] };
        }
        return sound;
    }, [selectedSoundId, customSounds, generatedUrls]);
    // Play alarm sound
    const playAlarm = useCallback(() => {
        if (isMuted)
            return;
        const sound = getSelectedSound();
        if (!sound)
            return;
        // Create new audio if sound changed or no audio exists
        if (!audioRef.current || currentSoundUrlRef.current !== sound.url) {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
            audioRef.current = new Audio(sound.url);
            audioRef.current.volume = 0.7;
            currentSoundUrlRef.current = sound.url;
        }
        // Reset and play
        const audio = audioRef.current;
        audio.currentTime = 0;
        // Play with error handling
        const playPromise = audio.play();
        if (playPromise !== undefined) {
            playPromise.catch((error) => {
                console.warn('Audio play failed:', error);
            });
        }
    }, [getSelectedSound, isMuted]);
    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
        };
    }, []);
    return { playAlarm };
}
