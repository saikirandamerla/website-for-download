import React, { useState, useEffect } from 'react';

const ChromaticAberration = ({ intensity = 3, children }) => {
    const [isEnabled, setIsEnabled] = useState(false);

    useEffect(() => {
        // Enable on scroll for performance
        const handleScroll = () => {
            const scrollVelocity = Math.abs(window.scrollY - (window.lastScrollY || 0));
            window.lastScrollY = window.scrollY;

            if (scrollVelocity > 5) {
                setIsEnabled(true);
                clearTimeout(window.chromaTimeout);
                window.chromaTimeout = setTimeout(() => setIsEnabled(false), 100);
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    if (!isEnabled) return children;

    return (
        <div style={{ position: 'relative' }}>
            {/* Red channel */}
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    transform: `translateX(-${intensity}px)`,
                    opacity: 0.8,
                    mixBlendMode: 'screen',
                    filter: 'brightness(1.2)',
                    color: 'red',
                }}
            >
                {children}
            </div>

            {/* Green channel (original) */}
            <div style={{ position: 'relative', zIndex: 2 }}>
                {children}
            </div>

            {/* Blue channel */}
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    transform: `translateX(${intensity}px)`,
                    opacity: 0.8,
                    mixBlendMode: 'screen',
                    filter: 'brightness(1.2)',
                    color: 'cyan',
                }}
            >
                {children}
            </div>
        </div>
    );
};

export default ChromaticAberration;
