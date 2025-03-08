'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { FaSkull } from 'react-icons/fa6';

interface LifespanSliderProps {
    value: number;
    onChange: (value: number) => void;
}

// Fixed checkpoints in minutes
const CHECKPOINTS = [
    { value: 60, label: '1h', color: 'rgb(132 204 22)' },
    { value: 180, label: '3h', color: 'rgb(234 179 8)' },
    { value: 360, label: '6h', color: 'rgb(249 115 22)' },
    { value: 720, label: '12h', color: 'rgb(239 68 68)' },
    { value: 1440, label: '24h', color: 'rgb(185 28 28)' }
];

export const LifespanSlider: React.FC<LifespanSliderProps> = ({
    value,
    onChange
}) => {
    const [isDragging, setIsDragging] = useState(false);

    // Find the closest checkpoint to the current value
    const findClosestCheckpoint = useCallback((val: number) => {
        return CHECKPOINTS.reduce((prev, curr) => {
            return Math.abs(curr.value - val) < Math.abs(prev.value - val) ? curr : prev;
        });
    }, []);

    // Convert value to percentage for slider position
    const valueToPercent = useCallback((val: number) => {
        const min = CHECKPOINTS[0].value;
        const max = CHECKPOINTS[CHECKPOINTS.length - 1].value;
        return ((val - min) / (max - min)) * 100;
    }, []);

    // Convert percentage to nearest checkpoint value
    const percentToValue = useCallback((percent: number) => {
        const min = CHECKPOINTS[0].value;
        const max = CHECKPOINTS[CHECKPOINTS.length - 1].value;
        const value = min + ((max - min) * percent) / 100;
        return findClosestCheckpoint(value).value;
    }, [findClosestCheckpoint]);

    const handleSliderClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const percent = ((e.clientX - rect.left) / rect.width) * 100;
        onChange(percentToValue(Math.max(0, Math.min(100, percent))));
    }, [onChange, percentToValue]);

    const handleMouseMove = useCallback((e: MouseEvent) => {
        if (!isDragging) return;
        const slider = document.getElementById('lifespan-slider');
        if (!slider) return;

        const rect = slider.getBoundingClientRect();
        const percent = ((e.clientX - rect.left) / rect.width) * 100;
        onChange(percentToValue(Math.max(0, Math.min(100, percent))));
    }, [isDragging, onChange, percentToValue]);

    const handleMouseUp = useCallback(() => {
        setIsDragging(false);
    }, []);

    useEffect(() => {
        if (isDragging) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
        }
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging, handleMouseMove, handleMouseUp]);

    const currentPercent = valueToPercent(value);
    const currentCheckpoint = findClosestCheckpoint(value);

    // Convert minutes to a more readable format
    const formatTime = (minutes: number) => {
        if (minutes < 60) return `${minutes} minutes`;
        const hours = Math.floor(minutes / 60);
        return `${hours} hour${hours > 1 ? 's' : ''}`;
    };

    return (
        <div className="relative mt-8 pb-12">
            <label className='text-sm text-gray-300 flex items-center gap-2'>
                Server Lifespan <span data-text={'*'} className='text-red-500 glitch'>*</span>
                <FaSkull className="text-gray-500" />
            </label>

            <div
                id="lifespan-slider"
                className="mt-5 h-2 bg-gray-700 rounded-full relative cursor-pointer"
                onClick={handleSliderClick}
                onMouseDown={() => setIsDragging(true)}
            >
                {/* Track fill gradient */}
                <div
                    className="absolute h-full rounded-full opacity-20"
                    style={{
                        width: `${currentPercent}%`,
                        background: `linear-gradient(to right, ${CHECKPOINTS[0].color}, ${currentCheckpoint.color})`
                    }}
                />

                {/* Checkpoints */}
                {CHECKPOINTS.map((checkpoint) => {
                    const percent = valueToPercent(checkpoint.value);
                    const isActive = checkpoint.value <= value;
                    return (
                        <div
                            key={checkpoint.value}
                            className="absolute top-1/2 -translate-y-1/2"
                            style={{ left: `${percent}%` }}
                        >
                            <div
                                className={`h-3 w-1 rounded-full transition-colors duration-300`}
                                style={{ backgroundColor: checkpoint.color }}
                            />
                            <div
                                className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs font-medium whitespace-nowrap transition-colors duration-300"
                                style={{ color: isActive ? checkpoint.color : 'rgb(107 114 128)' }}
                            >
                                {checkpoint.label}
                            </div>
                        </div>
                    );
                })}

                {/* Slider thumb */}
                <div
                    className={`absolute top-1/2 -translate-y-1/2 -translate-x-1/2 h-4 w-4 rounded-full cursor-grab 
                        ${isDragging ? 'cursor-grabbing scale-110' : 'hover:scale-110'} 
                        transition-all duration-300 shadow-lg`}
                    style={{
                        left: `${currentPercent}%`,
                        backgroundColor: currentCheckpoint.color,
                        boxShadow: `0 0 10px ${currentCheckpoint.color}40`
                    }}
                />
            </div>

            <p className="mt-14 text-xs font-medium" style={{ color: currentCheckpoint.color }}>
                This server will self-destruct in {formatTime(value)}
            </p>
        </div>
    );
};
