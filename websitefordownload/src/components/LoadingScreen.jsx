import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../assets/logo.png';

const LoadingScreen = ({ onComplete }) => {
    const [progress, setProgress] = useState(0);
    const [loadingText, setLoadingText] = useState('Initializing');
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        // Progress simulation
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(() => {
                        setIsComplete(true);
                        setTimeout(() => {
                            if (onComplete) onComplete();
                        }, 800);
                    }, 500);
                    return 100;
                }

                // Update loading text based on progress
                if (prev < 30) {
                    setLoadingText('Initializing');
                } else if (prev < 60) {
                    setLoadingText('Loading Assets');
                } else if (prev < 90) {
                    setLoadingText('Preparing Interface');
                } else {
                    setLoadingText('Almost Ready');
                }

                return prev + Math.random() * 3;
            });
        }, 50);

        return () => clearInterval(interval);
    }, [onComplete]);

    return (
        <AnimatePresence>
            {!isComplete && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 1.1 }}
                    transition={{ duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }}
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        background: 'radial-gradient(circle at center, #0a0a0a 0%, #000000 100%)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 10000,
                        overflow: 'hidden',
                    }}
                >
                    {/* Animated background grid */}
                    <div
                        style={{
                            position: 'absolute',
                            inset: 0,
                            backgroundImage: `
                                linear-gradient(rgba(0, 198, 255, 0.05) 1px, transparent 1px),
                                linear-gradient(90deg, rgba(0, 198, 255, 0.05) 1px, transparent 1px)
                            `,
                            backgroundSize: '50px 50px',
                            transform: 'perspective(500px) rotateX(60deg)',
                            transformOrigin: 'center bottom',
                            opacity: 0.3,
                        }}
                    />

                    {/* Rotating rings */}
                    {[...Array(3)].map((_, i) => (
                        <motion.div
                            key={i}
                            style={{
                                position: 'absolute',
                                width: `${200 + i * 100}px`,
                                height: `${200 + i * 100}px`,
                                borderRadius: '50%',
                                border: `2px solid rgba(0, 198, 255, ${0.2 - i * 0.05})`,
                                boxShadow: `0 0 ${20 + i * 10}px rgba(0, 198, 255, 0.3)`,
                            }}
                            animate={{
                                rotate: [0, 360],
                                scale: [1, 1.1, 1],
                            }}
                            transition={{
                                duration: 8 + i * 2,
                                repeat: Infinity,
                                ease: "linear",
                            }}
                        />
                    ))}

                    {/* Floating orbs */}
                    {[...Array(8)].map((_, i) => {
                        const colors = ['#00C6FF', '#8B5CF6', '#FF0080', '#00FF88'];
                        const color = colors[i % colors.length];
                        const angle = (Math.PI * 2 * i) / 8;
                        const radius = 150;

                        return (
                            <motion.div
                                key={`orb-${i}`}
                                style={{
                                    position: 'absolute',
                                    width: '20px',
                                    height: '20px',
                                    borderRadius: '50%',
                                    background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
                                    boxShadow: `0 0 20px ${color}`,
                                    filter: 'blur(4px)',
                                }}
                                animate={{
                                    x: [
                                        Math.cos(angle) * radius,
                                        Math.cos(angle + Math.PI) * radius,
                                        Math.cos(angle) * radius,
                                    ],
                                    y: [
                                        Math.sin(angle) * radius,
                                        Math.sin(angle + Math.PI) * radius,
                                        Math.sin(angle) * radius,
                                    ],
                                    scale: [1, 1.5, 1],
                                    opacity: [0.6, 1, 0.6],
                                }}
                                transition={{
                                    duration: 4,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                    delay: i * 0.2,
                                }}
                            />
                        );
                    })}

                    {/* Main content container */}
                    <div style={{ position: 'relative', zIndex: 10, textAlign: 'center' }}>
                        {/* Logo with morphing effect */}
                        <motion.div
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{
                                duration: 1,
                                type: "spring",
                                stiffness: 200,
                                damping: 20
                            }}
                            style={{
                                marginBottom: '3rem',
                                position: 'relative',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '0.5rem',
                            }}
                        >
                            {/* Logo as "A" */}
                            <motion.img
                                src={logo}
                                alt="A"
                                style={{
                                    height: '80px',
                                    width: 'auto',
                                    filter: 'drop-shadow(0 0 40px rgba(0, 198, 255, 0.6))',
                                }}
                                animate={{
                                    filter: [
                                        'drop-shadow(0 0 40px rgba(0, 198, 255, 0.6))',
                                        'drop-shadow(0 0 60px rgba(139, 92, 246, 0.8))',
                                        'drop-shadow(0 0 40px rgba(0, 198, 255, 0.6))',
                                    ],
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                            />

                            {/* Text "djunct" */}
                            <motion.h1
                                className="holographic-text"
                                style={{
                                    fontSize: '4.5rem',
                                    fontWeight: '800',
                                    color: '#ffffff',
                                    letterSpacing: '-0.03em',
                                    margin: 0,
                                    textShadow: '0 0 40px rgba(0, 198, 255, 0.6)',
                                }}
                                animate={{
                                    textShadow: [
                                        '0 0 40px rgba(0, 198, 255, 0.6)',
                                        '0 0 60px rgba(139, 92, 246, 0.8)',
                                        '0 0 40px rgba(0, 198, 255, 0.6)',
                                    ],
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                            >
                                djunct
                            </motion.h1>

                            {/* Animated underline */}
                            <motion.div
                                style={{
                                    position: 'absolute',
                                    bottom: '-15px',
                                    left: '50%',
                                    transform: 'translateX(-50%)',
                                    width: '100%',
                                    height: '3px',
                                    background: 'linear-gradient(90deg, transparent, #00C6FF, #8B5CF6, #FF0080, transparent)',
                                    backgroundSize: '200% 100%',
                                    borderRadius: '2px',
                                }}
                                animate={{
                                    backgroundPosition: ['0% center', '200% center'],
                                }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    ease: "linear",
                                }}
                            />
                        </motion.div>

                        {/* Circular progress indicator */}
                        <div style={{ marginBottom: '2rem', position: 'relative' }}>
                            <svg width="120" height="120" style={{ transform: 'rotate(-90deg)' }}>
                                {/* Background circle */}
                                <circle
                                    cx="60"
                                    cy="60"
                                    r="50"
                                    stroke="rgba(255, 255, 255, 0.1)"
                                    strokeWidth="6"
                                    fill="none"
                                />
                                {/* Progress circle */}
                                <motion.circle
                                    cx="60"
                                    cy="60"
                                    r="50"
                                    stroke="url(#progressGradient)"
                                    strokeWidth="6"
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeDasharray={314}
                                    strokeDashoffset={314 - (314 * progress) / 100}
                                    style={{
                                        filter: 'drop-shadow(0 0 10px rgba(0, 198, 255, 0.8))',
                                        transition: 'stroke-dashoffset 0.3s ease',
                                    }}
                                />
                                <defs>
                                    <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" stopColor="#00C6FF" />
                                        <stop offset="50%" stopColor="#8B5CF6" />
                                        <stop offset="100%" stopColor="#FF0080" />
                                    </linearGradient>
                                </defs>
                            </svg>

                            {/* Percentage text */}
                            <div
                                style={{
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    transform: 'translate(-50%, -50%)',
                                }}
                            >
                                <motion.div
                                    key={Math.floor(progress)}
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    style={{
                                        fontSize: '1.8rem',
                                        fontWeight: '700',
                                        color: '#fff',
                                        textShadow: '0 0 20px rgba(0, 198, 255, 0.8)',
                                    }}
                                >
                                    {Math.floor(progress)}%
                                </motion.div>
                            </div>
                        </div>

                        {/* Loading text with typing effect */}
                        <motion.div
                            style={{
                                fontSize: '1.1rem',
                                color: 'var(--text-secondary)',
                                fontWeight: '500',
                                marginBottom: '2rem',
                                height: '30px',
                            }}
                        >
                            <motion.span
                                key={loadingText}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.3 }}
                            >
                                {loadingText}
                                <motion.span
                                    animate={{ opacity: [0, 1, 0] }}
                                    transition={{ duration: 1, repeat: Infinity }}
                                >
                                    ...
                                </motion.span>
                            </motion.span>
                        </motion.div>

                        {/* Progress bar */}
                        <div
                            style={{
                                width: '400px',
                                maxWidth: '90vw',
                                height: '6px',
                                background: 'rgba(255, 255, 255, 0.05)',
                                borderRadius: '3px',
                                overflow: 'hidden',
                                position: 'relative',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                            }}
                        >
                            <motion.div
                                style={{
                                    height: '100%',
                                    background: 'linear-gradient(90deg, #00C6FF 0%, #8B5CF6 50%, #FF0080 100%)',
                                    borderRadius: '3px',
                                    boxShadow: '0 0 15px rgba(0, 198, 255, 0.6)',
                                    width: `${progress}%`,
                                }}
                                transition={{ duration: 0.3, ease: 'easeOut' }}
                            />

                            {/* Shimmer effect */}
                            <motion.div
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '100px',
                                    height: '100%',
                                    background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)',
                                }}
                                animate={{
                                    left: ['-100px', '400px'],
                                }}
                                transition={{
                                    duration: 1.5,
                                    repeat: Infinity,
                                    ease: 'linear',
                                }}
                            />
                        </div>

                        {/* Tagline */}
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5, duration: 1 }}
                            style={{
                                marginTop: '2rem',
                                fontSize: '0.9rem',
                                color: 'var(--text-muted)',
                                fontStyle: 'italic',
                            }}
                        >
                            Pioneer the Future of AI Communication
                        </motion.p>
                    </div>

                    {/* Particle effects */}
                    {[...Array(30)].map((_, i) => (
                        <motion.div
                            key={`particle-${i}`}
                            style={{
                                position: 'absolute',
                                width: '3px',
                                height: '3px',
                                borderRadius: '50%',
                                background: i % 2 === 0 ? '#00C6FF' : '#8B5CF6',
                                boxShadow: `0 0 6px currentColor`,
                                left: `${Math.random() * 100}%`,
                            }}
                            initial={{
                                y: '100vh',
                                opacity: 0,
                            }}
                            animate={{
                                y: ['-10vh', '110vh'],
                                opacity: [0, 1, 1, 0],
                                x: [0, Math.random() * 100 - 50],
                            }}
                            transition={{
                                duration: 3 + Math.random() * 2,
                                repeat: Infinity,
                                delay: Math.random() * 3,
                                ease: 'linear',
                            }}
                        />
                    ))}
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default LoadingScreen;
