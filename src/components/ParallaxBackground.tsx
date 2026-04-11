
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const ParallaxBackground = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
            {/* Hex Grid Background - Deepest Layer */}
            <div className="absolute inset-0 opacity-10" style={{ transform: `translate(${mousePosition.x * -0.01}px, ${mousePosition.y * -0.01}px)` }}>
                <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id="hexGrid" width="60" height="52" patternUnits="userSpaceOnUse">
                            <path d="M0 26L15 0h30l15 26l-15 26H15z" fill="none" stroke="currentColor" strokeWidth="1" className="theme-grid-stroke" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#hexGrid)" />
                </svg>
            </div>

            {/* Distant Stars - Slow movement */}
            <motion.div
                className="absolute inset-0"
                animate={{
                    x: mousePosition.x * -0.02,
                    y: mousePosition.y * -0.02,
                }}
                transition={{ type: "spring", stiffness: 20, damping: 30 }}
            >
                {[...Array(50)].map((_, i) => (
                    <div
                        key={`star-${i}`}
                        className="theme-bg-star absolute h-0.5 w-0.5 rounded-full opacity-40"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                    />
                ))}
            </motion.div>

            {/* Mid-layer Particles - Medium movement */}
            <motion.div
                className="absolute inset-0"
                animate={{
                    x: mousePosition.x * -0.05,
                    y: mousePosition.y * -0.05,
                }}
                transition={{ type: "spring", stiffness: 25, damping: 25 }}
            >
                {[...Array(30)].map((_, i) => (
                    <motion.div
                        key={`mid-${i}`}
                        className="theme-bg-secondary-particle absolute h-1 w-1 rounded-full opacity-30"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                        animate={{
                            opacity: [0.1, 0.5, 0.1],
                            scale: [1, 1.2, 1],
                        }}
                        transition={{
                            duration: 4 + Math.random() * 3,
                            repeat: Infinity,
                            delay: Math.random() * 2,
                        }}
                    />
                ))}
            </motion.div>

            {/* Foreground Particles - Fast movement */}
            <motion.div
                className="absolute inset-0"
                animate={{
                    x: mousePosition.x * -0.08,
                    y: mousePosition.y * -0.08,
                }}
                transition={{ type: "spring", stiffness: 30, damping: 20 }}
            >
                {[...Array(15)].map((_, i) => (
                    <motion.div
                        key={`fore-${i}`}
                        className="theme-bg-primary-particle absolute h-1.5 w-1.5 rounded-full opacity-20"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                        animate={{
                            opacity: [0.2, 0.8, 0.2],
                            scale: [1, 1.5, 1],
                        }}
                        transition={{
                            duration: 2 + Math.random() * 2,
                            repeat: Infinity,
                            delay: Math.random() * 2,
                        }}
                    />
                ))}
            </motion.div>

            {/* Scanning Lines overlay */}
            <motion.div
                className="theme-scan-line absolute top-0 left-0 h-0.5 w-full"
                animate={{ y: ["0vh", "100vh"] }}
                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
            />

            <div className="theme-vignette absolute inset-0 pointer-events-none opacity-60" />
        </div>
    );
};

export default ParallaxBackground;
