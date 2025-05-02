"use client";

import { useEffect } from 'react';
import useSettingStore from '@/store/useSettingStore';

export const useGlitchEffect = () => {
    const { glitchEffect } = useSettingStore();

    useEffect(() => {
        // Get all elements with either glitch or glitch-less class
        const glitchElements = document.querySelectorAll('.glitch, .glitch-less');

        glitchElements.forEach(element => {
            if (glitchEffect) {
                element.classList.remove('glitch-less');
                element.classList.add('glitch');
            } else {
                element.classList.remove('glitch');
                element.classList.add('glitch-less');
            }
        });
    }, [glitchEffect]);
};
