import React from "react";
import { motion } from "framer-motion";
import { ChevronLeft, Shield, FileText, Lock, AlertCircle, HelpCircle } from "lucide-react";

export default function TermsPage({ onBack, styles, responsiveStyles }) {
    const sections = [
        {
            title: "1. Acceptance of Terms",
            icon: <FileText size={20} color="#00C6FF" />,
            content: "By accessing and using Adjunct (\"the Service\"), you accept and agree to be bound by the terms and provision of this agreement. In addition, when using these particular services, you shall be subject to any posted guidelines or rules applicable to such services."
        },
        {
            title: "2. Description of Service",
            icon: <Shield size={20} color="#00C6FF" />,
            content: "Adjunct provides an AI-powered messaging platform that allows users to communicate securely. The Service includes features such as end-to-end encryption, AI assistance, and custom commands. We reserve the right to modify, suspend, or discontinue the Service at any time without notice."
        },
        {
            title: "3. User Responsibilities",
            icon: <AlertCircle size={20} color="#00C6FF" />,
            content: (
                <>
                    <p style={{ marginBottom: '1rem' }}>You agree to use the Service only for lawful purposes. You are prohibited from:</p>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                        {[
                            "Using the Service for any illegal or unauthorized purpose.",
                            "Attempting to bypass or break any security mechanism on the Service.",
                            "Transmitting any worms, viruses, or any code of a destructive nature.",
                            "Harassing, abusing, or harming another person."
                        ].map((item, index) => (
                            <li key={index} style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                marginBottom: '0.5rem',
                                color: 'rgba(255,255,255,0.7)'
                            }}>
                                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#00C6FF' }} />
                                {item}
                            </li>
                        ))}
                    </ul>
                </>
            )
        },
        {
            title: "4. Privacy Policy",
            icon: <Lock size={20} color="#00C6FF" />,
            content: "Your privacy is important to us. Our Privacy Policy explains how we collect, use, and protect your personal information. By using the Service, you agree to the collection and use of information in accordance with our Privacy Policy."
        },
        {
            title: "5. Intellectual Property",
            icon: <Shield size={20} color="#00C6FF" />,
            content: "The Service and its original content, features, and functionality are and will remain the exclusive property of Adjunct and its licensors. The Service is protected by copyright, trademark, and other laws."
        },
        {
            title: "6. Limitation of Liability",
            icon: <AlertCircle size={20} color="#00C6FF" />,
            content: "In no event shall Adjunct, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service."
        },
        {
            title: "7. Changes to Terms",
            icon: <FileText size={20} color="#00C6FF" />,
            content: "We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will try to provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion."
        },
        {
            title: "8. Contact Us",
            icon: <HelpCircle size={20} color="#00C6FF" />,
            content: (
                <>
                    If you have any questions about these Terms, please contact us at{" "}
                    <a
                        href="mailto:contact@adjunct.in"
                        style={{
                            color: "#00C6FF",
                            textDecoration: "none",
                            transition: "color 0.2s ease"
                        }}
                        onMouseEnter={(e) => e.target.style.color = "#0072FF"}
                        onMouseLeave={(e) => e.target.style.color = "#00C6FF"}
                    >
                        contact@adjunct.in
                    </a>.
                </>
            )
        }
    ];

    return (
        <div style={{
            ...styles.container,
            paddingTop: "100px",
            minHeight: "100vh",
            background: "transparent" // Assuming background is handled by App.jsx
        }}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                style={{
                    maxWidth: "900px",
                    margin: "0 auto",
                    padding: "0 1.5rem 4rem"
                }}
            >
                <div style={{ marginBottom: "3rem" }}>
                    <button
                        onClick={onBack}
                        style={{
                            ...styles.buttonSecondary,
                            marginBottom: "2rem",
                            padding: "0.5rem 1rem",
                            display: "flex",
                            alignItems: "center",
                            gap: "0.5rem",
                            width: "fit-content"
                        }}
                    >
                        <ChevronLeft size={18} /> Back to Home
                    </button>

                    <h1 style={{
                        fontSize: "3.5rem",
                        fontWeight: "700",
                        background: "linear-gradient(135deg, #fff 0%, #a5a5a5 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        marginBottom: "1rem",
                        letterSpacing: "-0.02em"
                    }}>
                        Terms of Service
                    </h1>
                    <p style={{
                        fontSize: "1.1rem",
                        color: "rgba(255,255,255,0.6)",
                        maxWidth: "600px",
                        lineHeight: "1.6"
                    }}>
                        Please read these terms carefully before using our service.
                    </p>
                </div>

                <div style={{ display: "grid", gap: "2rem" }}>
                    {sections.map((section, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            style={{
                                background: "rgba(255, 255, 255, 0.03)",
                                backdropFilter: "blur(10px)",
                                border: "1px solid rgba(255, 255, 255, 0.05)",
                                borderRadius: "20px",
                                padding: "2rem",
                                transition: "all 0.3s ease",
                                cursor: "default"
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)";
                                e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.1)";
                                e.currentTarget.style.transform = "translateY(-2px)";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background = "rgba(255, 255, 255, 0.03)";
                                e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.05)";
                                e.currentTarget.style.transform = "translateY(0)";
                            }}
                        >
                            <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
                                <div style={{
                                    padding: "0.5rem",
                                    background: "rgba(0, 198, 255, 0.1)",
                                    borderRadius: "10px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center"
                                }}>
                                    {section.icon}
                                </div>
                                <h2 style={{
                                    fontSize: "1.5rem",
                                    fontWeight: "600",
                                    color: "#fff",
                                    margin: 0
                                }}>
                                    {section.title}
                                </h2>
                            </div>
                            <div style={{
                                fontSize: "1.05rem",
                                lineHeight: "1.7",
                                color: "rgba(255, 255, 255, 0.7)",
                                paddingLeft: "3.5rem"
                            }}>
                                {typeof section.content === 'string' ? (
                                    <p style={{ margin: 0 }}>{section.content}</p>
                                ) : (
                                    section.content
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
}
