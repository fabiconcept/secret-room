'use client';

import React, { useEffect, useRef } from 'react';
import { useAppStore } from '@/store/useAppStore';
import useSettingStore from '@/store/useSettingStore';
import clsx from 'clsx';

const HomeBackground: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const { homeBackgroundFontSize, homeTextColor } = useAppStore();
    const { backgroundMatrix } = useSettingStore();

    useEffect(() => {
        const canvas = canvasRef.current!;
        if (!canvas) return;

        const context = canvas.getContext('2d')!;
        if (!context) return;

        // Set canvas dimensions to match window
        const setCanvasDimensions = (): void => {
            if (canvas) {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
            }
        };

        setCanvasDimensions();
        window.addEventListener('resize', setCanvasDimensions);

        // Matrix characters
        const characters: string = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        const charactersArray: string[] = characters.split("");

        // Matrix configuration
        const fontSize: number = homeBackgroundFontSize;

        // Calculate the number of columns
        const columns: number = Math.floor(canvas.width / fontSize);

        // Initialize the columns
        const matrix: number[] = Array(columns).fill(1);

        // Matrix animation
        function drawMatrix(): void {
            context.fillStyle = "rgba(0, 0, 0, 0.05)";
            context.fillRect(0, 0, canvas.width, canvas.height);
            context.fillStyle = homeTextColor; // Change to matrix green
            context.font = `${homeBackgroundFontSize}px monospace`;

            for (let i = 0; i < matrix.length; i++) {
                const randomIndex: number = Math.floor(Math.random() * charactersArray.length);
                const text: string = charactersArray[randomIndex];

                // Add varying opacity for more depth
                const opacity = Math.random() * 0.5 + 0.5;
                context.fillStyle = `rgba(${backgroundMatrix.color}, ${opacity})`;

                context.fillText(text, i * fontSize, matrix[i] * fontSize);

                if (matrix[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    matrix[i] = 0;
                }
                matrix[i]++;
            }
        }

        // Render loop
        let animationFrame: number;
        function animateMatrix(): void {
            drawMatrix();
            animationFrame = requestAnimationFrame(animateMatrix);
        }

        // Start the animation
        animateMatrix();

        // Clean up
        return () => {
            window.removeEventListener('resize', setCanvasDimensions);
            if (animationFrame) {
                cancelAnimationFrame(animationFrame);
            }
        };
    }, [homeBackgroundFontSize, homeTextColor, backgroundMatrix.color]);

    return (
        <div
            className={clsx(
                'absolute top-0 left-0 flex items-center justify-center w-screen h-screen opacity-5',
                backgroundMatrix.opacity === 0 && 'opacity-0',
                backgroundMatrix.opacity === 0.01 && 'opacity-1',
                backgroundMatrix.opacity === 0.02 && 'opacity-2',
                backgroundMatrix.opacity === 0.03 && 'opacity-3',
                backgroundMatrix.opacity === 0.04 && 'opacity-4',
                backgroundMatrix.opacity === 0.05 && 'opacity-5',
                backgroundMatrix.opacity === 0.06 && 'opacity-6',
                backgroundMatrix.opacity === 0.07 && 'opacity-7',
                backgroundMatrix.opacity === 0.08 && 'opacity-8',
                backgroundMatrix.opacity === 0.09 && 'opacity-9',
                backgroundMatrix.opacity === 0.1 && 'opacity-10',
                backgroundMatrix.opacity === 0.11 && 'opacity-11',
                backgroundMatrix.opacity === 0.12 && 'opacity-12',
                backgroundMatrix.opacity === 0.13 && 'opacity-13',
                backgroundMatrix.opacity === 0.14 && 'opacity-14',
                backgroundMatrix.opacity === 0.15 && 'opacity-15',
                backgroundMatrix.opacity === 0.16 && 'opacity-16',
                backgroundMatrix.opacity === 0.17 && 'opacity-17',
                backgroundMatrix.opacity === 0.18 && 'opacity-18',
                backgroundMatrix.opacity === 0.19 && 'opacity-19',
                backgroundMatrix.opacity === 0.2 && 'opacity-20',
                backgroundMatrix.opacity === 0.21 && 'opacity-21',
                backgroundMatrix.opacity === 0.22 && 'opacity-22',
                backgroundMatrix.opacity === 0.23 && 'opacity-23',
                backgroundMatrix.opacity === 0.24 && 'opacity-24',
                backgroundMatrix.opacity === 0.25 && 'opacity-25',
                backgroundMatrix.opacity === 0.26 && 'opacity-26',
                backgroundMatrix.opacity === 0.27 && 'opacity-27',
                backgroundMatrix.opacity === 0.28 && 'opacity-28',
                backgroundMatrix.opacity === 0.29 && 'opacity-29',
                backgroundMatrix.opacity === 0.3 && 'opacity-30',
                backgroundMatrix.opacity === 0.31 && 'opacity-31',
                backgroundMatrix.opacity === 0.32 && 'opacity-32',
                backgroundMatrix.opacity === 0.33 && 'opacity-33',
                backgroundMatrix.opacity === 0.34 && 'opacity-34',
                backgroundMatrix.opacity === 0.35 && 'opacity-35',
                backgroundMatrix.opacity === 0.36 && 'opacity-36',
                backgroundMatrix.opacity === 0.37 && 'opacity-37',
                backgroundMatrix.opacity === 0.38 && 'opacity-38',
                backgroundMatrix.opacity === 0.39 && 'opacity-39',
                backgroundMatrix.opacity === 0.4 && 'opacity-40',
                backgroundMatrix.opacity === 0.41 && 'opacity-41',
                backgroundMatrix.opacity === 0.42 && 'opacity-42',
                backgroundMatrix.opacity === 0.43 && 'opacity-43',
                backgroundMatrix.opacity === 0.44 && 'opacity-44',
                backgroundMatrix.opacity === 0.45 && 'opacity-45',
                backgroundMatrix.opacity === 0.46 && 'opacity-46',
                backgroundMatrix.opacity === 0.47 && 'opacity-47',
                backgroundMatrix.opacity === 0.48 && 'opacity-48',
                backgroundMatrix.opacity === 0.49 && 'opacity-49',
                backgroundMatrix.opacity === 0.5 && 'opacity-50',
                backgroundMatrix.opacity === 0.51 && 'opacity-51',
                backgroundMatrix.opacity === 0.52 && 'opacity-52',
                backgroundMatrix.opacity === 0.53 && 'opacity-53',
                backgroundMatrix.opacity === 0.54 && 'opacity-54',
                backgroundMatrix.opacity === 0.55 && 'opacity-55',
                backgroundMatrix.opacity === 0.56 && 'opacity-56',
                backgroundMatrix.opacity === 0.57 && 'opacity-57',
                backgroundMatrix.opacity === 0.58 && 'opacity-58',
                backgroundMatrix.opacity === 0.59 && 'opacity-59',
                backgroundMatrix.opacity === 0.6 && 'opacity-60',
                backgroundMatrix.opacity === 0.61 && 'opacity-61',
                backgroundMatrix.opacity === 0.62 && 'opacity-62',
                backgroundMatrix.opacity === 0.63 && 'opacity-63',
                backgroundMatrix.opacity === 0.64 && 'opacity-64',
                backgroundMatrix.opacity === 0.65 && 'opacity-65',
                backgroundMatrix.opacity === 0.66 && 'opacity-66',
                backgroundMatrix.opacity === 0.67 && 'opacity-67',
                backgroundMatrix.opacity === 0.68 && 'opacity-68',
                backgroundMatrix.opacity === 0.69 && 'opacity-69',
                backgroundMatrix.opacity === 0.7 && 'opacity-70',
                backgroundMatrix.opacity === 0.71 && 'opacity-71',
                backgroundMatrix.opacity === 0.72 && 'opacity-72',
                backgroundMatrix.opacity === 0.73 && 'opacity-73',
                backgroundMatrix.opacity === 0.74 && 'opacity-74',
                backgroundMatrix.opacity === 0.75 && 'opacity-75',
                backgroundMatrix.opacity === 0.76 && 'opacity-76',
                backgroundMatrix.opacity === 0.77 && 'opacity-77',
                backgroundMatrix.opacity === 0.78 && 'opacity-78',
                backgroundMatrix.opacity === 0.79 && 'opacity-79',
                backgroundMatrix.opacity === 0.8 && 'opacity-80',
                backgroundMatrix.opacity === 0.81 && 'opacity-81',
                backgroundMatrix.opacity === 0.82 && 'opacity-82',
                backgroundMatrix.opacity === 0.83 && 'opacity-83',
                backgroundMatrix.opacity === 0.84 && 'opacity-84',
                backgroundMatrix.opacity === 0.85 && 'opacity-85',
                backgroundMatrix.opacity === 0.86 && 'opacity-86',
                backgroundMatrix.opacity === 0.87 && 'opacity-87',
                backgroundMatrix.opacity === 0.88 && 'opacity-88',
                backgroundMatrix.opacity === 0.89 && 'opacity-89',
                backgroundMatrix.opacity === 0.9 && 'opacity-90',
                backgroundMatrix.opacity === 0.91 && 'opacity-91',
                backgroundMatrix.opacity === 0.92 && 'opacity-92',
                backgroundMatrix.opacity === 0.93 && 'opacity-93',
                backgroundMatrix.opacity === 0.94 && 'opacity-94',
                backgroundMatrix.opacity === 0.95 && 'opacity-95',
                backgroundMatrix.opacity === 0.96 && 'opacity-96',
                backgroundMatrix.opacity === 0.97 && 'opacity-97',
                backgroundMatrix.opacity === 0.98 && 'opacity-98',
                backgroundMatrix.opacity === 0.99 && 'opacity-99',
                backgroundMatrix.opacity === 1 && 'opacity-100',
            )}
        >
            <canvas
                ref={canvasRef}
                className="h-full w-full"
                style={{ zIndex: -1 }}
            />
        </div>
    );
};

export default HomeBackground;