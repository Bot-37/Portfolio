import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import Spline from '@splinetool/react-spline';

interface EliasAvatarProps {
    className?: string;
    style?: React.CSSProperties;
}

const EliasAvatar = (props: EliasAvatarProps) => {
    const [isActive, setIsActive] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [splineLoaded, setSplineLoaded] = useState(false);
    const [pulseIntensity, setPulseIntensity] = useState(0.3);
    const splineRef = useRef<unknown>(null);

    useEffect(() => {
        const interval = setInterval(() => {
            setIsActive(prev => !prev);
            setPulseIntensity(Math.random() * 0.5 + 0.3);
        }, 2500);

        return () => clearInterval(interval);
    }, []);

    // Enhanced mouse tracking with smoother movement
    const handleMouseMove = (e: React.MouseEvent) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const x = (e.clientX - centerX) / 15;
        const y = (e.clientY - centerY) / 15;

        setMousePosition({ x, y });
    };

    const handleMouseLeave = () => {
        setMousePosition({ x: 0, y: 0 });
    };

    const onSplineLoad = (spline: unknown) => {
        splineRef.current = spline;
        setSplineLoaded(true);

        // Hide Spline watermark by finding and hiding the logo element
        setTimeout(() => {
            const splineCanvas = document.querySelector('#spline-watermark, [id*="spline"], .spline-watermark');
            if (splineCanvas) {
                const style = document.createElement('style');
                style.innerHTML = `
                    #spline-watermark,
                    [id*="spline-watermark"],
                    .spline-watermark,
                    a[href*="spline.design"] {
                        display: none !important;
                        opacity: 0 !important;
                        visibility: hidden !important;
                        pointer-events: none !important;
                    }
                    canvas + div,
                    canvas ~ div {
                        display: none !important;
                    }
                `;
                document.head.appendChild(style);
            }
        }, 1000);
    };

    return (
        <div
            className={`relative pointer-events-none ${props.className || ''}`}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={props.style || { width: '500px', height: '500px' }}
        >
            {/* Enhanced Outer Holographic Rings with Dynamic Colors */}
            <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                    background: `conic-gradient(from 0deg, 
                        rgba(34, 197, 94, ${pulseIntensity}), 
                        rgba(59, 130, 246, ${pulseIntensity * 0.7}), 
                        rgba(168, 85, 247, ${pulseIntensity * 0.5}), 
                        rgba(34, 197, 94, ${pulseIntensity}))`,
                    padding: '2px',
                    borderRadius: '50%'
                }}
                animate={{
                    rotate: 360,
                    scale: [1, 1.05, 1],
                    x: mousePosition.x * 0.8,
                    y: mousePosition.y * 0.8
                }}
                transition={{
                    rotate: { duration: 12, repeat: Infinity, ease: "linear" },
                    scale: { duration: 4, repeat: Infinity },
                    x: { duration: 0.5, ease: "easeOut" },
                    y: { duration: 0.5, ease: "easeOut" }
                }}
            >
                <div className="w-full h-full bg-black/90 rounded-full" />
            </motion.div>

            {/* Secondary Ring with Morphing Effect */}
            <motion.div
                className="absolute inset-6 rounded-full border-2 border-blue-400/30"
                animate={{
                    rotate: -360,
                    scale: [1, 0.95, 1.05, 1],
                    x: mousePosition.x * 0.4,
                    y: mousePosition.y * 0.4,
                    borderColor: [
                        "rgba(59, 130, 246, 0.3)",
                        "rgba(34, 197, 94, 0.4)",
                        "rgba(168, 85, 247, 0.3)",
                        "rgba(59, 130, 246, 0.3)"
                    ]
                }}
                transition={{
                    rotate: { duration: 8, repeat: Infinity, ease: "linear" },
                    scale: { duration: 6, repeat: Infinity },
                    borderColor: { duration: 4, repeat: Infinity },
                    x: { duration: 0.5, ease: "easeOut" },
                    y: { duration: 0.5, ease: "easeOut" }
                }}
            />

            {/* Central 3D Avatar Sphere with Enhanced Effects */}
            <motion.div
                className="relative w-80 h-80 mx-auto rounded-full backdrop-blur-md border border-green-400/40 flex items-center justify-center overflow-hidden"
                style={{
                    background: `radial-gradient(circle at center, 
                        rgba(34, 197, 94, 0.08) 0%, 
                        rgba(59, 130, 246, 0.06) 50%, 
                        rgba(0, 0, 0, 0.2) 100%)`,
                    transformStyle: 'preserve-3d',
                    perspective: '1000px'
                }}
                animate={{
                    boxShadow: isActive
                        ? [
                            "0 0 80px rgba(34, 197, 94, 0.6), 0 0 120px rgba(59, 130, 246, 0.4), inset 0 0 60px rgba(34, 197, 94, 0.1)",
                            "0 0 60px rgba(59, 130, 246, 0.8), 0 0 100px rgba(168, 85, 247, 0.3), inset 0 0 40px rgba(59, 130, 246, 0.1)"
                        ]
                        : [
                            "0 0 40px rgba(34, 197, 94, 0.4), 0 0 80px rgba(59, 130, 246, 0.3), inset 0 0 30px rgba(34, 197, 94, 0.05)",
                            "0 0 30px rgba(59, 130, 246, 0.5), 0 0 60px rgba(34, 197, 94, 0.2), inset 0 0 20px rgba(59, 130, 246, 0.05)"
                        ],
                    x: mousePosition.x * 1.2,
                    y: mousePosition.y * 1.2,
                    rotateX: mousePosition.y * -0.5,
                    rotateY: mousePosition.x * 0.5
                }}
                transition={{
                    boxShadow: { duration: 2, repeat: Infinity, repeatType: "reverse" },
                    x: { duration: 0.6, ease: "easeOut" },
                    y: { duration: 0.6, ease: "easeOut" },
                    rotateX: { duration: 0.6, ease: "easeOut" },
                    rotateY: { duration: 0.6, ease: "easeOut" }
                }}
            >
                {/* Enhanced Spline 3D Model Container */}
                <motion.div
                    className="absolute inset-0 w-full h-full pointer-events-auto"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{
                        opacity: splineLoaded ? 1 : 0.7,
                        scale: splineLoaded ? 1 : 0.9
                    }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    style={{ zIndex: 20 }}
                >
                    <Spline
                        scene="https://prod.spline.design/ZXsdoX8aQ6Pdth64/scene.splinecode"
                        onLoad={onSplineLoad}
                        style={{
                            width: '100%',
                            height: '100%',
                            borderRadius: '50%',
                            transform: 'scale(1.6)',
                            transformOrigin: 'center'
                        }}
                    />
                </motion.div>

                {/* Enhanced Loading Animation */}
                {!splineLoaded && (
                    <motion.div
                        className="absolute inset-0 flex items-center justify-center"
                        animate={{
                            opacity: [0.3, 1, 0.3],
                            scale: [0.9, 1, 0.9]
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    >
                        <div className="relative">
                            <div className="text-green-400 text-2xl font-bold tracking-wider">
                                INITIALIZING...
                            </div>
                            <motion.div
                                className="absolute -bottom-4 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-green-400 to-transparent"
                                animate={{ x: [-100, 100] }}
                                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                            />
                        </div>
                    </motion.div>
                )}

                {/* Dynamic Background Elements */}
                {[...Array(3)].map((_, i) => (
                    <motion.div
                        key={`bg-${i}`}
                        className={`absolute rounded-full blur-md -z-10`}
                        style={{
                            width: `${120 + i * 40}px`,
                            height: `${120 + i * 40}px`,
                            background: `radial-gradient(circle, ${i === 0 ? 'rgba(34, 197, 94, 0.15)' :
                                i === 1 ? 'rgba(59, 130, 246, 0.12)' :
                                    'rgba(168, 85, 247, 0.1)'
                                } 0%, transparent 70%)`
                        }}
                        animate={{
                            scale: [1, 1.3, 1],
                            opacity: [0.2, 0.5, 0.2],
                            rotateZ: (i % 2 === 0 ? 1 : -1) * 360
                        }}
                        transition={{
                            scale: { duration: 3 + i, repeat: Infinity },
                            opacity: { duration: 3 + i, repeat: Infinity },
                            rotateZ: { duration: 10 + i * 2, repeat: Infinity, ease: "linear" }
                        }}
                    />
                ))}
            </motion.div>

            {/* Enhanced Floating Data Particles */}
            {[...Array(12)].map((_, i) => (
                <motion.div
                    key={`particle-${i}`}
                    className={`absolute w-1 h-1 rounded-full pointer-events-none`}
                    style={{
                        background: i % 3 === 0 ? '#22c55e' : i % 3 === 1 ? '#3b82f6' : '#a855f7',
                        top: `${250 + Math.cos(i * 30 * Math.PI / 180) * (120 + Math.sin(i * 0.5) * 20)}px`,
                        left: `${250 + Math.sin(i * 30 * Math.PI / 180) * (120 + Math.cos(i * 0.5) * 20)}px`,
                        zIndex: 35,
                        filter: 'blur(0.5px)'
                    }}
                    animate={{
                        y: [-15, 15, -15],
                        x: [-10, 10, -10],
                        opacity: [0.3, 1, 0.3],
                        scale: [0.3, 1.5, 0.3],
                        rotateZ: [0, 360]
                    }}
                    transition={{
                        duration: 4 + (i * 0.3),
                        repeat: Infinity,
                        delay: i * 0.2,
                        ease: "easeInOut"
                    }}
                />
            ))}

            {/* Multi-layered Orbital Rings */}
            {[...Array(2)].map((_, i) => (
                <motion.div
                    key={`orbit-${i}`}
                    className={`absolute border rounded-full pointer-events-none`}
                    style={{
                        width: `${200 + i * 60}px`,
                        height: `${200 + i * 60}px`,
                        borderColor: i === 0 ? 'rgba(34, 197, 94, 0.4)' : 'rgba(59, 130, 246, 0.3)',
                        borderWidth: i === 0 ? '1px' : '0.5px',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        zIndex: 30
                    }}
                    animate={{
                        rotateZ: (i % 2 === 0 ? 1 : -1) * 360,
                        scale: [1, 1.08, 1],
                        opacity: [0.4, 0.8, 0.4]
                    }}
                    transition={{
                        rotateZ: { duration: 6 + i * 2, repeat: Infinity, ease: "linear" },
                        scale: { duration: 5 + i, repeat: Infinity },
                        opacity: { duration: 3 + i, repeat: Infinity }
                    }}
                />
            ))}

            {/* Enhanced Status Display */}
            <motion.div
                className="absolute -bottom-20 left-1/2 transform -translate-x-1/2 text-center font-mono"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2, duration: 1 }}
            >
                <motion.div
                    className="text-green-400 text-lg font-bold tracking-widest mb-2"
                    animate={{
                        textShadow: isActive
                            ? ["0 0 20px rgba(34, 197, 94, 0.8)", "0 0 30px rgba(59, 130, 246, 0.6)"]
                            : ["0 0 10px rgba(34, 197, 94, 0.4)", "0 0 15px rgba(34, 197, 94, 0.3)"],
                        scale: [1, 1.02, 1]
                    }}
                    transition={{
                        textShadow: { duration: 2, repeat: Infinity, repeatType: "reverse" },
                        scale: { duration: 2, repeat: Infinity }
                    }}
                >
                    ELIAS AI ASSISTANT
                </motion.div>

                <motion.div
                    className="text-blue-300 text-sm flex items-center justify-center gap-3 mb-1"
                    animate={{ opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 2.5, repeat: Infinity }}
                >
                    <motion.div
                        className="w-2 h-2 bg-green-400 rounded-full"
                        animate={{
                            scale: [1, 1.5, 1],
                            boxShadow: [
                                "0 0 5px rgba(34, 197, 94, 0.5)",
                                "0 0 15px rgba(34, 197, 94, 0.8)",
                                "0 0 5px rgba(34, 197, 94, 0.5)"
                            ]
                        }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                    />
                    NEURAL LINK ESTABLISHED
                </motion.div>

                <motion.div
                    className="text-gray-400 text-xs"
                    animate={{ opacity: [0.5, 0.8, 0.5] }}
                    transition={{ duration: 3, repeat: Infinity }}
                >
                    HOLOGRAPHIC INTERFACE v3.0 • QUANTUM READY
                </motion.div>
            </motion.div>
        </div>
    );
};

export default EliasAvatar;