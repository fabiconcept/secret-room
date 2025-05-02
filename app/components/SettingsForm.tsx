'use client';

import { soundControl as SoundControl } from '@/types/useSettingStore.interface';
import useSoundEffect from '@/utils/Hooks/useSoundEffect';
import React, { useState } from 'react';
import { FaVolumeHigh, FaVolumeXmark } from 'react-icons/fa6';
import useSettingStore from '@/store/useSettingStore';
import { useClickAway } from "react-use";
import { useRef } from "react";
import { useAppStore } from '@/store/useAppStore';
import { rgbToHex } from '@/utils';

const hexToRgb = (hex: string) => {
    // Remove the hash if present
    hex = hex.replace('#', '');
    
    // Convert to RGB values
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    
    return `${r}, ${g}, ${b}`;
};



export default function SettingsForm(): React.JSX.Element {
    const [activeTab, setActiveTab] = useState<'sound' | 'visual'>('sound');
    const settings = useSettingStore();
    const { setUiSettings } = useAppStore();

    const playPressSound = useSoundEffect('/audio/press.mp3', { volume: 0.5, preload: true });

    const containerRef = useRef<HTMLDivElement>(null);

    useClickAway(containerRef, () => setUiSettings(false));

    const changeTab = (tab: 'sound' | 'visual') => {
        setActiveTab(tab);
        playPressSound.play();
    };

    

    return (
        <div
            className="max-w-[400px] w-[calc(100dvw-7rem)] min-w-[300px] h-full bg-background/40 backdrop-blur-lg relative z-10 shadow-2xl border border-r-transparent border-green-400/20 rounded-3xl rounded-r-none overflow-hidden p-5 overflow-y-auto"
            ref={containerRef}
        >
            {/* Tabs */}
            <div className="flex space-x-2 mb-4 mt-5">
                {['sound', 'visual'].map(tab => (
                    <button
                        key={tab}
                        onClick={() => changeTab(tab as 'sound' | 'visual')}
                        className={`px-4 py-2 text-sm rounded-md border transition
                            ${activeTab === tab
                                ? 'bg-gray-900 text-white border-gray-900'
                                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'}
                        `}
                    >
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            {activeTab === 'sound' && (
                <div className="space-y-4 px-2 mt-3">
                    {Object.entries(settings)
                        .filter(([uselessKey, val]) => typeof val === 'object' && 'volume' in val && uselessKey !== "flippingHellMan!!!")
                        .map(([key, control]) => {
                            const soundControl = control as SoundControl;
                            return (
                                <div key={key} className="flex items-center justify-between">
                                    <span className="capitalize text-gray-200 text-sm" >{key}</span>
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => settings.toggleMute(key as "buttonSound" | "crankSound" | "typingSound" | "messageSound" | "soundEffect" | "otherUISound" | "glitchSound")}
                                            className="text-gray-400 hover:text-white cursor-pointer"
                                        >
                                            {soundControl.isMuted ? <FaVolumeXmark className="text-red-500" /> : <FaVolumeHigh />}
                                        </button>
                                        <input
                                            type="range"
                                            min={0}
                                            max={1}
                                            disabled={soundControl.isMuted}
                                            step={0.01}
                                            value={soundControl.isMuted ? 0 : soundControl.volume}
                                            onChange={e => settings.updateVolume(key as "buttonSound" | "crankSound" | "typingSound" | "messageSound" | "soundEffect" | "otherUISound" | "glitchSound", parseFloat(e.target.value))}
                                            className="w-28 accent-white/40 disabled:cursor-not-allowed cursor-pointer"
                                        />
                                    </div>
                                </div>
                            );
                        })}
                </div>
            )}

            {activeTab === 'visual' && (
                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-200">Glitch Effect</span>
                        <input
                            type="checkbox"
                            checked={settings.glitchEffect}
                            onChange={() => settings.setGlitchEffect(!settings.glitchEffect)}
                            className="accent-gray-800"
                        />
                    </div>
                    <div>
                        <label className="text-sm text-gray-200 block mb-1">Matrix Color {settings.backgroundMatrix.color}</label>
                        <input
                            type="color"
                            value={rgbToHex(settings.backgroundMatrix.color)}
                            onChange={e => settings.updateBackgroundMatrix(hexToRgb(e.target.value))}
                            className="w-20 h-10 border rounded"
                        />
                    </div>
                    <div>
                        <label className="text-sm text-gray-200 block mb-1">Opacity</label>
                        <input
                            type="range"
                            min={0}
                            max={1}
                            step={0.01}
                            value={settings.backgroundMatrix.opacity}
                            onChange={e => settings.updateBackgroundMatrix(undefined, parseFloat(e.target.value))}
                            className="w-full accent-white/40"
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
