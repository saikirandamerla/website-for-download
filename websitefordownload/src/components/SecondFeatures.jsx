import React from 'react';
import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import screenshotImg from "../assets/Screenshot_2025-08-15_175401-removebg-preview.png";

const SecondFeatures = ({ styles, responsiveStyles, secondFeatures, hoveredSecondIndex, setHoveredSecondIndex }) => {
    return (
        <section style={responsiveStyles.secondFeaturesContainer}>
            {/* Big block on left */}
            <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5} perspective={1000} scale={1.02} transitionSpeed={1500} style={{ flex: 2, display: 'flex' }}>
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    style={{
                        ...responsiveStyles.bigBlock,
                        height: '100%',
                    }}
                    onMouseEnter={() => setHoveredSecondIndex(0)}
                    onMouseLeave={() => setHoveredSecondIndex(null)}
                >
                    <div style={responsiveStyles.bigBlockImage}>
                        <img
                            src={screenshotImg}
                            alt="Feature preview"
                            style={{
                                maxWidth: "100%",
                                maxHeight: "300px",
                                objectFit: "contain",
                                filter: "drop-shadow(0 0 20px rgba(0, 114, 255, 0.3))"
                            }}
                        />
                    </div>
                    <div style={responsiveStyles.bigBlockContent}>
                        {secondFeatures[0].icon}
                        <h3 style={styles.featureTitle}>{secondFeatures[0].title}</h3>
                        <p style={styles.featureDesc}>{secondFeatures[0].desc}</p>
                    </div>
                </motion.div>
            </Tilt>

            {/* Four smaller stacked blocks on right */}
            <div style={responsiveStyles.smallBlocksContainer}>
                {secondFeatures.slice(1).map((f, i) => (
                    <Tilt key={i + 1} tiltMaxAngleX={10} tiltMaxAngleY={10} perspective={1000} scale={1.05} transitionSpeed={1500} style={{ flex: 1, display: 'flex' }}>
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.5 }}
                            style={{
                                ...responsiveStyles.smallBlock,
                                height: '100%',
                            }}
                            onMouseEnter={() => setHoveredSecondIndex(i + 1)}
                            onMouseLeave={() => setHoveredSecondIndex(null)}
                        >
                            {f.icon}
                            <h3 style={styles.featureTitle}>{f.title}</h3>
                            <p style={styles.featureDesc}>{f.desc}</p>
                        </motion.div>
                    </Tilt>
                ))}
            </div>
        </section>
    );
};

export default SecondFeatures;
