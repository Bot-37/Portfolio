
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
                // Human-like typing speed with variability (20-40ms instead of 50ms)
                const baseSpeed = 25;
                const variability = Math.random() * 20 - 10; // ±10ms variation
                const typingSpeed = Math.max(15, baseSpeed + variability);

                const timer = setTimeout(() => {
                    setDisplayedText(text.slice(0, currentIndex + 1));
                    setCurrentIndex(currentIndex + 1);
                }, typingSpeed);
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
