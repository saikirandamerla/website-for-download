import React from 'react';
import { styles } from '../styles';
import { ArrowLeft, MessageSquare, Bot, Lock, Sparkles, Layout, Command, RefreshCw } from 'lucide-react';

const FeaturesPage = ({ onBack }) => {
    return (
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
                Features
            </h1>

            <p style={{ fontSize: "1.2rem", color: "var(--text-secondary)", marginBottom: "4rem", maxWidth: "700px" }}>
                Discover the powerful tools that make Adjunct the future of secure communication.
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem" }}>
                {[
                    { icon: MessageSquare, title: "Dynamic Messaging", desc: "The Adjunct offers a dynamic chat facility with seamless mode-switching capabilities—ranging from privacy-focused to compatibility-enhanced modes. It ensures secure and reliable messaging, allowing users to communicate safely and confidently." },
                    { icon: Bot, title: "AI-Powered Intelligence", desc: "An intelligent companion designed to simplify your workflow and boost productivity. It streamlines your routine, offering smarter ways to stay organized and efficient. Focus on your priorities while intelligence works seamlessly in the background." },
                    { icon: Lock, title: "Asymmetric Encryption", desc: "This security model relies on a pair of keys: one public for encryption and one private for decryption. The advanced mathematics behind this process makes it virtually impossible to compromise, ensuring that your communication remains private, secure, and trustworthy." },
                    { icon: Sparkles, title: "Why Adjunct?", desc: "Adjunct is redefining what it means to connect in the digital age. With intelligence at its core, it transforms everyday communication into something fluid, intuitive, and forward-looking. No noise, no barriers—just a smarter, simpler way to interact and move forward." },
                    { icon: Layout, title: "AI-Powered Interface", desc: "Experience the future of communication with Adjunct, a platform designed to transform the way people connect. Built with intelligence at its core, it creates a seamless environment where conversations flow effortlessly, distractions fade away, and every interaction feels natural." },
                    { icon: Command, title: "Custom Commands", desc: "Adjunct makes technology effortless by turning simple language into meaningful action. Just say what you need—and it’s done, making work smarter, smoother, and seamless." },
                    { icon: RefreshCw, title: "Real-time Sync", desc: "Your conversations, preferences, and settings follow you wherever you go—ensuring a consistent, uninterrupted experience whether you’re on any mobile device." }
                ].map((feature, index) => (
                    <div key={index} style={{
                        background: "rgba(255, 255, 255, 0.03)",
                        border: "1px solid rgba(255, 255, 255, 0.05)",
                        borderRadius: "16px",
                        padding: "2rem",
                        backdropFilter: "blur(10px)"
                    }}>
                        <feature.icon size={32} color="var(--accent-primary)" style={{ marginBottom: "1rem" }} />
                        <h3 style={{ fontSize: "1.5rem", fontWeight: "600", marginBottom: "1rem" }}>{feature.title}</h3>
                        <p style={{ color: "var(--text-secondary)", lineHeight: "1.6" }}>{feature.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FeaturesPage;
