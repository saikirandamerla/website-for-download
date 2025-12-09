import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Users, MessageSquare, Shield, Globe } from 'lucide-react';

const AnimatedCounter = ({ end, duration = 2, suffix = '', prefix = '' }) => {
    const [count, setCount] = useState(0);
    const [hasAnimated, setHasAnimated] = useState(false);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    useEffect(() => {
        if (isInView && !hasAnimated) {
            setHasAnimated(true);
            let startTime;
            const animate = (currentTime) => {
                if (!startTime) startTime = currentTime;
                const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);

                // Easing function for smooth animation
                const easeOutQuart = 1 - Math.pow(1 - progress, 4);
                setCount(Math.floor(easeOutQuart * end));

                if (progress < 1) {
                    requestAnimationFrame(animate);
                }
            };
            requestAnimationFrame(animate);
        }
    }, [isInView, end, duration, hasAnimated]);

    return (
        <span ref={ref} className="holographic-text">
            {prefix}{count.toLocaleString()}{suffix}
        </span>
    );
};

const CircularProgress = ({ percentage, size = 120, strokeWidth = 8 }) => {
    const [progress, setProgress] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    useEffect(() => {
        if (isInView) {
            const timer = setTimeout(() => {
                setProgress(percentage);
            }, 200);
            return () => clearTimeout(timer);
        }
    }, [isInView, percentage]);

    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const offset = circumference - (progress / 100) * circumference;

    return (
        <div ref={ref} style={{ position: 'relative', width: size, height: size }}>
            <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
                {/* Background circle */}
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke="rgba(255, 255, 255, 0.1)"
                    strokeWidth={strokeWidth}
                    fill="none"
                />
                {/* Progress circle with gradient */}
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke="url(#gradient)"
                    strokeWidth={strokeWidth}
                    fill="none"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                    style={{
                        transition: 'stroke-dashoffset 2s ease-out',
                        filter: 'drop-shadow(0 0 10px rgba(0, 198, 255, 0.6))',
                    }}
                />
                <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#00C6FF" />
                        <stop offset="50%" stopColor="#8B5CF6" />
                        <stop offset="100%" stopColor="#FF0080" />
                    </linearGradient>
                </defs>
            </svg>
            <div
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    fontSize: '1.5rem',
                    fontWeight: '700',
                    color: '#fff',
                    textShadow: '0 0 20px rgba(0, 198, 255, 0.8)',
                }}
            >
                {Math.round(progress)}%
            </div>
        </div>
    );
};

const StatCard = ({ icon: Icon, title, value, subtitle, delay, showCircular, percentage }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay }}
            className="iridescent-glass quantum-glow"
            style={{
                padding: '2.5rem 2rem',
                borderRadius: '24px',
                position: 'relative',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '1.5rem',
                textAlign: 'center',
                minHeight: '280px',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
            whileHover={{
                y: -5,
            }}
        >
            {/* Animated background gradient */}
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(135deg, rgba(0, 198, 255, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)',
                    opacity: 0,
                    transition: 'opacity 0.4s ease',
                }}
                className="hover-gradient"
            />

            {/* Icon with animation */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: delay + 0.2 }}
                style={{
                    position: 'relative',
                    zIndex: 2,
                }}
            >
                <div
                    className="holo-icon-glow"
                    style={{
                        padding: '1.5rem',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, rgba(0, 198, 255, 0.2) 0%, rgba(139, 92, 246, 0.2) 100%)',
                        border: '2px solid rgba(0, 198, 255, 0.3)',
                    }}
                >
                    <Icon size={40} color="#00C6FF" />
                </div>
            </motion.div>

            {/* Stat value or circular progress */}
            <div style={{ position: 'relative', zIndex: 2 }}>
                {showCircular ? (
                    <CircularProgress percentage={percentage} />
                ) : (
                    <motion.div
                        style={{
                            fontSize: '3rem',
                            fontWeight: '700',
                            lineHeight: '1',
                        }}
                    >
                        {value}
                    </motion.div>
                )}
            </div>

            {/* Title */}
            <h3
                style={{
                    fontSize: '1.25rem',
                    fontWeight: '600',
                    color: 'var(--text-primary)',
                    position: 'relative',
                    zIndex: 2,
                }}
            >
                {title}
            </h3>

            {/* Subtitle */}
            {subtitle && (
                <p
                    style={{
                        fontSize: '0.9rem',
                        color: 'var(--text-secondary)',
                        position: 'relative',
                        zIndex: 2,
                    }}
                >
                    {subtitle}
                </p>
            )}

            <style>{`
                .hover-gradient {
                    opacity: 0;
                }
                div:hover .hover-gradient {
                    opacity: 1;
                }
            `}</style>
        </motion.div>
    );
};

const AnimatedStats = () => {
    const stats = [
        {
            icon: Users,
            title: 'Active Waitlist',
            value: <AnimatedCounter end={5000} suffix="+" />,
            subtitle: 'Users excited for Adjunct',
            delay: 0.1,
        },
        {
            icon: MessageSquare,
            title: 'AI Responses',
            value: <AnimatedCounter end={1000000} suffix="+" />,
            subtitle: 'Intelligent interactions processed',
            delay: 0.2,
        },
        {
            icon: Shield,
            title: 'Security Level',
            showCircular: true,
            percentage: 99.9,
            subtitle: 'Military-grade encryption',
            delay: 0.3,
        },
        {
            icon: Globe,
            title: 'Global Reach',
            value: <AnimatedCounter end={25} suffix="+ Countries" />,
            subtitle: 'Expanding worldwide',
            delay: 0.4,
        },
    ];

    return (
        <section style={{ padding: '0', position: 'relative' }}>
            {/* Section header */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                style={{
                    textAlign: 'center',
                    marginBottom: '4rem',
                }}
            >
                <h2
                    className="chromatic-text"
                    style={{
                        fontSize: '2.5rem',
                        fontWeight: '700',
                        marginBottom: '1rem',
                        color: 'var(--text-primary)',
                    }}
                >
                    Powered by Innovation
                </h2>
                <p
                    style={{
                        fontSize: '1.1rem',
                        color: 'var(--text-secondary)',
                        maxWidth: '600px',
                        margin: '0 auto',
                    }}
                >
                    Real-time statistics showcasing Adjunct's impact and capabilities
                </p>
            </motion.div>

            {/* Stats grid */}
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: '2rem',
                    maxWidth: '1200px',
                    margin: '0 auto',
                }}
            >
                {stats.map((stat, index) => (
                    <StatCard key={index} {...stat} />
                ))}
            </div>
        </section>
    );
};

export default AnimatedStats;
