import React from 'react';
import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';

const Features = ({ styles, responsiveStyles, features, hoveredIndex, setHoveredIndex }) => {
    return (
        <>
            <section style={responsiveStyles.featuresGrid}>
                {features.map((f, i) => (
                    <Tilt key={i} tiltMaxAngleX={10} tiltMaxAngleY={10} perspective={1000} scale={1.05} transitionSpeed={1500}>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.5 }}
                            style={{
                                ...styles.featureCard,
                                height: '100%', // Ensure full height for tilt
                            }}
                            onMouseEnter={() => setHoveredIndex(i)}
                            onMouseLeave={() => setHoveredIndex(null)}
                        >
                            {f.icon}
                            <h3 style={styles.featureTitle}>{f.title}</h3>
                            <p style={styles.featureDesc}>{f.desc}</p>
                        </motion.div>
                    </Tilt>
                ))}
            </section>
            <motion.div
                id="whats-new"
                style={{ textAlign: "center", marginBottom: "4rem", marginTop: "2rem" }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                <h2 style={{
                    fontSize: "2.5rem",
                    fontWeight: "700",
                    marginBottom: "1.5rem",
                    color: "#fff",
                    textShadow: "0 0 20px rgba(255, 255, 255, 0.2)"
                }}>Features</h2>
                <p style={{
                    fontSize: "1.1rem",
                    lineHeight: "1.8",
                    color: "#ccc",
                    maxWidth: "800px",
                    margin: "0 auto"
                }}>
                    Adjunct isn’t just another chat tool—it’s an intelligent companion designed to make every conversation effortless and secure. You can exchange messages that feel natural and fluid, while advanced intelligence helps you craft the perfect response, keep track of what matters, and simplify your day-to-day interactions. Every message you share is wrapped in strong protection, ensuring your privacy remains untouched. The platform adapts to you—learning, guiding, and assisting—so your conversations become more engaging, interactive, and truly your own.
                </p>
            </motion.div>
        </>
    );
};

export default Features;
