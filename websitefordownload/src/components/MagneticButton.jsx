import React, { useRef, useState, useEffect } from 'react';
import { motion, useSpring } from 'framer-motion';

const MagneticButton = ({
    children,
    onClick,
    style = {},
    className = '',
    magneticStrength = 0.3,
    ...props
}) => {
    const buttonRef = useRef(null);
    const [isHovered, setIsHovered] = useState(false);
    const [ripples, setRipples] = useState([]);

    // Spring animations for smooth magnetic effect
    const x = useSpring(0, { stiffness: 300, damping: 20 });
    const y = useSpring(0, { stiffness: 300, damping: 20 });

    const handleMouseMove = (e) => {
        if (!buttonRef.current) return;

        const rect = buttonRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const deltaX = e.clientX - centerX;
        const deltaY = e.clientY - centerY;

        // Apply magnetic pull effect
        x.set(deltaX * magneticStrength);
        y.set(deltaY * magneticStrength);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        x.set(0);
        y.set(0);
    };

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleClick = (e) => {
        if (!buttonRef.current) return;

        // Create ripple effect
        const rect = buttonRef.current.getBoundingClientRect();
        const rippleX = e.clientX - rect.left;
        const rippleY = e.clientY - rect.top;

        const newRipple = {
            x: rippleX,
            y: rippleY,
            id: Date.now(),
        };

        setRipples([...ripples, newRipple]);

        // Remove ripple after animation
        setTimeout(() => {
            setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
        }, 600);

        // Create particle burst
        createParticleBurst(e.clientX, e.clientY);

        if (onClick) onClick(e);
    };

    const createParticleBurst = (x, y) => {
        const particleCount = 12;
        const container = document.createElement('div');
        container.style.position = 'fixed';
        container.style.left = '0';
        container.style.top = '0';
        container.style.pointerEvents = 'none';
        container.style.zIndex = '9999';
        document.body.appendChild(container);

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            const angle = (Math.PI * 2 * i) / particleCount;
            const velocity = 100 + Math.random() * 50;

            particle.style.position = 'absolute';
            particle.style.left = `${x}px`;
            particle.style.top = `${y}px`;
            particle.style.width = '4px';
            particle.style.height = '4px';
            particle.style.borderRadius = '50%';
            particle.style.background = ['#00C6FF', '#8B5CF6', '#FF0080'][Math.floor(Math.random() * 3)];
            particle.style.boxShadow = `0 0 10px ${particle.style.background}`;
            particle.style.pointerEvents = 'none';

            container.appendChild(particle);

            // Animate particle
            const animation = particle.animate([
                {
                    transform: 'translate(0, 0) scale(1)',
                    opacity: 1
                },
                {
                    transform: `translate(${Math.cos(angle) * velocity}px, ${Math.sin(angle) * velocity}px) scale(0)`,
                    opacity: 0
                }
            ], {
                duration: 600,
                easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
            });

            animation.onfinish = () => {
                particle.remove();
            };
        }

        setTimeout(() => {
            container.remove();
        }, 700);
    };

    return (
        <motion.button
            ref={buttonRef}
            className={`magnetic-button ${className}`}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onMouseEnter={handleMouseEnter}
            onClick={handleClick}
            style={{
                ...style,
                x,
                y,
                position: 'relative',
                overflow: 'hidden',
            }}
            whileHover={{
                scale: 1.05,
                boxShadow: '0 0 30px rgba(0, 198, 255, 0.6), 0 0 60px rgba(139, 92, 246, 0.4)'
            }}
            whileTap={{ scale: 0.95 }}
            {...props}
        >
            {/* Ripple effects */}
            {ripples.map((ripple) => (
                <span
                    key={ripple.id}
                    style={{
                        position: 'absolute',
                        left: ripple.x,
                        top: ripple.y,
                        width: '10px',
                        height: '10px',
                        borderRadius: '50%',
                        background: 'radial-gradient(circle, rgba(0, 198, 255, 0.8) 0%, transparent 70%)',
                        transform: 'translate(-50%, -50%)',
                        animation: 'ripple-expand 0.6s ease-out forwards',
                        pointerEvents: 'none',
                    }}
                />
            ))}

            {/* Glow effect on hover */}
            {isHovered && (
                <span
                    style={{
                        position: 'absolute',
                        inset: '-2px',
                        background: 'linear-gradient(45deg, #00C6FF, #8B5CF6, #FF0080, #00C6FF)',
                        backgroundSize: '300% 300%',
                        borderRadius: 'inherit',
                        zIndex: -1,
                        opacity: 0.5,
                        filter: 'blur(10px)',
                        animation: 'gradient-rotate 3s ease infinite',
                        pointerEvents: 'none',
                    }}
                />
            )}

            {children}

            <style>{`
                @keyframes ripple-expand {
                    from {
                        width: 10px;
                        height: 10px;
                        opacity: 1;
                    }
                    to {
                        width: 300px;
                        height: 300px;
                        opacity: 0;
                    }
                }

                @keyframes gradient-rotate {
                    0%, 100% {
                        background-position: 0% 50%;
                    }
                    50% {
                        background-position: 100% 50%;
                    }
                }
            `}</style>
        </motion.button>
    );
};

export default MagneticButton;
