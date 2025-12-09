import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const DepthOfField = () => {
    const { scrollYProgress } = useScroll();

    // Different blur amounts based on scroll position
    const bgBlur = useTransform(scrollYProgress, [0, 0.5, 1], [0, 3, 0]);
    const midBlur = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1.5, 0]);

    return (
        <>
            {/* Background layer - more blur */}
            <motion.div
                style={{
                    position: 'fixed',
                    inset: 0,
                    zIndex: -2,
                    filter: bgBlur,
                    pointerEvents: 'none',
                }}
            >
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'radial-gradient(ellipse at 20% 80%, rgba(139, 92, 246, 0.15), transparent 50%)',
                }} />
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'radial-gradient(ellipse at 80% 20%, rgba(0, 198, 255, 0.15), transparent 50%)',
                }} />
            </motion.div>

            {/* Mid layer - slight blur */}
            <motion.div
                style={{
                    position: 'fixed',
                    inset: 0,
                    zIndex: -1,
                    filter: midBlur,
                    pointerEvents: 'none',
                }}
            >
                <div style={{
                    position: 'absolute',
                    top: '30%',
                    right: '10%',
                    width: '200px',
                    height: '200px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(255, 0, 128, 0.1), transparent 70%)',
                }} />
            </motion.div>
        </>
    );
};

export default DepthOfField;
