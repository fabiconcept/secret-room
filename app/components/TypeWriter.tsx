'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

interface TypeWriterProps {
    text: string;
    className?: string;
    speed?: number;
    onComplete?: () => void;
}

export default function TypeWriter({ text, className = '', speed = 50, onComplete }: TypeWriterProps) {
    const router = useRouter();
    const [displayText, setDisplayText] = useState('');
    const [currentLine, setCurrentLine] = useState(0);
    const [isTyping, setIsTyping] = useState(true);

    useEffect(() => {
        const lines = text.split('\n');
        if (currentLine >= lines.length) {
            setIsTyping(false);
            onComplete?.();
            return;
        }

        let currentText = displayText;
        const currentLineText = lines[currentLine];
        let currentChar = currentText.split('\n')[currentLine]?.length || 0;

        if (currentChar >= currentLineText.length) {
            // Move to next line after a pause
            const timeout = setTimeout(() => {
                setDisplayText(current => current + '\n');
                setCurrentLine(line => line + 1);
            }, speed * 3);
            return () => clearTimeout(timeout);
        }

        const timeout = setTimeout(() => {
            if (currentChar === 0) {
                setDisplayText(current => current + currentLineText[currentChar]);
            } else {
                setDisplayText(current => current + currentLineText[currentChar]);
            }
        }, speed);

        return () => clearTimeout(timeout);
    }, [displayText, currentLine, text, speed, onComplete]);

    useEffect(() => {
        if (isTyping) return;

        const redirectToSafety = setTimeout(() => {
            toast.custom("Redirecting to safety...");
            router.replace("/");
        }, 5000);

        return () => clearTimeout(redirectToSafety);
    }, [isTyping]);


    return (
        <pre data-text={displayText} className={`font-mono whitespace-pre-wrap ${className}`}>
            {displayText}
            {isTyping && <span className="animate-blink">|</span>}
        </pre>
    );
}
