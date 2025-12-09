import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { easings } from '../utils/animations';

const ScrollReveal = ({
    children,
    direction = 'up',
    delay = 0,
    duration = 0.6,
    amount = 0.3,
    once = true,
}) => {
    const ref = useRef(null);
    const isInView = useInView(ref, {
        once,
        amount,
        margin: "-100px"
    });

    const directions = {
        up: { y: 60, x: 0 },
        down: { y: -60, x: 0 },
        left: { y: 0, x: 60 },
        right: { y: 0, x: -60 },
    };

    const { x: initialX, y: initialY } = directions[direction] || directions.up;

    return (
        <motion.div
            ref={ref}
            initial={{
                opacity: 0,
                y: initialY,
                x: initialX,
                scale: 0.95,
            }}
            animate={isInView ? {
                opacity: 1,
                y: 0,
                x: 0,
                scale: 1,
            } : {}}
            transition={{
                duration,
                delay,
                ease: easings.easeOutExpo,
            }}
        >
            {children}
        </motion.div>
    );
};

export default ScrollReveal;
