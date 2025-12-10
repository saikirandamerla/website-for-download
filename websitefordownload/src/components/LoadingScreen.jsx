import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../assets/logo.png';

const LoadingScreen = ({ onComplete }) => {
    const [progress, setProgress] = useState(0);
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(() => {
                        setIsComplete(true);
                        setTimeout(() => {
                            if (onComplete) onComplete();
                        }, 600);
                    }, 300);
                    return 100;
                }
                return prev + Math.random() * 4;
            });
        }, 40);

        return () => clearInterval(interval);
    }, [onComplete]);

    return (
        <AnimatePresence>
            {!isComplete && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6 }}
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        background: 'linear-gradient(135deg, #000000 0%, #0a0a1a 50%, #000000 100%)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 10000,
                        overflow: 'hidden',
                    }}
                >
                    {/* Animated particles */}
                    {[...Array(20)].map((_, i) => (
                        <motion.div
                            key={i}
                            style={{
                                position: 'absolute',
                                width: '4px',
                                height: '4px',
                                borderRadius: '50%',
                                background: `rgba(0, 198, 255, ${0.3 + Math.random() * 0.4})`,
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                            }}
                            animate={{
                                y: [0, -30, 0],
                                opacity: [0.3, 1, 0.3],
                                scale: [1, 1.5, 1],
                            }}
                            transition={{
                                duration: 2 + Math.random() * 2,
                                repeat: Infinity,
                                delay: Math.random() * 2,
                            }}
                        />
                    ))}

                    {/* Logo with pulse animation */}
                    <motion.div
                        animate={{
                            scale: [1, 1.05, 1],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        style={{
                            marginBottom: '3rem',
                            position: 'relative',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.25rem',
                        }}
                    >
                        {/* Glow effect */}
                        <motion.div
                            animate={{
                                opacity: [0.5, 1, 0.5],
                                scale: [1, 1.2, 1],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                            }}
                            style={{
                                position: 'absolute',
                                inset: -20,
                                background: 'radial-gradient(circle, rgba(0, 198, 255, 0.3) 0%, transparent 70%)',
                                filter: 'blur(20px)',
                            }}
                        />

                        <img
                            src={logo}
                            alt="Loading"
                            style={{
                                width: '80px',
                                height: '80px',
                                position: 'relative',
                                zIndex: 1,
                                filter: 'drop-shadow(0 0 20px rgba(0, 198, 255, 0.6))',
                            }}
                        />

                        <span
                            className="holographic-text"
                            style={{
                                fontSize: '3rem',
                                fontWeight: '700',
                                letterSpacing: '-0.02em',
                                position: 'relative',
                                zIndex: 1,
                            }}
                        >
                            djunct
                        </span>
                    </motion.div>

                    {/* Progress bar container */}
                    <div style={{
                        width: '300px',
                        height: '4px',
                        background: 'rgba(255, 255, 255, 0.1)',
                        borderRadius: '10px',
                        overflow: 'hidden',
                        position: 'relative',
                    }}>
                        {/* Progress bar */}
                        <motion.div
                            style={{
                                height: '100%',
                                background: 'linear-gradient(90deg, #00C6FF 0%, #8B5CF6 50%, #FF0080 100%)',
                                borderRadius: '10px',
                                boxShadow: '0 0 20px rgba(0, 198, 255, 0.6)',
                            }}
                            initial={{ width: '0%' }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 0.3 }}
                        />

                        {/* Shimmer effect */}
                        <motion.div
                            animate={{
                                x: ['-100%', '200%'],
                            }}
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                ease: "linear",
                            }}
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '50%',
                                height: '100%',
                                background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.3) 50%, transparent 100%)',
                            }}
                        />
                    </div>

                    {/* Percentage text */}
                    <motion.div
                        animate={{ opacity: [0.7, 1, 0.7] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        style={{
                            marginTop: '1.5rem',
                            fontSize: '1.2rem',
                            fontWeight: '600',
                            background: 'linear-gradient(135deg, #00C6FF 0%, #8B5CF6 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            letterSpacing: '2px',
                        }}
                    >
                        {Math.round(progress)}%
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default LoadingScreen;
