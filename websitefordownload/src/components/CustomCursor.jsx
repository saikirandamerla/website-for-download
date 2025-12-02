import React, { useEffect, useState, useRef } from 'react';

const CustomCursor = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [isClicking, setIsClicking] = useState(false);

    // Use refs for the ring to update directly for performance
    const ringRef = useRef(null);
    const dotRef = useRef(null);
    const ringPos = useRef({ x: 0, y: 0 });
    const targetPos = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const updatePosition = (e) => {
            setPosition({ x: e.clientX, y: e.clientY });
            targetPos.current = { x: e.clientX, y: e.clientY };

            if (!isVisible) setIsVisible(true);
        };

        const handleMouseEnter = () => setIsVisible(true);
        const handleMouseLeave = () => setIsVisible(false);
        const handleMouseDown = () => setIsClicking(true);
        const handleMouseUp = () => setIsClicking(false);

        // Check for hoverable elements
        const handleMouseOver = (e) => {
            const target = e.target;
            const isInteractive =
                target.tagName === 'BUTTON' ||
                target.tagName === 'A' ||
                target.tagName === 'INPUT' ||
                target.tagName === 'TEXTAREA' ||
                target.tagName === 'SELECT' ||
                target.closest('button') ||
                target.closest('a') ||
                window.getComputedStyle(target).cursor === 'pointer';

            setIsHovering(isInteractive);
        };

        window.addEventListener('mousemove', updatePosition);
        window.addEventListener('mouseenter', handleMouseEnter);
        window.addEventListener('mouseleave', handleMouseLeave);
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);
        window.addEventListener('mouseover', handleMouseOver);

        return () => {
            window.removeEventListener('mousemove', updatePosition);
            window.removeEventListener('mouseenter', handleMouseEnter);
            window.removeEventListener('mouseleave', handleMouseLeave);
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
            window.removeEventListener('mouseover', handleMouseOver);
        };
    }, [isVisible]);

    // Animation loop for the ring
    useEffect(() => {
        let animationFrameId;

        const animateRing = () => {
            // Lerp function for smooth following
            const lerp = (start, end, factor) => {
                return start + (end - start) * factor;
            };

            // Smoother trailing effect
            ringPos.current.x = lerp(ringPos.current.x, targetPos.current.x, 0.15);
            ringPos.current.y = lerp(ringPos.current.y, targetPos.current.y, 0.15);

            if (ringRef.current) {
                ringRef.current.style.transform = `translate(${ringPos.current.x}px, ${ringPos.current.y}px) translate(-50%, -50%)`;
            }

            if (dotRef.current) {
                dotRef.current.style.transform = `translate(${targetPos.current.x}px, ${targetPos.current.y}px) translate(-50%, -50%)`;
            }

            animationFrameId = requestAnimationFrame(animateRing);
        };

        animationFrameId = requestAnimationFrame(animateRing);

        return () => cancelAnimationFrame(animationFrameId);
    }, []);

    if (typeof window === 'undefined') return null;

    return (
        <>
            {/* Main Dot */}
            <div
                ref={dotRef}
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: isHovering ? '16px' : '12px',
                    height: isHovering ? '16px' : '12px',
                    backgroundColor: isHovering ? '#ffffff' : '#00C6FF',
                    borderRadius: '50%',
                    pointerEvents: 'none',
                    zIndex: 9999,
                    opacity: isVisible ? 1 : 0,
                    boxShadow: isHovering ? '0 0 15px rgba(255, 255, 255, 0.8)' : '0 0 10px rgba(0, 198, 255, 0.8)',
                    transition: 'width 0.2s ease, height 0.2s ease, background-color 0.2s ease, opacity 0.2s ease, box-shadow 0.2s ease',
                    mixBlendMode: 'difference', // Premium feel: visible on light/dark
                }}
            />

            {/* Trailing Ring */}
            <div
                ref={ringRef}
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: isClicking ? '20px' : (isHovering ? '60px' : '30px'),
                    height: isClicking ? '20px' : (isHovering ? '60px' : '30px'),
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    backgroundColor: isHovering ? 'rgba(255, 255, 255, 0.05)' : 'transparent',
                    borderRadius: '50%',
                    pointerEvents: 'none',
                    zIndex: 9998,
                    opacity: isVisible ? 1 : 0,
                    transition: 'width 0.3s cubic-bezier(0.25, 1, 0.5, 1), height 0.3s cubic-bezier(0.25, 1, 0.5, 1), background-color 0.3s ease, opacity 0.2s ease',
                    boxShadow: isHovering ? '0 0 30px rgba(0, 198, 255, 0.15)' : 'none',
                    mixBlendMode: 'difference',
                }}
            />
        </>
    );
};

export default CustomCursor;
