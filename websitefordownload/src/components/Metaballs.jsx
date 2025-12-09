import React, { useEffect, useRef } from 'react';

const Metaballs = () => {
    const canvasRef = useRef(null);
    const ballsRef = useRef([]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        let animationFrameId;

        // Set canvas size
        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener('resize', resize);

        // Initialize metaballs
        const numBalls = 5;
        ballsRef.current = Array.from({ length: numBalls }, (_, i) => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            radius: 80 + Math.random() * 60,
            color: ['#00C6FF', '#8B5CF6', '#FF0080'][i % 3],
        }));

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Update ball positions
            ballsRef.current.forEach(ball => {
                ball.x += ball.vx;
                ball.y += ball.vy;

                // Bounce off edges
                if (ball.x < 0 || ball.x > canvas.width) ball.vx *= -1;
                if (ball.y < 0 || ball.y > canvas.height) ball.vy *= -1;
            });

            // Draw metaballs using pixel manipulation
            const imageData = ctx.createImageData(canvas.width, canvas.height);
            const data = imageData.data;

            for (let x = 0; x < canvas.width; x += 3) {
                for (let y = 0; y < canvas.height; y += 3) {
                    let sum = 0;

                    ballsRef.current.forEach(ball => {
                        const dx = x - ball.x;
                        const dy = y - ball.y;
                        const dist = Math.sqrt(dx * dx + dy * dy);
                        sum += (ball.radius * ball.radius) / (dist * dist);
                    });

                    if (sum > 1) {
                        const index = (y * canvas.width + x) * 4;
                        // Cyan-ish color
                        data[index] = 0;
                        data[index + 1] = 198;
                        data[index + 2] = 255;
                        data[index + 3] = Math.min(255, sum * 40);
                    }
                }
            }

            ctx.putImageData(imageData, 0, 0);

            // Apply blur
            ctx.filter = 'blur(40px)';
            ctx.drawImage(canvas, 0, 0);
            ctx.filter = 'none';

            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', resize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                zIndex: 0,
                opacity: 0.3,
                mixBlendMode: 'screen',
            }}
        />
    );
};

export default Metaballs;
