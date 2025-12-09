import React from 'react';
import { motion } from 'framer-motion';
import screenshotImg from "../assets/Screenshot_2025-08-15_175401-removebg-preview.png";

const SecondFeatureCard = ({ feature, index, hoveredSecondIndex, setHoveredSecondIndex, isBig }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{
                delay: index * 0.1,
                duration: 0.5,
                ease: "easeOut"
            }}
            whileHover={{
                y: -8,
                transition: { duration: 0.3 }
            }}
            onMouseEnter={() => setHoveredSecondIndex(index)}
            onMouseLeave={() => setHoveredSecondIndex(null)}
            style={{
                position: "relative",
                flex: isBig ? 2 : 1,
                height: "100%"
            }}
        >
            <div style={{
                position: "relative",
                height: isBig ? "100%" : "100%",
                padding: isBig ? "2.5rem 2rem" : "1.5rem 1.5rem",
                background: hoveredSecondIndex === index
                    ? "linear-gradient(135deg, rgba(0, 198, 255, 0.08) 0%, rgba(15, 15, 30, 0.95) 30%, rgba(139, 92, 246, 0.08) 100%)"
                    : "linear-gradient(135deg, rgba(15, 15, 30, 0.9) 0%, rgba(20, 20, 35, 0.85) 100%)",
                backdropFilter: "blur(16px) saturate(140%)",
                borderRadius: "20px",
                border: hoveredSecondIndex === index
                    ? "1px solid rgba(0, 198, 255, 0.4)"
                    : "1px solid rgba(255, 255, 255, 0.06)",
                boxShadow: hoveredSecondIndex === index
                    ? "0 20px 50px rgba(0, 198, 255, 0.2), 0 0 30px rgba(139, 92, 246, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1)"
                    : "0 8px 25px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.05)",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between"
            }}>
                {/* Corner accents */}
                <div style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "50px",
                    height: "50px",
                    borderTop: `2px solid ${hoveredSecondIndex === index ? 'rgba(0, 198, 255, 0.6)' : 'rgba(0, 198, 255, 0.2)'}`,
                    borderLeft: `2px solid ${hoveredSecondIndex === index ? 'rgba(0, 198, 255, 0.6)' : 'rgba(0, 198, 255, 0.2)'}`,
                    borderTopLeftRadius: "20px",
                    transition: "all 0.3s ease"
                }}></div>

                <div style={{
                    position: "absolute",
                    bottom: 0,
                    right: 0,
                    width: "50px",
                    height: "50px",
                    borderBottom: `2px solid ${hoveredSecondIndex === index ? 'rgba(139, 92, 246, 0.6)' : 'rgba(139, 92, 246, 0.2)'}`,
                    borderRight: `2px solid ${hoveredSecondIndex === index ? 'rgba(139, 92, 246, 0.6)' : 'rgba(139, 92, 246, 0.2)'}`,
                    borderBottomRightRadius: "20px",
                    transition: "all 0.3s ease"
                }}></div>

                {/* Metallic shine */}
                <div className="metallic-shine" style={{
                    position: "absolute",
                    inset: 0,
                    borderRadius: "20px",
                    pointerEvents: "none",
                    opacity: hoveredSecondIndex === index ? 1 : 0,
                    transition: "opacity 0.3s ease"
                }}></div>

                {/* Big card image */}
                {isBig && (
                    <div style={{
                        marginBottom: "1.5rem",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        padding: "1rem",
                        background: "radial-gradient(circle, rgba(0, 198, 255, 0.05) 0%, transparent 70%)",
                        borderRadius: "16px"
                    }}>
                        <img
                            src={screenshotImg}
                            alt="Feature preview"
                            style={{
                                maxWidth: "100%",
                                maxHeight: "180px",
                                objectFit: "contain",
                                filter: hoveredSecondIndex === index
                                    ? "drop-shadow(0 0 30px rgba(0, 198, 255, 0.6)) drop-shadow(0 0 50px rgba(139, 92, 246, 0.3))"
                                    : "drop-shadow(0 0 15px rgba(0, 198, 255, 0.4))",
                                transition: "filter 0.3s ease",
                                borderRadius: "12px"
                            }}
                        />
                    </div>
                )}

                {/* Content Section */}
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem"
                }}>
                    {/* Icon */}
                    <motion.div
                        animate={{
                            scale: hoveredSecondIndex === index ? 1.05 : 1,
                        }}
                        transition={{ duration: 0.3 }}
                        style={{
                            fontSize: isBig ? "2.5rem" : "2rem",
                            color: "#00C6FF",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "flex-start",
                            filter: hoveredSecondIndex === index
                                ? "drop-shadow(0 0 15px rgba(0, 198, 255, 0.8)) drop-shadow(0 0 25px rgba(0, 198, 255, 0.4))"
                                : "drop-shadow(0 0 8px rgba(0, 198, 255, 0.5))",
                            transition: "filter 0.3s ease"
                        }}
                    >
                        {feature.icon}
                    </motion.div>

                    {/* Title */}
                    <h3 style={{
                        fontSize: isBig ? "1.4rem" : "1.1rem",
                        fontWeight: "600",
                        color: "#ffffff",
                        margin: 0,
                        marginBottom: "0.5rem",
                        lineHeight: "1.3",
                        letterSpacing: "-0.01em",
                        textShadow: hoveredSecondIndex === index
                            ? "0 0 20px rgba(0, 198, 255, 0.4), 0 2px 4px rgba(0, 0, 0, 0.6)"
                            : "0 2px 4px rgba(0, 0, 0, 0.5)",
                        transition: "text-shadow 0.3s ease"
                    }}>
                        {feature.title}
                    </h3>

                    {/* Description */}
                    <p style={{
                        fontSize: isBig ? "0.95rem" : "0.85rem",
                        lineHeight: "1.5",
                        color: "rgba(255, 255, 255, 0.75)",
                        margin: 0,
                        textShadow: "0 1px 2px rgba(0, 0, 0, 0.5)"
                    }}>
                        {feature.desc}
                    </p>
                </div>

                {/* Bottom glow bar */}
                <motion.div
                    animate={{
                        scaleX: hoveredSecondIndex === index ? 1 : 0,
                        opacity: hoveredSecondIndex === index ? 1 : 0
                    }}
                    transition={{ duration: 0.3 }}
                    style={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: "3px",
                        background: "linear-gradient(90deg, #00C6FF 0%, #8B5CF6 50%, #FF0080 100%)",
                        borderRadius: "0 0 20px 20px",
                        transformOrigin: "left"
                    }}
                />
            </div>
        </motion.div>
    );
};

const SecondFeatures = ({ styles, responsiveStyles, secondFeatures, hoveredSecondIndex, setHoveredSecondIndex }) => {
    return (
        <section style={responsiveStyles.secondFeaturesContainer}>
            <SecondFeatureCard
                feature={secondFeatures[0]}
                index={0}
                hoveredSecondIndex={hoveredSecondIndex}
                setHoveredSecondIndex={setHoveredSecondIndex}
                isBig={true}
            />

            <div style={responsiveStyles.smallBlocksContainer}>
                {secondFeatures.slice(1).map((f, i) => (
                    <SecondFeatureCard
                        key={i + 1}
                        feature={f}
                        index={i + 1}
                        hoveredSecondIndex={hoveredSecondIndex}
                        setHoveredSecondIndex={setHoveredSecondIndex}
                        isBig={false}
                    />
                ))}
            </div>
        </section>
    );
};

export default SecondFeatures;
