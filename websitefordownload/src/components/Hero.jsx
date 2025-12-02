import React from 'react';
import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';

const Hero = ({ styles, responsiveStyles, setShowPopup }) => {
    return (
        <div style={styles.heroWrapper}>
            <section style={responsiveStyles.hero}>
                <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5} perspective={1000} scale={1.02} transitionSpeed={2000}>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <h1 style={responsiveStyles.heroTitle}>
                            Adjunct - Pioneer the Future of AI Communication
                        </h1>
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
                </Tilt>
            </section>
        </div>
    );
};

export default Hero;
