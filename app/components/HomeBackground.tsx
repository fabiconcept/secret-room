'use client';

import React, { useEffect, useRef } from 'react';

const HomeBackground: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

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
        const fontSize: number = 16;

        // Calculate the number of columns
        const columns: number = Math.floor(canvas.width / fontSize);

        // Initialize the columns
        const matrix: number[] = Array(columns).fill(1);

        // Matrix animation
        function drawMatrix(): void {
            context.fillStyle = "rgba(0, 0, 0, 0.05)";
            context.fillRect(0, 0, canvas.width, canvas.height);
            context.fillStyle = "#aaa"; // Change to matrix green
            context.font = `${fontSize}px monospace`;

            for (let i = 0; i < matrix.length; i++) {
                const randomIndex: number = Math.floor(Math.random() * charactersArray.length);
                const text: string = charactersArray[randomIndex];

                // Add varying opacity for more depth
                const opacity = Math.random() * 0.5 + 0.5;
                context.fillStyle = `rgba(10, 255, 10, ${opacity})`;

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
    }, []);

    return (
        <div className='absolute top-0 left-0 flex items-center justify-center w-screen h-screen opacity-5'>
            <canvas
                ref={canvasRef}
                className="h-full w-full"
                style={{ zIndex: -1 }}
            />
        </div>
    );
};

export default HomeBackground;