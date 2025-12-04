import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const HolographicText = ({ text, styles }) => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 25, stiffness: 150 };
    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]), springConfig);
    const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), springConfig);

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseXVal = (e.clientX - rect.left) / width - 0.5;
        const mouseYVal = (e.clientY - rect.top) / height - 0.5;
        mouseX.set(mouseXVal);
        mouseY.set(mouseYVal);
    };

    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
    };

    const words = text.split(" ");

    return (
        <motion.div
            style={{
                perspective: 1000,
                display: 'inline-block',
                cursor: 'default'
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            <motion.h1
                style={{
                    ...styles,
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center', // Center the text
                    gap: '0.5rem', // Space between words
                    rotateX,
                    rotateY,
                    transformStyle: "preserve-3d",
                }}
            >
                {words.map((word, i) => (
                    <Word key={i} word={word} index={i} />
                ))}
            </motion.h1>
        </motion.div>
    );
};

const Word = ({ word, index }) => {
    return (
        <motion.span
            style={{ display: "inline-block", transformStyle: "preserve-3d" }}
            initial={{ opacity: 0, z: -100, rotateX: 90 }}
            animate={{ opacity: 1, z: 0, rotateX: 0 }}
            transition={{
                duration: 0.8,
                delay: index * 0.1,
                type: "spring",
                damping: 12
            }}
        >
            {word.split("").map((char, i) => (
                <motion.span
                    key={i}
                    style={{
                        display: "inline-block",
                        textShadow: "0 0 5px rgba(0, 198, 255, 0.5), 0 0 10px rgba(0, 198, 255, 0.3)",
                    }}
                    animate={{
                        textShadow: [
                            "0 0 5px rgba(0, 198, 255, 0.5), 0 0 10px rgba(0, 198, 255, 0.3)",
                            "0 0 10px rgba(0, 198, 255, 0.8), 0 0 20px rgba(0, 198, 255, 0.5)",
                            "0 0 5px rgba(0, 198, 255, 0.5), 0 0 10px rgba(0, 198, 255, 0.3)",
                        ],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: i * 0.05,
                    }}
                >
                    {char}
                </motion.span>
            ))}
        </motion.span>
    );
};

const Hero = ({ styles, responsiveStyles, setShowPopup }) => {
    return (
        <div style={styles.heroWrapper}>
            <section style={responsiveStyles.hero}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <HolographicText
                        text="Adjunct - Pioneer the Future of AI Communication"
                        styles={responsiveStyles.heroTitle}
                    />

                    <p style={responsiveStyles.heroText}>
                        Human Intelligence, AI Precision, Perfectly Fused. The messaging
                        app that uses the AI which does the work easy and provides the
                        privacy than any other. Not just the guidance, It's the
                        performance.
                    </p>
                    <motion.button
                        className="button-3d"
                        style={responsiveStyles.buttonPrimary}
                        onClick={() => setShowPopup(true)}
                        whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(0, 114, 255, 0.6)" }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Join Waitlist
                    </motion.button>
                </motion.div>
            </section>
        </div>
    );
};

export default Hero;
