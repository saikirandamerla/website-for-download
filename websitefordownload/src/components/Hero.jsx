import React, { useRef } from 'react';
import { motion, useTransform, useScroll } from 'framer-motion';
import { springs, easings } from '../utils/animations';
import MagneticButton from './MagneticButton';
import logo from '../assets/logo.png';

// Animated Gradient Orb
const GradientOrb = ({ color, size, top, left, delay }) => {
    return (
        <motion.div
            style={{
                position: 'absolute',
                top,
                left,
                width: size,
                height: size,
                borderRadius: '50%',
                background: `radial-gradient(circle, ${color}40 0%, ${color}10 50%, transparent 70%)`,
                filter: 'blur(60px)',
            }}
            animate={{
                scale: [1, 1.3, 1],
                opacity: [0.4, 0.7, 0.4],
                x: [-20, 20, -20],
                y: [-20, 20, -20],
            }}
            transition={{
                duration: 8,
                repeat: Infinity,
                ease: 'easeInOut',
                delay,
            }}
        />
    );
};

// Floating Geometric Shape
const FloatingShape = ({ children, delay, duration = 20 }) => {
    return (
        <motion.div
            animate={{
                y: [-20, 20, -20],
                rotate: [0, 360],
                scale: [1, 1.1, 1],
            }}
            transition={{
                duration,
                repeat: Infinity,
                ease: 'linear',
                delay,
            }}
        >
            {children}
        </motion.div>
    );
};

const Hero = ({ styles, responsiveStyles, setShowPopup }) => {
    const heroRef = useRef(null);
    const { scrollY } = useScroll();

    // Scroll effects
    const opacity = useTransform(scrollY, [0, 400], [1, 0]);
    const scale = useTransform(scrollY, [0, 400], [1, 0.95]);
    const y = useTransform(scrollY, [0, 400], [0, 100]);

    return (
        <motion.div
            ref={heroRef}
            style={{
                position: 'relative',
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                background: '#000',
                opacity,
            }}
        >
            {/* Animated Background */}
            <div style={{
                position: 'absolute',
                inset: 0,
                background: 'radial-gradient(circle at 50% 50%, rgba(10, 10, 30, 1) 0%, rgba(0, 0, 0, 1) 100%)',
            }} />

            {/* Gradient Orbs */}
            <GradientOrb color="#00C6FF" size="500px" top="10%" left="5%" delay={0} />
            <GradientOrb color="#8B5CF6" size="600px" top="60%" left="70%" delay={2} />
            <GradientOrb color="#FF0080" size="450px" top="30%" left="80%" delay={4} />
            <GradientOrb color="#00FF88" size="400px" top="70%" left="15%" delay={1} />

            {/* Floating Geometric Shapes */}
            <div style={{ position: 'absolute', inset: 0, opacity: 0.08 }}>
                <FloatingShape delay={0} duration={25}>
                    <div style={{
                        position: 'absolute',
                        top: '15%',
                        left: '10%',
                        width: '80px',
                        height: '80px',
                        border: '2px solid #00C6FF',
                        borderRadius: '12px',
                    }} />
                </FloatingShape>

                <FloatingShape delay={3} duration={30}>
                    <div style={{
                        position: 'absolute',
                        top: '70%',
                        right: '15%',
                        width: '60px',
                        height: '60px',
                        border: '2px solid #8B5CF6',
                        borderRadius: '50%',
                    }} />
                </FloatingShape>

                <FloatingShape delay={1.5} duration={22}>
                    <div style={{
                        position: 'absolute',
                        top: '40%',
                        right: '20%',
                        width: '0',
                        height: '0',
                        borderLeft: '40px solid transparent',
                        borderRight: '40px solid transparent',
                        borderBottom: '70px solid rgba(255, 0, 128, 0.3)',
                    }} />
                </FloatingShape>
            </div>

            {/* Grid Overlay */}
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundImage: `
                        linear-gradient(rgba(0, 198, 255, 0.02) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(0, 198, 255, 0.02) 1px, transparent 1px)
                    `,
                    backgroundSize: '80px 80px',
                    opacity: 0.5,
                }}
            />

            {/* Main Content */}
            <motion.div
                style={{
                    position: 'relative',
                    zIndex: 10,
                    textAlign: 'center',
                    maxWidth: '1100px',
                    padding: '0 2rem',
                    scale,
                    y,
                }}
            >
                {/* Subtitle Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        padding: '0.5rem 1.25rem',
                        borderRadius: '50px',
                        background: 'rgba(0, 198, 255, 0.1)',
                        border: '1px solid rgba(0, 198, 255, 0.2)',
                        marginBottom: '2rem',
                        backdropFilter: 'blur(10px)',
                    }}
                >
                    <div style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        background: '#00C6FF',
                        boxShadow: '0 0 10px #00C6FF',
                    }} />
                    <span style={{
                        fontSize: '0.9rem',
                        color: '#00C6FF',
                        fontWeight: '500',
                    }}>
                        Next-Gen AI Communication
                    </span>
                </motion.div>

                {/* Main Heading - Logo (A) + djunct */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3, ease: easings.easeOutExpo }}
                    style={{
                        textAlign: 'center',
                        marginBottom: '1.5rem',
                    }}
                >
                    <h1
                        style={{
                            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
                            fontWeight: '800',
                            letterSpacing: '-0.02em',
                            color: '#ffffff',
                            textShadow: '0 0 60px rgba(0, 198, 255, 0.4)',
                            margin: 0,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.25rem',
                        }}
                    >
                        {/* Logo as "A" */}
                        <motion.img
                            src={logo}
                            alt="A"
                            style={{
                                height: 'clamp(60px, 10vw, 100px)',
                                width: 'auto',
                                filter: 'drop-shadow(0 0 40px rgba(0, 198, 255, 0.5))',
                            }}
                            whileHover={{ scale: 1.05 }}
                            transition={springs.gentle}
                        />

                        {/* Remaining text "djunct" */}
                        <span>djunct</span>
                    </h1>
                </motion.div>

                {/* Animated Tagline */}
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5, ease: easings.easeOutExpo }}
                    style={{
                        fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
                        fontWeight: '600',
                        marginBottom: '2rem',
                        lineHeight: 1.3,
                    }}
                >
                    <motion.span
                        style={{
                            background: 'linear-gradient(90deg, #00C6FF 0%, #8B5CF6 33%, #FF0080 66%, #00C6FF 100%)',
                            backgroundSize: '200% auto',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                        }}
                        animate={{
                            backgroundPosition: ['0% center', '200% center'],
                        }}
                        transition={{
                            duration: 8,
                            repeat: Infinity,
                            ease: 'linear',
                        }}
                    >
                        Pioneer the Future of AI Communication
                    </motion.span>
                </motion.h2>

                {/* Description */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.7 }}
                    style={{
                        fontSize: 'clamp(1rem, 2vw, 1.25rem)',
                        color: 'rgba(255, 255, 255, 0.7)',
                        maxWidth: '700px',
                        margin: '0 auto 3rem',
                        lineHeight: 1.7,
                    }}
                >
                    Experience seamless, intelligent messaging powered by cutting-edge AI.
                    <br />
                    Where human intelligence meets machine precision.
                </motion.p>

                {/* CTA Button */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.9 }}
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        marginBottom: '4rem',
                    }}
                >
                    <MagneticButton
                        style={{
                            padding: '1rem 2.5rem',
                            fontSize: '1.1rem',
                            fontWeight: '600',
                            background: 'linear-gradient(135deg, #00C6FF 0%, #0099CC 100%)',
                            border: 'none',
                            borderRadius: '12px',
                            color: '#fff',
                            boxShadow: '0 10px 40px rgba(0, 198, 255, 0.3)',
                            position: 'relative',
                            overflow: 'hidden',
                        }}
                        onClick={() => setShowPopup(true)}
                        magneticStrength={0.3}
                    >
                        <span style={{ position: 'relative', zIndex: 2 }}>Join Waitlist</span>

                        {/* Shine effect */}
                        <motion.div
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: '-100%',
                                width: '100%',
                                height: '100%',
                                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                                zIndex: 1,
                            }}
                            animate={{
                                left: ['100%', '200%'],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                repeatDelay: 1,
                                ease: 'linear',
                            }}
                        />
                    </MagneticButton>
                </motion.div>

                {/* Stats/Trust Indicators */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 1.1 }}
                    style={{
                        display: 'flex',
                        gap: '3rem',
                        justifyContent: 'center',
                        flexWrap: 'wrap',
                    }}
                >
                    {[
                        { icon: '🔒', label: 'Bank-Level Security' },
                        { icon: '⚡', label: 'Lightning Fast' },
                        { icon: '🌍', label: '25+ Countries' },
                    ].map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.2 + i * 0.1, duration: 0.5 }}
                            whileHover={{ scale: 1.1, color: '#00C6FF' }}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                fontSize: '0.95rem',
                                color: 'rgba(255, 255, 255, 0.6)',
                                cursor: 'default',
                            }}
                        >
                            <span style={{ fontSize: '1.2rem' }}>{item.icon}</span>
                            <span>{item.label}</span>
                        </motion.div>
                    ))}
                </motion.div>
            </motion.div>

            {/* Bottom Gradient Fade */}
            <div
                style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '200px',
                    background: 'linear-gradient(to top, rgba(0, 0, 0, 1), transparent)',
                    pointerEvents: 'none',
                }}
            />
        </motion.div>
    );
};

export default Hero;
