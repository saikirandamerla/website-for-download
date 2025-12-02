import React, { useState } from 'react';
import { styles } from '../styles';
import { motion } from 'framer-motion';
import { MessageSquare } from 'lucide-react';

const ReviewSection = () => {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            style={{
                backgroundColor: "rgba(255, 255, 255, 0.03)",
                backdropFilter: "blur(12px)",
                padding: "3rem",
                borderRadius: "24px",
                border: "1px solid rgba(255, 255, 255, 0.05)",
                margin: "4rem auto",
                maxWidth: "800px",
                textAlign: "center",
                boxShadow: "0 20px 40px -10px rgba(0,0,0,0.5)"
            }}
        >
            <h2 style={{
                color: "#ffffff",
                fontSize: "2.5rem",
                marginBottom: "1rem",
                fontWeight: "700",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "1rem"
            }}>
                <MessageSquare size={40} color="#00C6FF" style={{ filter: "drop-shadow(0 0 10px rgba(0, 198, 255, 0.5))" }} />
                Share Your Suggestions
            </h2>
            <p style={{ color: "#ccc", marginBottom: "2rem", fontSize: "1.1rem" }}>
                We'd love to hear your thoughts about <strong style={{ color: "#00C6FF" }}>Adjunct</strong>.
                we need your help us improve and grow.
            </p>

            <form onSubmit={(e) => { e.preventDefault(); alert("Thank you for your review!"); }}>
                <div style={{ marginBottom: "2rem" }}>
                    <textarea
                        placeholder="Write your review here..."
                        style={{
                            ...styles.modernInput,
                            minHeight: "120px",
                            resize: "none",
                            ...(isFocused ? styles.modernInputFocus : {})
                        }}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                    />
                </div>
                <div style={{ display: "flex", justifyContent: "center", gap: "1.5rem" }}>
                    <button
                        type="submit"
                        style={{
                            ...styles.gradientButton,
                            width: "auto",
                            padding: "0.875rem 3rem"
                        }}
                        className="button-3d"
                    >
                        Submit Review
                    </button>
                    <button
                        type="reset"
                        style={{
                            ...styles.buttonSecondary,
                            padding: "0.875rem 3rem",
                            borderColor: "rgba(255,255,255,0.2)"
                        }}
                    >
                        Clear
                    </button>
                </div>
            </form>
        </motion.div>
    );
};

export default ReviewSection;
