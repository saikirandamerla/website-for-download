import React from 'react';
import { motion } from 'framer-motion';
import logo from '../assets/logo.png';

const Footer = ({ styles, onOpenFeatures, onOpenSecurity, onOpenRoadmap, onOpenTerms, onOpenPrivacy }) => {
    return (
        <motion.footer
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            style={{
                background: 'linear-gradient(180deg, rgba(10, 10, 20, 0.95) 0%, rgba(5, 5, 15, 0.98) 100%)',
                backdropFilter: 'blur(20px)',
                borderTop: '1px solid rgba(0, 198, 255, 0.2)',
                padding: '4rem 2rem 2rem',
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            {/* Gradient overlay */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '200px',
                background: 'linear-gradient(180deg, rgba(0, 198, 255, 0.05) 0%, transparent 100%)',
                pointerEvents: 'none',
            }} />

            <div style={{
                maxWidth: '1200px',
                margin: '0 auto',
                position: 'relative',
                zIndex: 1,
            }}>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                    gap: '3rem',
                    marginBottom: '3rem',
                }}>
                    {/* Brand section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                    >
                        {/* Logo + Text like navbar */}
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.15rem',
                            marginBottom: '1rem',
                        }}>
                            <img
                                src={logo}
                                alt="A"
                                style={{
                                    height: '40px',
                                    width: 'auto',
                                }}
                            />
                            <span
                                className="holographic-text"
                                style={{
                                    fontSize: '1.5rem',
                                    fontWeight: '700',
                                    letterSpacing: '-0.02em',
                                }}
                            >
                                djunct
                            </span>
                        </div>
                        <p style={{
                            color: 'rgba(255, 255, 255, 0.6)',
                            lineHeight: '1.6',
                            fontSize: '0.95rem',
                        }}>
                            The future of AI-powered secure communication. Built for those who value privacy and intelligence.
                        </p>
                    </motion.div>

                    {/* Quick Links */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        <h4 style={{
                            fontSize: '1rem',
                            fontWeight: '600',
                            color: '#fff',
                            marginBottom: '1rem',
                            letterSpacing: '0.5px',
                        }}>Quick Links</h4>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                            {[
                                { label: 'Features', onClick: onOpenFeatures },
                                { label: 'Security', onClick: onOpenSecurity },
                                { label: 'Roadmap', onClick: onOpenRoadmap },
                            ].map((link, i) => (
                                <motion.li
                                    key={i}
                                    whileHover={{ x: 5 }}
                                    style={{ marginBottom: '0.75rem' }}
                                >
                                    <a
                                        href="#"
                                        onClick={(e) => { e.preventDefault(); link.onClick(); }}
                                        style={{
                                            color: 'rgba(255, 255, 255, 0.7)',
                                            textDecoration: 'none',
                                            fontSize: '0.95rem',
                                            transition: 'all 0.3s',
                                            display: 'inline-block',
                                        }}
                                        onMouseEnter={(e) => {
                                            e.target.style.color = '#00C6FF';
                                            e.target.style.textShadow = '0 0 10px rgba(0, 198, 255, 0.5)';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.target.style.color = 'rgba(255, 255, 255, 0.7)';
                                            e.target.style.textShadow = 'none';
                                        }}
                                    >
                                        {link.label}
                                    </a>
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Legal */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                    >
                        <h4 style={{
                            fontSize: '1rem',
                            fontWeight: '600',
                            color: '#fff',
                            marginBottom: '1rem',
                            letterSpacing: '0.5px',
                        }}>Legal</h4>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                            {[
                                { label: 'Privacy Policy', onClick: onOpenPrivacy },
                                { label: 'Terms of Service', onClick: onOpenTerms },
                            ].map((link, i) => (
                                <motion.li
                                    key={i}
                                    whileHover={{ x: 5 }}
                                    style={{ marginBottom: '0.75rem' }}
                                >
                                    <a
                                        href="#"
                                        onClick={(e) => { e.preventDefault(); link.onClick(); }}
                                        style={{
                                            color: 'rgba(255, 255, 255, 0.7)',
                                            textDecoration: 'none',
                                            fontSize: '0.95rem',
                                            transition: 'all 0.3s',
                                            display: 'inline-block',
                                        }}
                                        onMouseEnter={(e) => {
                                            e.target.style.color = '#8B5CF6';
                                            e.target.style.textShadow = '0 0 10px rgba(139, 92, 246, 0.5)';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.target.style.color = 'rgba(255, 255, 255, 0.7)';
                                            e.target.style.textShadow = 'none';
                                        }}
                                    >
                                        {link.label}
                                    </a>
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Contact */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                    >
                        <h4 style={{
                            fontSize: '1rem',
                            fontWeight: '600',
                            color: '#fff',
                            marginBottom: '1rem',
                            letterSpacing: '0.5px',
                        }}>Contact</h4>
                        <p style={{ color: 'rgba(255, 255, 255, 0.7)', marginBottom: '0.5rem', fontSize: '0.95rem' }}>
                            feedback@adjunct.in
                        </p>
                        <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.95rem' }}>
                            India
                        </p>
                    </motion.div>
                </div>

                {/* Bottom bar */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    style={{
                        textAlign: 'center',
                        paddingTop: '2rem',
                        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                        color: 'rgba(255, 255, 255, 0.5)',
                        fontSize: '0.9rem',
                    }}
                >
                    <p style={{ margin: 0 }}>
                        © 2025 Adjunct. All rights reserved.
                    </p>
                </motion.div>
            </div>
        </motion.footer>
    );
};

export default Footer;
