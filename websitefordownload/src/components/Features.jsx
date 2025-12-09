import React, { useRef, useState } from 'react';
import { motion, useInView, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { easings, springs } from '../utils/animations';

// SVG Morph Icon Component
const MorphingIcon = ({ paths, isHovered }) => {
    return (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
            <motion.path
                d={isHovered ? paths[1] : paths[0]}
                stroke="url(#iconGradient)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                initial={false}
                animate={{ d: isHovered ? paths[1] : paths[0] }}
                transition={springs.bouncy}
            />
            <defs>
                <linearGradient id="iconGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#00C6FF" />
                    <stop offset="100%" stopColor="#8B5CF6" />
                </linearGradient>
            </defs>
        </svg>
    );
};

// Individual Feature Card
const FeatureCard = ({ feature, index }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const [isHovered, setIsHovered] = useState(false);
    const [isSplit, setIsSplit] = useState(false);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), springs.smooth);
    const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), springs.smooth);

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        mouseX.set(x);
        mouseY.set(y);
    };

    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
        setIsHovered(false);
        setIsSplit(false);
    };

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 100, rotateX: -15 }}
            animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
            transition={{
                duration: 0.8,
                delay: index * 0.1,
                ease: easings.easeOutExpo,
            }}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
            onClick={() => setIsSplit(!isSplit)}
            style={{
                position: 'relative',
                perspective: 1000,
                cursor: 'pointer',
            }}
        >
            <motion.div
                className="iridescent-glass"
                style={{
                    padding: '2.5rem',
                    borderRadius: '24px',
                    position: 'relative',
                    overflow: 'hidden',
                    minHeight: '400px',
                    display: 'flex',
                    flexDirection: 'column',
                    transformStyle: 'preserve-3d',
                    rotateX,
                    rotateY,
                }}
                animate={{
                    z: isHovered ? 20 : 0,
                }}
                transition={springs.snappy}
            >
                {/* Animated gradient border */}
                <motion.div
                    style={{
                        position: 'absolute',
                        inset: '-2px',
                        borderRadius: '24px',
                        background: 'linear-gradient(135deg, #00C6FF, #8B5CF6, #FF0080, #00C6FF)',
                        backgroundSize: '300% 300%',
                        zIndex: -1,
                        filter: 'blur(15px)',
                    }}
                    animate={{
                        opacity: isHovered ? 1 : 0,
                        backgroundPosition: isHovered
                            ? ['0% 50%', '100% 50%', '0% 50%']
                            : '0% 50%',
                    }}
                    transition={{
                        opacity: springs.fast,
                        backgroundPosition: {
                            duration: 3,
                            repeat: Infinity,
                            ease: 'linear',
                        },
                    }}
                />

                {/* Floating particles */}
                <AnimatePresence>
                    {isHovered && [...Array(6)].map((_, i) => (
                        <motion.div
                            key={i}
                            initial={{
                                opacity: 0,
                                scale: 0,
                                x: 0,
                                y: 0,
                            }}
                            animate={{
                                opacity: [0, 1, 0],
                                scale: [0, 1, 0],
                                x: [0, (Math.random() - 0.5) * 100],
                                y: [0, (Math.random() - 0.5) * 100],
                            }}
                            exit={{ opacity: 0, scale: 0 }}
                            transition={{
                                duration: 1.5,
                                delay: i * 0.1,
                                repeat: Infinity,
                            }}
                            style={{
                                position: 'absolute',
                                width: '8px',
                                height: '8px',
                                borderRadius: '50%',
                                background: ['#00C6FF', '#8B5CF6', '#FF0080'][i % 3],
                                boxShadow: `0 0 10px ${['#00C6FF', '#8B5CF6', '#FF0080'][i % 3]}`,
                                top: '50%',
                                left: '50%',
                                pointerEvents: 'none',
                            }}
                        />
                    ))}
                </AnimatePresence>

                {/* Background image parallax */}
                {feature.bgImage && (
                    <motion.div
                        style={{
                            position: 'absolute',
                            inset: 0,
                            backgroundImage: `url(${feature.bgImage})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            opacity: 0.1,
                            filter: 'blur(20px)',
                        }}
                        animate={{
                            scale: isHovered ? 1.1 : 1,
                            x: mouseX.get() * 20,
                            y: mouseY.get() * 20,
                        }}
                        transition={springs.gentle}
                    />
                )}

                {/* Icon with morph */}
                <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={isInView ? { scale: 1, rotate: 0 } : {}}
                    transition={{
                        duration: 0.6,
                        delay: index * 0.1 + 0.3,
                        type: "spring",
                        stiffness: 200
                    }}
                    style={{
                        marginBottom: '2rem',
                        position: 'relative',
                        zIndex: 2,
                    }}
                    whileHover={{
                        scale: 1.1,
                        rotate: [0, -10, 10, 0],
                        transition: { duration: 0.5 },
                    }}
                >
                    <motion.div
                        style={{
                            display: 'inline-flex',
                            padding: '1.25rem',
                            borderRadius: '18px',
                            background: isHovered
                                ? 'linear-gradient(135deg, rgba(0, 198, 255, 0.2) 0%, rgba(139, 92, 246, 0.2) 100%)'
                                : 'linear-gradient(135deg, rgba(0, 198, 255, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)',
                            boxShadow: isHovered
                                ? '0 0 30px rgba(0, 198, 255, 0.4)'
                                : '0 0 15px rgba(0, 198, 255, 0.2)',
                        }}
                        animate={{
                            rotate: isHovered ? [0, 5, -5, 0] : 0,
                        }}
                        transition={{
                            duration: 0.5,
                            repeat: isHovered ? Infinity : 0,
                        }}
                    >
                        {/* Use passed icon or render placeholder */}
                        {feature.icon || <div style={{ width: 48, height: 48 }} />}
                    </motion.div>
                </motion.div>

                {/* Title */}
                <motion.h3
                    style={{
                        fontSize: '1.75rem',
                        fontWeight: '700',
                        marginBottom: '1rem',
                        color: '#fff',
                        position: 'relative',
                        zIndex: 2,
                    }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: index * 0.1 + 0.4, duration: 0.5 }}
                >
                    {feature.title}
                </motion.h3>

                {/* Description with mask reveal */}
                <motion.div
                    style={{
                        position: 'relative',
                        overflow: 'hidden',
                        flex: 1,
                        zIndex: 2,
                    }}
                >
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: index * 0.1 + 0.5, duration: 0.6 }}
                        style={{
                            color: 'var(--text-secondary)',
                            fontSize: '1rem',
                            lineHeight: '1.7',
                        }}
                    >
                        {feature.desc}
                    </motion.p>

                    {/* Gradient mask on hover */}
                    <motion.div
                        style={{
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            right: 0,
                            height: '50px',
                            background: 'linear-gradient(to top, rgba(10, 10, 10, 0.8), transparent)',
                        }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: isHovered ? 0 : 1 }}
                        transition={springs.fast}
                    />
                </motion.div>



                {/* Corner accents */}
                {isHovered && (
                    <>
                        <motion.div
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={springs.bouncy}
                            style={{
                                position: 'absolute',
                                top: '1rem',
                                right: '1rem',
                                width: '40px',
                                height: '40px',
                                borderTop: '2px solid #00C6FF',
                                borderRight: '2px solid #00C6FF',
                                borderRadius: '0 12px 0 0',
                            }}
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ ...springs.bouncy, delay: 0.05 }}
                            style={{
                                position: 'absolute',
                                bottom: '1rem',
                                left: '1rem',
                                width: '40px',
                                height: '40px',
                                borderBottom: '2px solid #8B5CF6',
                                borderLeft: '2px solid #8B5CF6',
                                borderRadius: '0 0 0 12px',
                            }}
                        />
                    </>
                )}
            </motion.div>
        </motion.div>
    );
};

// Features Grid
const Features = ({ features = [], styles, responsiveStyles }) => {
    return (
        <section style={{ padding: '6rem 0', position: 'relative' }}>
            {/* Section Header */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: easings.easeOutExpo }}
                style={{
                    textAlign: 'center',
                    marginBottom: '5rem',
                }}
            >
                <motion.h2
                    style={{
                        fontSize: '3.5rem',
                        fontWeight: '700',
                        marginBottom: '1.5rem',
                        background: 'linear-gradient(90deg, #00C6FF 0%, #8B5CF6 50%, #FF0080 100%)',
                        backgroundSize: '200% auto',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                    }}
                    animate={{
                        backgroundPosition: ['0% center', '200% center'],
                    }}
                    transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: 'linear',
                    }}
                >
                    Powerful Features
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    style={{
                        fontSize: '1.2rem',
                        color: 'var(--text-secondary)',
                        maxWidth: '650px',
                        margin: '0 auto',
                    }}
                >
                    Experience the next generation of intelligent communication
                </motion.p>
            </motion.div>

            {/* Features Grid */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
                gap: '2.5rem',
                padding: '0 2rem',
                maxWidth: '1400px',
                margin: '0 auto',
            }}>
                {features.map((feature, index) => (
                    <FeatureCard
                        key={index}
                        feature={feature}
                        index={index}
                    />
                ))}
            </div>
        </section>
    );
};

export default Features;
