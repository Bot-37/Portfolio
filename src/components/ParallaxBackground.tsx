
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
        <div className="fixed inset-0 pointer-events-none">
        {/* Hex Grid Background */}
        <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
        <pattern id="hexGrid" width="60" height="52" patternUnits="userSpaceOnUse">
        <path d="M0 26L15 0h30l15 26l-15 26H15z" fill="none" stroke="currentColor" strokeWidth="1" className="text-green-400"/>
        </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hexGrid)" />
        </svg>
        </div>

        {/* Matrix Particles */}
        <motion.div
        className="absolute inset-0"
        animate={{
            x: mousePosition.x * -0.02,
            y: mousePosition.y * -0.02,
        }}
        transition={{ type: "spring", stiffness: 50, damping: 20 }}
        >
        {[...Array(20)].map((_, i) => (
            <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-400 rounded-full"
            style={{
                left: `${Math.random() * 100}%`,
                                       top: `${Math.random() * 100}%`,
            }}
            animate={{
                opacity: [0.2, 1, 0.2],
                scale: [1, 1.5, 1],
            }}
            transition={{
                duration: 3 + Math.random() * 2,
                                       repeat: Infinity,
                                       delay: Math.random() * 2,
            }}
            />
        ))}
        </motion.div>

        {/* Scanning Lines */}
        <motion.div
        className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-green-400 to-transparent"
        animate={{ y: ["0vh", "100vh"] }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        />

        <motion.div
        className="absolute top-0 left-0 w-0.5 h-full bg-gradient-to-b from-transparent via-blue-400 to-transparent"
        animate={{ x: ["0vw", "100vw"] }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear", delay: 2 }}
        />
        </div>
    );
};

export default ParallaxBackground;
