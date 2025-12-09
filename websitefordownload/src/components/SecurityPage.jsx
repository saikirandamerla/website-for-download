import React from 'react';
import { styles } from '../styles';
import { ArrowLeft, Shield, Lock, Key, Eye, Server, AlertTriangle } from 'lucide-react';
import Tilt from 'react-parallax-tilt';
import HolographicCard from './HolographicCard';
import CursorLight from './CursorLight';
import FogLayers from './FogLayers';
import DepthOfField from './DepthOfField';

const SecurityPage = ({ onBack }) => {
    return (
        <>
            <CursorLight />
            <FogLayers />
            <DepthOfField />

            <div style={{
                padding: "120px 20px 60px",
                maxWidth: "1000px",
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

                <h1 style={{ fontSize: "3rem", fontWeight: "700", marginBottom: "1.5rem", background: "linear-gradient(135deg, #fff 0%, #aaa 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                    Security
                </h1>

                <p style={{ fontSize: "1.2rem", color: "var(--text-secondary)", marginBottom: "4rem", maxWidth: "700px" }}>
                    Your privacy is our priority. We use state-of-the-art encryption to keep your conversations safe.
                </p>

                <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "2rem" }}>
                    {/* Main Encryption Block */}
                    <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5} perspective={1000} scale={1.02} transitionSpeed={1500}>
                        <div style={{
                            background: "rgba(255, 255, 255, 0.03)",
                            border: "1px solid rgba(255, 255, 255, 0.05)",
                            borderRadius: "24px",
                            padding: "3rem",
                            backdropFilter: "blur(10px)",
                            textAlign: "center",
                            height: "100%"
                        }}>
                            <Lock size={64} color="var(--accent-primary)" style={{ marginBottom: "2rem" }} />
                            <h2 style={{ fontSize: "2rem", fontWeight: "700", marginBottom: "1.5rem" }}>Asymmetric Encryption</h2>
                            <p style={{ fontSize: "1.2rem", color: "var(--text-secondary)", lineHeight: "1.8", maxWidth: "800px", margin: "0 auto" }}>
                                This security model relies on a pair of keys: one public for encryption and one private for decryption. The advanced mathematics behind this process makes it virtually impossible to compromise, ensuring that your communication remains private, secure, and trustworthy.
                            </p>
                        </div>
                    </Tilt>

                    {/* How It Works & Zero Data Grid */}
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem" }}>
                        <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5} perspective={1000} scale={1.02} transitionSpeed={1500}>
                            <div style={{
                                background: "rgba(255, 255, 255, 0.03)",
                                border: "1px solid rgba(255, 255, 255, 0.05)",
                                borderRadius: "24px",
                                padding: "2.5rem",
                                backdropFilter: "blur(10px)",
                                height: "100%"
                            }}>
                                <Key size={40} color="#22c55e" style={{ marginBottom: "1.5rem" }} />
                                <h3 style={{ fontSize: "1.5rem", fontWeight: "600", marginBottom: "1rem" }}>How it Works</h3>
                                <p style={{ color: "var(--text-secondary)", lineHeight: "1.6" }}>
                                    When you send a message, it is locked with the recipient's <strong>Public Key</strong>. This message can only be unlocked by the recipient's corresponding <strong>Private Key</strong>, which never leaves their device. Even we cannot read your messages.
                                </p>
                            </div>
                        </Tilt>

                        <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5} perspective={1000} scale={1.02} transitionSpeed={1500}>
                            <div style={{
                                background: "rgba(255, 255, 255, 0.03)",
                                border: "1px solid rgba(255, 255, 255, 0.05)",
                                borderRadius: "24px",
                                padding: "2.5rem",
                                backdropFilter: "blur(10px)",
                                height: "100%"
                            }}>
                                <EyeOff size={40} color="#ef4444" style={{ marginBottom: "1.5rem" }} />
                                <h3 style={{ fontSize: "1.5rem", fontWeight: "600", marginBottom: "1rem" }}>Zero Data Retention</h3>
                                <p style={{ color: "var(--text-secondary)", lineHeight: "1.6" }}>
                                    We believe in privacy by design. We do not store your messages on our servers after they are delivered. Once a message reaches its destination, it is wiped from our systems forever.
                                </p>
                            </div>
                        </Tilt>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SecurityPage;
