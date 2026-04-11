import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface TypingEffectProps {
    text: string;
    className?: string;
    delay?: number;
}

const TypingEffect = ({ text, className = '', delay = 0 }: TypingEffectProps) => {
    const [displayedText, setDisplayedText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showCursor, setShowCursor] = useState(true);

    useEffect(() => {
        const startTimer = setTimeout(() => {
            if (currentIndex < text.length) {
                // AI-like typing speed - faster and more consistent
                const baseSpeed = 5;
                const variability = Math.random() * 4 - 2; // ±2ms variation
                const typingSpeed = Math.max(2, baseSpeed + variability);

                // Slight pause after punctuation for natural rhythm
                const currentChar = text[currentIndex];
                const pauseAfterPunctuation = ['.', '!', '?', ','].includes(currentChar) ? 15 : 0;

                const timer = setTimeout(() => {
                    setDisplayedText(text.slice(0, currentIndex + 1));
                    setCurrentIndex(currentIndex + 1);
                }, typingSpeed + pauseAfterPunctuation);

                return () => clearTimeout(timer);
            }
        }, delay);

        return () => clearTimeout(startTimer);
    }, [currentIndex, text, delay]);

    useEffect(() => {
        const cursorTimer = setInterval(() => {
            setShowCursor(prev => !prev);
        }, 500);

        return () => clearInterval(cursorTimer);
    }, []);

    return (
        <motion.div className={className}>
            {displayedText}
            {showCursor && currentIndex <= text.length && (
                <span className="text-green-400">▋</span>
            )}
        </motion.div>
    );
};

export default TypingEffect;
