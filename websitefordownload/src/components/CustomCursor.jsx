import React, { useEffect, useState } from 'react';

const CustomCursor = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const updatePosition = (e) => {
            setPosition({ x: e.clientX, y: e.clientY });
        };

        const handleMouseOver = (e) => {
            const target = e.target;
            if (
                target.tagName === 'BUTTON' ||
                target.tagName === 'A' ||
                target.closest('button') ||
                target.closest('a') ||
                target.classList.contains('clickable')
            ) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        window.addEventListener('mousemove', updatePosition);
        document.addEventListener('mouseover', handleMouseOver);

        return () => {
            window.removeEventListener('mousemove', updatePosition);
            document.removeEventListener('mouseover', handleMouseOver);
        };
    }, []);

    return (
        <>
            {/* Main cursor dot */}
            <div
                style={{
                    position: 'fixed',
                    left: position.x,
                    top: position.y,
                    width: isHovering ? '12px' : '8px',
                    height: isHovering ? '12px' : '8px',
                    borderRadius: '50%',
                    background: isHovering
                        ? 'radial-gradient(circle, #00C6FF 0%, #8B5CF6 100%)'
                        : '#00C6FF',
                    transform: 'translate(-50%, -50%)',
                    pointerEvents: 'none',
                    zIndex: 10000,
                    transition: 'width 0.2s ease, height 0.2s ease',
                    boxShadow: '0 0 10px rgba(0, 198, 255, 0.8)',
                }}
            />

            {/* Cursor ring */}
            <div
                style={{
                    position: 'fixed',
                    left: position.x,
                    top: position.y,
                    width: isHovering ? '40px' : '30px',
                    height: isHovering ? '40px' : '30px',
                    border: '2px solid rgba(0, 198, 255, 0.5)',
                    borderRadius: '50%',
                    transform: 'translate(-50%, -50%)',
                    pointerEvents: 'none',
                    zIndex: 9999,
                    transition: 'width 0.3s ease, height 0.3s ease, border-color 0.3s ease',
                    borderColor: isHovering ? 'rgba(139, 92, 246, 0.8)' : 'rgba(0, 198, 255, 0.5)',
                }}
            />
        </>
    );
};

export default CustomCursor;
