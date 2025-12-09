import React from 'react';
import { motion } from 'framer-motion';

const FogLayers = () => {
    return (
        <div style={{
            position: 'fixed',
            inset: 0,
            pointerEvents: 'none',
            zIndex: 0,
            overflow: 'hidden',
        }}>
            {/* Layer 1 - Close fog */}
            <motion.div
                animate={{
                    x: [-100, 100, -100],
                    opacity: [0.03, 0.06, 0.03],
                }}
                transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: 'linear',
                }}
                style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'radial-gradient(ellipse 120% 80% at 50% 50%, rgba(0, 198, 255, 0.08) 0%, transparent 60%)',
                    filter: 'blur(100px)',
                    transform: 'perspective(1000px) rotateX(5deg)',
                }}
            />

            {/* Layer 2 - Mid fog */}
            <motion.div
                animate={{
                    x: [100, -100, 100],
                    opacity: [0.02, 0.05, 0.02],
                }}
                transition={{
                    duration: 35,
                    repeat: Infinity,
                    ease: 'linear',
                }}
                style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'radial-gradient(ellipse 150% 100% at 30% 70%, rgba(139, 92, 246, 0.06) 0%, transparent 70%)',
                    filter: 'blur(120px)',
                    transform: 'perspective(1000px) rotateX(10deg)',
                }}
            />

            {/* Layer 3 - Far fog */}
            <motion.div
                animate={{
                    x: [-50, 50, -50],
                    y: [-30, 30, -30],
                    opacity: [0.01, 0.04, 0.01],
                }}
                transition={{
                    duration: 45,
                    repeat: Infinity,
                    ease: 'linear',
                }}
                style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'radial-gradient(ellipse 180% 120% at 70% 30%, rgba(255, 0, 128, 0.05) 0%, transparent 80%)',
                    filter: 'blur(140px)',
                    transform: 'perspective(1000px) rotateX(15deg)',
                }}
            />

            {/* Perspective grid fog */}
            <motion.div
                animate={{
                    opacity: [0.02, 0.04, 0.02],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
                style={{
                    position: 'absolute',
                    inset: 0,
                    background: `
                        linear-gradient(0deg, rgba(0, 198, 255, 0.03) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(0, 198, 255, 0.03) 1px, transparent 1px)
                    `,
                    backgroundSize: '100px 100px',
                    transform: 'perspective(500px) rotateX(60deg) translateZ(-100px)',
                    transformOrigin: 'center bottom',
                    filter: 'blur(2px)',
                }}
            />
        </div>
    );
};

export default FogLayers;
