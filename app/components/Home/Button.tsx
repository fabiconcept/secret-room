"use client";

import "@/app/styles/button.css"
import useSoundEffect from "@/utils/Hooks/useSoundEffect";
import React, { useEffect } from 'react'
import useSettingStore from '@/store/useSettingStore';

export default function Button({ text, onClick }: { text: string, onClick: () => void }) {
    const { buttonSound } = useSettingStore();
    const playSwingSound = useSoundEffect('/audio/press.mp3', { volume: buttonSound.isMuted ? 0 : buttonSound.volume, preload: true });

    useEffect(() => {
        playSwingSound.adjustVolume(buttonSound.isMuted ? 0 : buttonSound.volume);
    }, [buttonSound]);

    return (
        <button onClick={()=>{
            onClick()
            playSwingSound.play();
        }} data-text={text} className="glitch-button w-full cursor-pointer active:scale-[0.98] active:rotate-1 origin-bottom-left">{text}</button>
    )
}
