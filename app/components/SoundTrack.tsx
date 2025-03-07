'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';

export default function SoundTrack() {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const hasInteractedRef = useRef(false);

    const togglePlay = useCallback(async () => {
        if (!audioRef.current) return;

        try {
            if (audioRef.current.paused) {
                await audioRef.current.play();
            } else {
                audioRef.current.pause();
            }
        } catch (err) {
            console.error('Audio playback error:', err);
        }
    }, []);

    useEffect(() => {
        // Create and configure audio element
        const audio = new Audio('/audio/sound-track.mp3');
        audio.loop = true;
        audio.volume = 0.05;
        audioRef.current = audio;

        // Add event listeners to sync state
        audio.addEventListener('play', () => setIsPlaying(true));
        audio.addEventListener('pause', () => setIsPlaying(false));

        // Function to handle any user interaction
        const handleInteraction = async () => {
            if (!hasInteractedRef.current && audioRef.current?.paused) {
                hasInteractedRef.current = true;
                try {
                    await audioRef.current.play();
                } catch (err) {
                    console.error('Audio playback error:', err);
                }
            }
        };

        // Listen for common interaction events
        const events = ['click', 'touchstart', 'keydown', 'scroll', 'mousemove'];
        events.forEach(event => {
            document.addEventListener(event, handleInteraction, { once: true });
        });

        // Cleanup
        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.removeEventListener('play', () => setIsPlaying(true));
                audioRef.current.removeEventListener('pause', () => setIsPlaying(false));
                audioRef.current = null;
            }
            events.forEach(event => {
                document.removeEventListener(event, handleInteraction);
            });
        };
    }, []);

    return (
        <button
            className="fixed bottom-4 right-4 p-4 border border-gray-700 active:scale-90 group cursor-pointer duration-150 bg-black/50 rounded-full hover:bg-black/70 transition-all z-[9999]"
            onClick={togglePlay}
        >
            <span className="sr-only">Toggle Sound</span>
            {/* Sound icon */}
            {!isPlaying ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 group-active:rotate-12 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                </svg>
            ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 group-active:rotate-12 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                </svg>
            )}
        </button>
    );
}