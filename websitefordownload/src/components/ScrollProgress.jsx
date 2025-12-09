import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ScrollProgress = () => {
    const progressBarRef = useRef(null);
    const [scrollPercent, setScrollPercent] = useState(0);

    useEffect(() => {
        const progressBar = progressBarRef.current;
        if (!progressBar) return;

        // GSAP ScrollTrigger for smooth progress update
        gsap.to(progressBar, {
            scaleX: () => {
                const scrolled = window.scrollY;
                const height = document.documentElement.scrollHeight - window.innerHeight;
                const percent = scrolled / height;
                setScrollPercent(Math.round(percent * 100));
                return percent;
            },
            ease: 'none',
            scrollTrigger: {
                trigger: document.body,
                start: 'top top',
                end: 'bottom bottom',
                scrub: 0.3,
                invalidateOnRefresh: true,
            },
        });

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    return (
        <>
            {/* Progress Bar */}
            <div
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '3px',
                    zIndex: 10000,
                    pointerEvents: 'none',
                    background: 'rgba(0, 0, 0, 0.1)',
                }}
            >
                <div
                    ref={progressBarRef}
                    style={{
                        height: '100%',
                        width: '100%',
                        background: 'linear-gradient(90deg, #00C6FF 0%, #8B5CF6 50%, #FF0080 100%)',
                        transformOrigin: 'left',
                        transform: 'scaleX(0)',
                        boxShadow: '0 0 10px rgba(0, 198, 255, 0.6), 0 0 20px rgba(139, 92, 246, 0.4)',
                    }}
                />
            </div>

            {/* Optional: Percentage indicator (subtle, bottom-right) */}
            {scrollPercent > 5 && (
                <div
                    style={{
                        position: 'fixed',
                        bottom: '2rem',
                        right: '2rem',
                        zIndex: 9999,
                        background: 'rgba(0, 0, 0, 0.6)',
                        backdropFilter: 'blur(10px)',
                        padding: '0.5rem 1rem',
                        borderRadius: '50px',
                        fontSize: '0.85rem',
                        color: '#00C6FF',
                        fontWeight: '600',
                        border: '1px solid rgba(0, 198, 255, 0.3)',
                        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)',
                        opacity: scrollPercent > 95 ? 0 : 0.7,
                        transition: 'opacity 0.3s',
                        pointerEvents: 'none',
                    }}
                >
                    {scrollPercent}%
                </div>
            )}
        </>
    );
};

export default ScrollProgress;
