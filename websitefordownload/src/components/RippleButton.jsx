import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const RippleButton = ({
    children,
    onClick,
    style = {},
    className = '',
    disabled = false,
    ...props
}) => {
    const [ripples, setRipples] = useState([]);

    const handleClick = (e) => {
        if (disabled) return;

        const button = e.currentTarget;
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const ripple = {
            x,
            y,
            id: Date.now() + Math.random(),
        };

        setRipples(prev => [...prev, ripple]);

        // Remove ripple after animation
        setTimeout(() => {
            setRipples(prev => prev.filter(r => r.id !== ripple.id));
        }, 600);

        if (onClick) onClick(e);
    };

    return (
        <motion.button
            onClick={handleClick}
            disabled={disabled}
            className={className}
            style={{
                position: 'relative',
                overflow: 'hidden',
                cursor: disabled ? 'not-allowed' : 'pointer',
                ...style,
            }}
            whileHover={!disabled ? { scale: 1.02 } : {}}
            whileTap={!disabled ? { scale: 0.98 } : {}}
            {...props}
        >
            {/* Button content */}
            <span style={{ position: 'relative', zIndex: 2 }}>
                {children}
            </span>

            {/* Ripples */}
            <AnimatePresence>
                {ripples.map((ripple) => (
                    <motion.span
                        key={ripple.id}
                        initial={{
                            scale: 0,
                            opacity: 1,
                        }}
                        animate={{
                            scale: 4,
                            opacity: 0,
                        }}
                        exit={{
                            opacity: 0,
                        }}
                        transition={{
                            duration: 0.6,
                            ease: [0.4, 0, 0.2, 1],
                        }}
                        style={{
                            position: 'absolute',
                            left: ripple.x,
                            top: ripple.y,
                            width: '20px',
                            height: '20px',
                            borderRadius: '50%',
                            background: 'radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 70%)',
                            transform: 'translate(-50%, -50%)',
                            pointerEvents: 'none',
                            zIndex: 1,
                        }}
                    />
                ))}
            </AnimatePresence>
        </motion.button>
    );
};

export default RippleButton;
