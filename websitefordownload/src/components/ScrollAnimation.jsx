import React, { useRef, useEffect } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';

// Animation presets
const animationPresets = {
    fadeIn: {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { duration: 0.6 },
    },
    fadeInUp: {
        initial: { opacity: 0, y: 50 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6, ease: 'easeOut' },
    },
    fadeInDown: {
        initial: { opacity: 0, y: -50 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6, ease: 'easeOut' },
    },
    fadeInLeft: {
        initial: { opacity: 0, x: -50 },
        animate: { opacity: 1, x: 0 },
        transition: { duration: 0.6, ease: 'easeOut' },
    },
    fadeInRight: {
        initial: { opacity: 0, x: 50 },
        animate: { opacity: 1, x: 0 },
        transition: { duration: 0.6, ease: 'easeOut' },
    },
    scaleIn: {
        initial: { opacity: 0, scale: 0.8 },
        animate: { opacity: 1, scale: 1 },
        transition: { duration: 0.6, type: 'spring', damping: 15 },
    },
    rotateIn: {
        initial: { opacity: 0, rotate: -10, scale: 0.9 },
        animate: { opacity: 1, rotate: 0, scale: 1 },
        transition: { duration: 0.6, type: 'spring' },
    },
    slideInLeft: {
        initial: { x: -100, opacity: 0 },
        animate: { x: 0, opacity: 1 },
        transition: { duration: 0.6, ease: 'easeOut' },
    },
    slideInRight: {
        initial: { x: 100, opacity: 0 },
        animate: { x: 0, opacity: 1 },
        transition: { duration: 0.6, ease: 'easeOut' },
    },
    zoomIn: {
        initial: { opacity: 0, scale: 0 },
        animate: { opacity: 1, scale: 1 },
        transition: { duration: 0.5, type: 'spring', damping: 20 },
    },
};

/**
 * ScrollAnimation Component
 * Triggers animations when element comes into view
 * 
 * @param {string} preset - Animation preset name (fadeIn, fadeInUp, scaleIn, etc.)
 * @param {number} delay - Delay before animation starts (in seconds)
 * @param {number} duration - Animation duration (in seconds)
 * @param {boolean} once - Whether animation should only happen once
 * @param {string} margin - Margin for intersection observer
 * @param {object} custom - Custom animation values (overrides preset)
 * @param {React.ReactNode} children - Child elements to animate
 */
const ScrollAnimation = ({
    children,
    preset = 'fadeInUp',
    delay = 0,
    duration,
    once = true,
    margin = '-100px',
    custom = {},
    className = '',
    style = {},
    ...props
}) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once, margin });
    const controls = useAnimation();

    const animation = animationPresets[preset] || animationPresets.fadeInUp;

    // Override with custom values if provided
    const finalAnimation = {
        initial: custom.initial || animation.initial,
        animate: custom.animate || animation.animate,
        transition: {
            ...(animation.transition || {}),
            ...(custom.transition || {}),
            delay: delay,
            duration: duration || animation.transition?.duration || 0.6,
        },
    };

    useEffect(() => {
        if (isInView) {
            controls.start('animate');
        } else if (!once) {
            controls.start('initial');
        }
    }, [isInView, controls, once]);

    return (
        <motion.div
            ref={ref}
            initial="initial"
            animate={controls}
            variants={{
                initial: finalAnimation.initial,
                animate: finalAnimation.animate,
            }}
            transition={finalAnimation.transition}
            className={className}
            style={style}
            {...props}
        >
            {children}
        </motion.div>
    );
};

/**
 * StaggerChildren Component
 * Animates children elements with staggered timing
 * 
 * @param {string} preset - Animation preset for children
 * @param {number} staggerDelay - Delay between each child animation (in seconds)
 * @param {boolean} once - Whether animation should only happen once
 * @param {React.ReactNode} children - Child elements to stagger
 */
export const StaggerChildren = ({
    children,
    preset = 'fadeInUp',
    staggerDelay = 0.1,
    once = true,
    margin = '-100px',
    className = '',
    style = {},
}) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once, margin });

    const containerVariants = {
        initial: {},
        animate: {
            transition: {
                staggerChildren: staggerDelay,
            },
        },
    };

    const animation = animationPresets[preset] || animationPresets.fadeInUp;

    const itemVariants = {
        initial: animation.initial,
        animate: animation.animate,
    };

    return (
        <motion.div
            ref={ref}
            initial="initial"
            animate={isInView ? 'animate' : 'initial'}
            variants={containerVariants}
            className={className}
            style={style}
        >
            {React.Children.map(children, (child, index) => (
                <motion.div
                    variants={itemVariants}
                    transition={{ ...animation.transition, delay: index * staggerDelay }}
                >
                    {child}
                </motion.div>
            ))}
        </motion.div>
    );
};

/**
 * ParallaxScroll Component
 * Creates parallax effect based on scroll position
 * 
 * @param {number} speed - Parallax speed multiplier (0.5 = half speed, 2 = double speed)
 * @param {string} direction - Direction of parallax ('vertical' or 'horizontal')
 * @param {React.ReactNode} children - Child elements
 */
export const ParallaxScroll = ({
    children,
    speed = 0.5,
    direction = 'vertical',
    className = '',
    style = {},
}) => {
    return (
        <motion.div
            initial={{ y: direction === 'vertical' ? 0 : undefined, x: direction === 'horizontal' ? 0 : undefined }}
            whileInView={{
                y: direction === 'vertical' ? `${speed * -20}%` : undefined,
                x: direction === 'horizontal' ? `${speed * -20}%` : undefined,
            }}
            viewport={{ once: false }}
            transition={{ duration: 0 }}
            className={className}
            style={style}
        >
            {children}
        </motion.div>
    );
};

export default ScrollAnimation;
