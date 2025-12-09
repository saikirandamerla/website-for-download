import React from 'react';
import { ArrowLeft } from 'lucide-react';
import Tilt from 'react-parallax-tilt';

const PrivacyPolicyPage = ({ onBack }) => {
    return (
        <div style={{
            padding: "120px 20px 60px",
            maxWidth: "800px",
            margin: "0 auto",
            color: "#f5f5f5",
            fontFamily: "'Inter', sans-serif",
            minHeight: "100vh"
        }}>
            <button
                onClick={onBack}
                style={{
                    background: "none",
                    border: "none",
                    color: "var(--accent-primary)",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    fontSize: "1rem",
                    marginBottom: "2rem",
                    padding: 0
                }}
            >
                <ArrowLeft size={20} /> Back to Home
            </button>

            <h1 style={{ fontSize: "3rem", fontWeight: "700", marginBottom: "2rem", background: "linear-gradient(135deg, #fff 0%, #aaa 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Privacy Policy
            </h1>

            <div style={{ lineHeight: "1.8", color: "var(--text-secondary)" }}>
                <p style={{ marginBottom: "1.5rem" }}>
                    Last updated: {new Date().toLocaleDateString()}
                </p>

                <Tilt tiltMaxAngleX={3} tiltMaxAngleY={3} perspective={1000} scale={1.01} transitionSpeed={1500} style={{ marginBottom: "2.5rem" }}>
                    <section style={{
                        padding: "1.5rem",
                        background: "rgba(255, 255, 255, 0.02)",
                        borderRadius: "16px",
                        border: "1px solid rgba(255, 255, 255, 0.03)"
                    }}>
                        <h2 style={{ fontSize: "1.8rem", color: "#fff", marginBottom: "1rem" }}>1. Introduction</h2>
                        <p>
                            At Adjunct, we take your privacy seriously. This Privacy Policy explains how we collect, use, and protect your personal information when you use our secure messaging services. We are committed to ensuring that your data remains private and secure.
                        </p>
                    </section>
                </Tilt>

                <Tilt tiltMaxAngleX={3} tiltMaxAngleY={3} perspective={1000} scale={1.01} transitionSpeed={1500} style={{ marginBottom: "2.5rem" }}>
                    <section style={{
                        padding: "1.5rem",
                        background: "rgba(255, 255, 255, 0.02)",
                        borderRadius: "16px",
                        border: "1px solid rgba(255, 255, 255, 0.03)"
                    }}>
                        <h2 style={{ fontSize: "1.8rem", color: "#fff", marginBottom: "1rem" }}>2. Data Collection</h2>
                        <p>
                            We operate on a principle of data minimization. We only collect the absolute minimum amount of data necessary to provide our services.
                        </p>
                        <ul style={{ listStyle: "disc", paddingLeft: "1.5rem", marginTop: "1rem" }}>
                            <li><strong>Account Information:</strong> We may collect your email address or phone number solely for account creation and verification purposes.</li>
                            <li><strong>Usage Data:</strong> We collect anonymous, aggregated usage statistics to improve performance and reliability. This data cannot be traced back to individual users.</li>
                        </ul>
                    </section>
                </Tilt>

                <Tilt tiltMaxAngleX={3} tiltMaxAngleY={3} perspective={1000} scale={1.01} transitionSpeed={1500} style={{ marginBottom: "2.5rem" }}>
                    <section style={{
                        padding: "1.5rem",
                        background: "rgba(255, 255, 255, 0.02)",
                        borderRadius: "16px",
                        border: "1px solid rgba(255, 255, 255, 0.03)"
                    }}>
                        <h2 style={{ fontSize: "1.8rem", color: "#fff", marginBottom: "1rem" }}>3. End-to-End Encryption</h2>
                        <p>
                            Your messages, photos, videos, and files are protected by end-to-end encryption. This means that only you and the person you're communicating with can read what's sent. No one in between, not even Adjunct, can access your content.
                        </p>
                    </section>
                </Tilt>

                <Tilt tiltMaxAngleX={3} tiltMaxAngleY={3} perspective={1000} scale={1.01} transitionSpeed={1500} style={{ marginBottom: "2.5rem" }}>
                    <section style={{
                        padding: "1.5rem",
                        background: "rgba(255, 255, 255, 0.02)",
                        borderRadius: "16px",
                        border: "1px solid rgba(255, 255, 255, 0.03)"
                    }}>
                        <h2 style={{ fontSize: "1.8rem", color: "#fff", marginBottom: "1rem" }}>4. Zero Data Retention</h2>
                        <p>
                            We do not store your messages on our servers once they have been delivered. Messages are stored locally on your device. If a message cannot be delivered immediately (for example, if you are offline), we may store it in encrypted form on our servers for a limited time until it can be delivered.
                        </p>
                    </section>
                </Tilt>

                <Tilt tiltMaxAngleX={3} tiltMaxAngleY={3} perspective={1000} scale={1.01} transitionSpeed={1500} style={{ marginBottom: "2.5rem" }}>
                    <section style={{
                        padding: "1.5rem",
                        background: "rgba(255, 255, 255, 0.02)",
                        borderRadius: "16px",
                        border: "1px solid rgba(255, 255, 255, 0.03)"
                    }}>
                        <h2 style={{ fontSize: "1.8rem", color: "#fff", marginBottom: "1rem" }}>5. Third-Party Sharing</h2>
                        <p>
                            We do not sell, trade, or rent your personal identification information to others. We do not share your data with third parties for marketing purposes.
                        </p>
                    </section>
                </Tilt>

                <Tilt tiltMaxAngleX={3} tiltMaxAngleY={3} perspective={1000} scale={1.01} transitionSpeed={1500} style={{ marginBottom: "2.5rem" }}>
                    <section style={{
                        padding: "1.5rem",
                        background: "rgba(255, 255, 255, 0.02)",
                        borderRadius: "16px",
                        border: "1px solid rgba(255, 255, 255, 0.03)"
                    }}>
                        <h2 style={{ fontSize: "1.8rem", color: "#fff", marginBottom: "1rem" }}>6. Contact Us</h2>
                        <p>
                            If you have any questions about this Privacy Policy, please contact us at <a href="mailto:contact@adjunct.in" style={{ color: "var(--accent-primary)", textDecoration: "none" }}>contact@adjunct.in</a>.
                        </p>
                    </section>
                </Tilt>
            </div>
        </div>
    );
};

export default PrivacyPolicyPage;
