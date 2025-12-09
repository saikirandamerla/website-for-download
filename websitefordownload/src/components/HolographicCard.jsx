import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const HolographicCard = ({ children, style = {}, ...props }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const cardRef = useRef(null);
    const canvasRef = useRef(null);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const rotateX = useSpring(useMotionValue(0), { damping: 20, stiffness: 200 });
    const rotateY = useSpring(useMotionValue(0), { damping: 20, stiffness: 200 });

    // Particle system
    const particles = useRef([]);
    const animationFrameId = useRef(null);

    const handleMouseMove = (e) => {
        if (!cardRef.current) return;

        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateXValue = ((y - centerY) / centerY) * -15;
        const rotateYValue = ((x - centerX) / centerX) * 15;

        rotateX.set(rotateXValue);
        rotateY.set(rotateYValue);
        mouseX.set(x);
        mouseY.set(y);

        setMousePosition({ x, y });

        // Spawn particles on hover
        if (isHovered && Math.random() > 0.7) {
            spawnParticle(x, y);
        }
    };

    const handleMouseEnter = () => {
        setIsHovered(true);
        // Burst of particles on entry
        if (cardRef.current) {
            const rect = cardRef.current.getBoundingClientRect();
            for (let i = 0; i < 15; i++) {
                setTimeout(() => {
                    spawnParticle(
                        Math.random() * rect.width,
                        Math.random() * rect.height
                    );
                }, i * 20);
            }
        }
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        rotateX.set(0);
        rotateY.set(0);
    };

    const spawnParticle = (x, y) => {
        particles.current.push({
            x,
            y,
            vx: (Math.random() - 0.5) * 2,
            vy: -Math.random() * 3 - 1,
            life: 1,
            size: Math.random() * 4 + 2,
            hue: Math.random() * 60 + 180, // Cyan to purple
        });
    };

    const animateParticles = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.current = particles.current.filter(p => {
            p.x += p.vx;
            p.y += p.vy;
            p.life -= 0.02;

            if (p.life <= 0) return false;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = `hsla(${p.hue}, 100%, 60%, ${p.life})`;
            ctx.shadowBlur = 10;
            ctx.shadowColor = `hsla(${p.hue}, 100%, 60%, ${p.life})`;
            ctx.fill();

            return true;
        });

        animationFrameId.current = requestAnimationFrame(animateParticles);
    };

    useEffect(() => {
        animateParticles();
        return () => {
            if (animationFrameId.current) {
                cancelAnimationFrame(animationFrameId.current);
            }
        };
    }, []);

    useEffect(() => {
        if (cardRef.current && canvasRef.current) {
            const rect = cardRef.current.getBoundingClientRect();
            canvasRef.current.width = rect.width;
            canvasRef.current.height = rect.height;
        }
    }, []);

    return (
        <motion.div
            ref={cardRef}
            style={{
                ...style,
                position: 'relative',
                transformStyle: 'preserve-3d',
                perspective: 1000,
            }}
            animate={{
                rotateX: rotateX.get(),
                rotateY: rotateY.get(),
            }}
            whileHover={{
                scale: 1.05,
                boxShadow: '0 20px 40px rgba(0, 198, 255, 0.3), 0 0 20px rgba(0, 198, 255, 0.2)',
                borderColor: 'rgba(0, 198, 255, 0.5)',
            }}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            {...props}
        >
            {/* Holographic shimmer overlay */}
            {isHovered && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(135deg, rgba(0,198,255,0.1) 0%, rgba(139,92,246,0.1) 50%, rgba(0,198,255,0.1) 100%)',
                        backgroundSize: '200% 200%',
                        animation: 'shimmer 3s ease infinite',
                        borderRadius: 'inherit',
                        pointerEvents: 'none',
                        mixBlendMode: 'screen',
                    }}
                />
            )}

            {/* Glow trail following cursor */}
            {isHovered && (
                <div
                    style={{
                        position: 'absolute',
                        left: mousePosition.x,
                        top: mousePosition.y,
                        width: '100px',
                        height: '100px',
                        background: 'radial-gradient(circle, rgba(0,198,255,0.4) 0%, transparent 70%)',
                        transform: 'translate(-50%, -50%)',
                        pointerEvents: 'none',
                        filter: 'blur(20px)',
                        transition: 'left 0.1s, top 0.1s',
                    }}
                />
            )}

            {/* Particle canvas */}
            <canvas
                ref={canvasRef}
                style={{
                    position: 'absolute',
                    inset: 0,
                    pointerEvents: 'none',
                    borderRadius: 'inherit',
                }}
            />

            {/* Content */}
            <div style={{ position: 'relative', zIndex: 1 }}>
                {children}
            </div>

            <style>{`
                @keyframes shimmer {
                    0% { background-position: 0% 0%; }
                    50% { background-position: 100% 100%; }
                    100% { background-position: 0% 0%; }
                }
            `}</style>
        </motion.div>
    );
};

export default HolographicCard;
