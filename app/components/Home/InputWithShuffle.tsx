'use client';

import useSettingStore from '@/store/useSettingStore';
import useSoundEffect from '@/utils/Hooks/useSoundEffect';
import React, { useEffect } from 'react';
import { FaShuffle } from 'react-icons/fa6';

interface InputWithShuffleProps {
    id: string;
    label: string;
    value: string;
    onChange: (value: string) => void;
    onShuffle: () => void;
    placeholder?: string;
    className?: string;
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    hint?: React.ReactNode;
    disabled?: boolean;
}

export const InputWithShuffle: React.FC<InputWithShuffleProps> = ({
    id,
    label,
    value,
    onChange,
    onShuffle,
    placeholder,
    className = '',
    onKeyDown,
    disabled,
    hint
}) => {
    const { buttonSound, typingSound } = useSettingStore();
    const playSwingSound = useSoundEffect('/audio/press.mp3', { volume: buttonSound.isMuted ? 0 : buttonSound.volume, preload: true });
    const playClickSound = useSoundEffect('/audio/click.mp3', { volume: typingSound.isMuted ? 0 : typingSound.volume, preload: true });

    useEffect(() => {
        playSwingSound.adjustVolume(buttonSound.isMuted ? 0 : buttonSound.volume);
    }, [buttonSound]);

    useEffect(() => {
        playClickSound.adjustVolume(typingSound.isMuted ? 0 : typingSound.volume);
    }, [typingSound]);


    return (
        <div className="relative">
            <label className='text-sm text-gray-300' htmlFor={id}>{label} <span data-text={'*'} className='text-red-500 glitch'>*</span></label>
            <div className="flex gap-2">
                <input
                    type="text"
                    id={id}
                    name={id}
                    value={value}
                    onChange={(e) => {
                        onChange(e.target.value)
                        playClickSound.play();
                    }}
                    onKeyDown={onKeyDown}
                    placeholder={placeholder}
                    disabled={disabled}
                    className={`w-full bg-[#2b2b2b] mt-2 text-gray-200 p-3 rounded-lg border border-gray-700 focus:border-gray-500 focus:outline-none transition-colors ${className}`}
                />
                <button
                    onClick={()=>{
                        playSwingSound.play();
                        onShuffle()
                    }}
                    title={`Generate a new ${label.toLowerCase()}`}
                    className="mt-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-gray-200 rounded-lg cursor-pointer active:scale-95 group"
                >
                    <FaShuffle className='group-active:rotate-12' />
                </button>
            </div>
            {hint && <p className="mt-2 text-xs text-gray-500">{hint}</p>}
        </div>
    );
};
