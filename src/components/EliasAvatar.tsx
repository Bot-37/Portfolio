
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const EliasAvatar = () => {
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setIsActive(prev => !prev);
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative">
        {/* Holographic Rings */}
        <motion.div
        className="absolute inset-0 rounded-full border-2 border-green-400/30"
        animate={{ rotate: 360, scale: [1, 1.1, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        style={{ width: '300px', height: '300px' }}
        />

        <motion.div
        className="absolute inset-4 rounded-full border border-blue-400/20"
        animate={{ rotate: -360, scale: [1, 0.9, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        />

        {/* Central Avatar Orb */}
        <motion.div
        className="relative w-48 h-48 mx-auto rounded-full bg-gradient-to-br from-green-400/20 to-blue-400/20 backdrop-blur-lg border border-green-400/50 flex items-center justify-center"
        animate={{
            boxShadow: isActive
            ? "0 0 60px rgba(34, 197, 94, 0.5), 0 0 120px rgba(59, 130, 246, 0.3)"
            : "0 0 30px rgba(34, 197, 94, 0.3), 0 0 60px rgba(59, 130, 246, 0.2)"
        }}
        transition={{ duration: 1.5 }}
        >
        {/* Inner Glow */}
        <motion.div
        className="w-32 h-32 rounded-full bg-gradient-to-br from-green-400 to-blue-400 opacity-30"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 2, repeat: Infinity }}
        />

        {/* Central Core */}
        <div className="absolute w-16 h-16 rounded-full bg-white/90 flex items-center justify-center">
        <motion.div
        className="text-2xl font-bold text-black"
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 2, repeat: Infinity }}
        >
        E
        </motion.div>
        </div>

        {/* Floating Particles */}
        <motion.div
        className="absolute w-2 h-2 bg-green-400 rounded-full top-8 right-8"
        animate={{ y: [-10, 10, -10], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 3, repeat: Infinity }}
        />
        <motion.div
        className="absolute w-1 h-1 bg-blue-400 rounded-full bottom-12 left-6"
        animate={{ y: [10, -10, 10], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 2.5, repeat: Infinity, delay: 1 }}
        />
        </motion.div>

        {/* Status Text */}
        <motion.div
        className="text-center mt-6 font-mono"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        >
        <div className="text-green-400 text-sm">ELIAS AI ASSISTANT</div>
        <div className="text-blue-300 text-xs mt-1">STATUS: ONLINE</div>
        </motion.div>
        </div>
    );
};

export default EliasAvatar;
