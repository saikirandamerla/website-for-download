import React from 'react';
import { styles } from '../styles';
import { ArrowLeft, Flag, Map, Rocket } from 'lucide-react';

const RoadmapPage = ({ onBack }) => {
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
                Roadmap
            </h1>

            <p style={{ fontSize: "1.2rem", color: "var(--text-secondary)", marginBottom: "4rem", maxWidth: "700px" }}>
                See what we're building next. Our journey is just beginning.
            </p>

            <div style={{ position: "relative", paddingLeft: "2rem", borderLeft: "2px solid rgba(255,255,255,0.1)" }}>
                {[
                    { icon: Flag, title: "Q1 2024: Beta Launch", desc: "Initial release to early access users with core encryption features.", status: "In Progress" },
                    { icon: Map, title: "Q2 2024: Mobile Apps", desc: "Native iOS and Android applications for secure messaging on the go.", status: "In Progress" },
                    { icon: Rocket, title: "Q3 2024: Enterprise API", desc: "SDKs for businesses to integrate secure messaging into their products.", status: "Planned" }
                ].map((item, index) => (
                    <div key={index} style={{ marginBottom: "3rem", position: "relative" }}>
                        <div style={{
                            position: "absolute",
                            left: "-2.6rem",
                            top: "0",
                            background: "#000",
                            border: "2px solid var(--accent-primary)",
                            borderRadius: "50%",
                            padding: "0.5rem",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                        }}>
                            <item.icon size={16} color="var(--accent-primary)" />
                        </div>
                        <span style={{
                            display: "inline-block",
                            padding: "4px 12px",
                            borderRadius: "20px",
                            background: item.status === "Completed" ? "rgba(34, 197, 94, 0.2)" : "rgba(0, 198, 255, 0.1)",
                            color: item.status === "Completed" ? "#22c55e" : "var(--accent-primary)",
                            fontSize: "0.8rem",
                            marginBottom: "0.5rem",
                            fontWeight: "600"
                        }}>
                            {item.status}
                        </span>
                        <h3 style={{ fontSize: "1.5rem", fontWeight: "600", marginBottom: "0.5rem" }}>{item.title}</h3>
                        <p style={{ color: "var(--text-secondary)", lineHeight: "1.6" }}>{item.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RoadmapPage;
