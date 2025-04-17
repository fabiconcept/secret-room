"use client";

import "@/app/styles/button.css"
import useSoundEffect from "@/utils/Hooks/useSoundEffect";
import React from 'react'

export default function Button({ text, onClick }: { text: string, onClick: () => void }) {
    const playSwingSound = useSoundEffect('/audio/swing.mp3', { volume: 0.5, preload: true });

    return (
        <button onClick={()=>{
            onClick()
            playSwingSound.play();
        }} data-text={text} className="glitch-button w-full cursor-pointer active:scale-[0.98] active:rotate-1 origin-bottom-left">{text}</button>
    )
}
