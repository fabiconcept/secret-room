'use client';

import useSoundEffect from '@/utils/Hooks/useSoundEffect';
import React, { useEffect } from 'react';
import useSettingStore from '@/store/useSettingStore';
import { useAppStore } from '@/store/useAppStore';
import clsx from 'clsx';
import { FaGear } from 'react-icons/fa6';
import SettingsForm from './SettingsForm';

export default function UiSettings() {
    const settings = useSettingStore();
    const { uiSettings, setUiSettings } = useAppStore();


    const { soundEffect, glitchSound } = settings;

    useEffect(() => {
        settings.initialize();
    }, []);

    const playSound = useSoundEffect('/audio/sound-track.mp3', { 
        volume: soundEffect.volume, 
        preload: true, 
        loop: true,
        autoplay: true
    });

    const playGlitchSound = useSoundEffect('/audio/flickering.mp3', { 
        volume: glitchSound.volume, 
        preload: true, 
        maxInterval: 2000,
        autoplay: true
    });

    useEffect(() => {
        playGlitchSound.adjustVolume(glitchSound.volume);
    }, [glitchSound]);

    useEffect(() => {
        playSound.adjustVolume(soundEffect.volume);
    }, [soundEffect]);

    return (
        <div className={clsx(
            'fixed top-1/2 -translate-y-1/2 right-0 h-[calc(100dvh-50px)] z-[500000]',
            uiSettings ? 'translate-x-0' : 'translate-x-full'
        )}>
            <div 
                
                className='absolute top-1/2 group transform -left-[50px] active:translate-x-2 active:-rotate-3 w-fit -translate-y-1/2 h-fit cursor-pointer origin-right'
                onClick={() => setUiSettings(!uiSettings)}
            >
                <FaGear className={clsx('text-2xl drop-shadow-lg animate-spin z-20 relative', uiSettings ? 'text-green-400' : 'group-hover:text-green-400')}/>
                <div className={clsx('w-10 h-[1px] absolute drop-shadow-lg top-1/2 -translate-y-1/2 -right-8', uiSettings ? 'bg-green-400/20' : 'group-hover:bg-green-400 bg-white')}></div>
            </div>
            <SettingsForm />
        </div>
    );
}