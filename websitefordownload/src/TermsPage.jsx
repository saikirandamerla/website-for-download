import React from "react";

export default function TermsPage({ onBack }) {
    const styles = {
        container: {
            backgroundColor: "#0d0d0d",
            minHeight: "100vh",
            color: "#f5f5f5",
            padding: "2rem",
            fontFamily: "'Outfit', sans-serif",
        },
        header: {
            display: "flex",
            alignItems: "center",
            marginBottom: "3rem",
            borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
            paddingBottom: "1rem",
        },
        backButton: {
            backgroundColor: "rgba(255, 255, 255, 0.05)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            color: "#ccc",
            padding: "0.5rem 1rem",
            cursor: "pointer",
            borderRadius: "8px",
            marginRight: "1rem",
            fontSize: "0.9rem",
            transition: "all 0.3s ease",
        },
        title: {
            fontSize: "2.5rem",
            fontWeight: "700",
            color: "#f5f5f5",
            margin: 0,
        },
        content: {
            maxWidth: "800px",
            margin: "0 auto",
        },
        section: {
            marginBottom: "3rem",
        },
        sectionTitle: {
            fontSize: "1.5rem",
            fontWeight: "600",
            color: "#22c55e",
            marginBottom: "1rem",
            borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
            paddingBottom: "0.5rem",
        },
        sectionContent: {
            fontSize: "1rem",
            lineHeight: "1.8",
            color: "#ccc",
        },
        list: {
            margin: "1rem 0",
            paddingLeft: "1.5rem",
        },
        listItem: {
            marginBottom: "0.5rem",
        },
    };

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <button
                    style={styles.backButton}
                    onClick={onBack}
                    onMouseEnter={(e) => e.target.style.backgroundColor = "rgba(255, 255, 255, 0.1)"}
                    onMouseLeave={(e) => e.target.style.backgroundColor = "rgba(255, 255, 255, 0.05)"}
                >
                    ← Back
                </button>
                <h1 style={styles.title}>Terms of Service</h1>
            </div>

            <div style={styles.content}>
                <div style={styles.section}>
                    <h2 style={styles.sectionTitle}>1. Acceptance of Terms</h2>
                    <div style={styles.sectionContent}>
                        <p>
                            By accessing and using Adjunct ("the Service"), you accept and agree to be bound by the terms and provision of this agreement. In addition, when using these particular services, you shall be subject to any posted guidelines or rules applicable to such services.
                        </p>
                    </div>
                </div>

                <div style={styles.section}>
                    <h2 style={styles.sectionTitle}>2. Description of Service</h2>
                    <div style={styles.sectionContent}>
                        <p>
                            Adjunct provides an AI-powered messaging platform that allows users to communicate securely. The Service includes features such as end-to-end encryption, AI assistance, and custom commands. We reserve the right to modify, suspend, or discontinue the Service at any time without notice.
                        </p>
                    </div>
                </div>

                <div style={styles.section}>
                    <h2 style={styles.sectionTitle}>3. User Responsibilities</h2>
                    <div style={styles.sectionContent}>
                        <p>You agree to use the Service only for lawful purposes. You are prohibited from:</p>
                        <ul style={styles.list}>
                            <li style={styles.listItem}>Using the Service for any illegal or unauthorized purpose.</li>
                            <li style={styles.listItem}>Attempting to bypass or break any security mechanism on the Service.</li>
                            <li style={styles.listItem}>Transmitting any worms, viruses, or any code of a destructive nature.</li>
                            <li style={styles.listItem}>Harassing, abusing, or harming another person.</li>
                        </ul>
                    </div>
                </div>

                <div style={styles.section}>
                    <h2 style={styles.sectionTitle}>4. Privacy Policy</h2>
                    <div style={styles.sectionContent}>
                        <p>
                            Your privacy is important to us. Our Privacy Policy explains how we collect, use, and protect your personal information. By using the Service, you agree to the collection and use of information in accordance with our Privacy Policy.
                        </p>
                    </div>
                </div>

                <div style={styles.section}>
                    <h2 style={styles.sectionTitle}>5. Intellectual Property</h2>
                    <div style={styles.sectionContent}>
                        <p>
                            The Service and its original content, features, and functionality are and will remain the exclusive property of Adjunct and its licensors. The Service is protected by copyright, trademark, and other laws.
                        </p>
                    </div>
                </div>

                <div style={styles.section}>
                    <h2 style={styles.sectionTitle}>6. Limitation of Liability</h2>
                    <div style={styles.sectionContent}>
                        <p>
                            In no event shall Adjunct, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.
                        </p>
                    </div>
                </div>

                <div style={styles.section}>
                    <h2 style={styles.sectionTitle}>7. Changes to Terms</h2>
                    <div style={styles.sectionContent}>
                        <p>
                            We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will try to provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
                        </p>
                    </div>
                </div>

                <div style={styles.section}>
                    <h2 style={styles.sectionTitle}>8. Contact Us</h2>
                    <div style={styles.sectionContent}>
                        <p>
                            If you have any questions about these Terms, please contact us at contact@adjunct.in.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
