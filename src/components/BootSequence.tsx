
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface BootSequenceProps {
    onComplete: () => void;
}

const BootSequence = ({ onComplete }: BootSequenceProps) => {
    const [currentLine, setCurrentLine] = useState(0);

    const bootLines = [
        "INITIALIZING ELIAS AI SYSTEM...",
        "LOADING CORE MODULES... [████████████] 100%",
        "ACCESSING PORTFOLIO KERNEL...",
        "ESTABLISHING SECURE CONNECTION...",
        "MOUNTING FILESYSTEM... /home/fahad/",
        "STARTING HOLOGRAPHIC INTERFACE...",
        "AUTHENTICATION SUCCESSFUL",
        "WELCOME TO ELIAS PORTFOLIO OS",
        "SYSTEM READY."
    ];

    useEffect(() => {
        if (currentLine < bootLines.length) {
            const timer = setTimeout(() => {
                setCurrentLine(currentLine + 1);
            }, 500);
            return () => clearTimeout(timer);
        } else {
            const completeTimer = setTimeout(onComplete, 1000);
            return () => clearTimeout(completeTimer);
        }
    }, [currentLine, bootLines.length, onComplete]);

    return (
        <motion.div
        className="flex items-center justify-center min-h-screen bg-black"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        >
        <div className="relative">
        {/* Animated background grid */}
        <div className="absolute inset-0 opacity-20">
        <div className="grid-bg"></div>
        </div>

        <div className="relative z-10 p-8 max-w-2xl">
        <motion.div
        className="text-center mb-8"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        >
        <div className="text-4xl font-mono text-green-400 mb-4 glow-text">
        ELIAS OS
        </div>
        <div className="w-32 h-1 bg-gradient-to-r from-green-400 to-blue-400 mx-auto rounded"></div>
        </motion.div>

        <div className="terminal-window bg-black/80 backdrop-blur-sm border border-green-400/30 rounded-lg p-6">
        <div className="flex items-center mb-4 gap-2">
        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
        <span className="text-green-400 text-sm ml-4 font-mono">Terminal</span>
        </div>

        <div className="space-y-2 font-mono text-sm">
        {bootLines.slice(0, currentLine).map((line, index) => (
            <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="text-green-400"
            >
            <span className="text-blue-400">root@elias:~$</span> {line}
            </motion.div>
        ))}

        {currentLine < bootLines.length && (
            <motion.div
            className="text-green-400 flex items-center"
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 0.8, repeat: Infinity }}
            >
            <span className="text-blue-400">root@elias:~$</span>
            <span className="ml-2">▋</span>
            </motion.div>
        )}
        </div>
        </div>
        </div>
        </div>
        </motion.div>
    );
};

export default BootSequence;
