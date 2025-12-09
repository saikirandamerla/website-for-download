import React from 'react';
import { motion } from 'framer-motion';

const SkeletonLoader = ({
    variant = 'card',
    count = 1,
    className = '',
}) => {
    const variants = {
        card: {
            width: '100%',
            height: '200px',
            borderRadius: '16px',
        },
        text: {
            width: '100%',
            height: '20px',
            borderRadius: '4px',
        },
        title: {
            width: '60%',
            height: '32px',
            borderRadius: '8px',
        },
        circle: {
            width: '48px',
            height: '48px',
            borderRadius: '50%',
        },
        button: {
            width: '120px',
            height: '40px',
            borderRadius: '8px',
        },
    };

    const style = variants[variant] || variants.card;

    return (
        <>
            {Array.from({ length: count }).map((_, index) => (
                <motion.div
                    key={index}
                    className={className}
                    style={{
                        ...style,
                        background: 'linear-gradient(90deg, rgba(255,255,255,0.05) 25%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.05) 75%)',
                        backgroundSize: '200% 100%',
                        marginBottom: count > 1 ? '1rem' : 0,
                        position: 'relative',
                        overflow: 'hidden',
                    }}
                    animate={{
                        backgroundPosition: ['200% 0', '-200% 0'],
                    }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: 'linear',
                    }}
                />
            ))}
        </>
    );
};

// Preset layouts
export const SkeletonCard = () => (
    <div style={{ padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '16px' }}>
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
            <SkeletonLoader variant="circle" />
            <div style={{ flex: 1 }}>
                <SkeletonLoader variant="title" />
                <div style={{ marginTop: '0.5rem' }}>
                    <SkeletonLoader variant="text" />
                </div>
            </div>
        </div>
        <SkeletonLoader variant="text" count={3} />
    </div>
);

export default SkeletonLoader;
