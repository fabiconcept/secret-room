'use client';

import useSoundEffect from '@/utils/Hooks/useSoundEffect';
import React from 'react';

export default function SoundTrack() {
    const playSound = useSoundEffect('/audio/sound-track.mp3', { 
        volume: 0.025, 
        preload: true, 
        loop: true,
        autoplay: true
    });
    const playGlitchSound = useSoundEffect('/audio/flickering.mp3', { 
        volume: 0.05, 
        preload: true, 
        maxInterval: 2000,
    });
    const playPressSound = useSoundEffect('/audio/press.mp3', { volume: 0.25, preload: true });

    const togglePlay = () => {
        playPressSound.play();
        if (playSound.isPlaying) {
            playSound.stop();
            playGlitchSound.stop();
        } else {
            playSound.play();
            playGlitchSound.startRandom();
        }
    }

    return (
        <button
            className="fixed bottom-4 right-4 p-4 border border-gray-700 active:scale-90 group cursor-pointer duration-150 bg-black/50 rounded-full hover:bg-black/70 transition-all z-[9999]"
            onClick={togglePlay}
        >
            <span className="sr-only">Toggle Sound</span>
            {/* Sound icon */}
            {!playSound.isPlaying ? (
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