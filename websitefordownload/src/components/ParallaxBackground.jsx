import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const ParallaxBackground = () => {
    const { scrollY } = useScroll();

    // Different speeds for each layer
    const y1 = useTransform(scrollY, [0, 1000], [0, 200]);
    const y2 = useTransform(scrollY, [0, 1000], [0, 150]);
    const y3 = useTransform(scrollY, [0, 1000], [0, 100]);
    const y4 = useTransform(scrollY, [0, 1000], [0, 50]);

    const rotate1 = useTransform(scrollY, [0, 1000], [0, 45]);
    const rotate2 = useTransform(scrollY, [0, 1000], [0, -30]);

    return (
        <div style={{
            position: 'fixed',
            inset: 0,
            zIndex: -1,
            overflow: 'hidden',
            pointerEvents: 'none',
        }}>
            {/* Base gradient */}
            <div style={{
                position: 'absolute',
                inset: 0,
                background: 'radial-gradient(circle at 50% 50%, rgba(10, 10, 30, 1) 0%, rgba(0, 0, 0, 1) 100%)',
            }} />

            {/* Layer 1: Fast gradient orbs */}
            <motion.div
                style={{
                    position: 'absolute',
                    inset: 0,
                    y: y1,
                }}
            >
                <div style={{
                    position: 'absolute',
                    top: '20%',
                    left: '10%',
                    width: '400px',
                    height: '400px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(0, 198, 255, 0.15) 0%, transparent 70%)',
                    filter: 'blur(60px)',
                }} />
                <div style={{
                    position: 'absolute',
                    top: '60%',
                    right: '15%',
                    width: '500px',
                    height: '500px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 70%)',
                    filter: 'blur(60px)',
                }} />
            </motion.div>

            {/* Layer 2: Medium speed orbs */}
            <motion.div
                style={{
                    position: 'absolute',
                    inset: 0,
                    y: y2,
                }}
            >
                <div style={{
                    position: 'absolute',
                    top: '40%',
                    right: '20%',
                    width: '350px',
                    height: '350px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(255, 0, 128, 0.12) 0%, transparent 70%)',
                    filter: 'blur(50px)',
                }} />
                <div style={{
                    position: 'absolute',
                    bottom: '20%',
                    left: '20%',
                    width: '400px',
                    height: '400px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(0, 255, 136, 0.12) 0%, transparent 70%)',
                    filter: 'blur(50px)',
                }} />
            </motion.div>

            {/* Layer 3: Slow geometric shapes */}
            <motion.div
                style={{
                    position: 'absolute',
                    inset: 0,
                    y: y3,
                    opacity: 0.06,
                }}
            >
                <motion.div
                    style={{
                        position: 'absolute',
                        top: '25%',
                        left: '15%',
                        width: '100px',
                        height: '100px',
                        border: '2px solid #00C6FF',
                        borderRadius: '16px',
                        rotate: rotate1,
                    }}
                />
                <motion.div
                    style={{
                        position: 'absolute',
                        top: '65%',
                        right: '20%',
                        width: '80px',
                        height: '80px',
                        border: '2px solid #8B5CF6',
                        borderRadius: '50%',
                        rotate: rotate2,
                    }}
                />
            </motion.div>

            {/* Layer 4: Very slow grid overlay */}
            <motion.div
                style={{
                    position: 'absolute',
                    inset: 0,
                    y: y4,
                    backgroundImage: `
                        linear-gradient(rgba(0, 198, 255, 0.02) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(0, 198, 255, 0.02) 1px, transparent 1px)
                    `,
                    backgroundSize: '80px 80px',
                    opacity: 0.5,
                }}
            />
        </div>
    );
};

export default ParallaxBackground;
