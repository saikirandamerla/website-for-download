import React from 'react';
import { Twitter, Linkedin, Github, Mail, MapPin, Globe } from 'lucide-react';

const Footer = ({ styles, onOpenTerms }) => {
    return (
        <footer style={styles.footer}>
            <div style={styles.footerContainer}>
                <div style={styles.footerContent}>
                    {/* Brand Column */}
                    <div style={styles.footerBrand}>
                        <h2 style={styles.footerLogo}>Adjunct</h2>
                        <p style={styles.footerDesc}>
                            Pioneering the future of AI communication.
                            Secure, intelligent, and designed for the modern world.
                        </p>
                        <div style={styles.socialLinks}>
                            <a href="#" style={styles.socialIcon}><Twitter size={20} /></a>
                            <a href="#" style={styles.socialIcon}><Linkedin size={20} /></a>
                            <a href="#" style={styles.socialIcon}><Github size={20} /></a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div style={styles.footerColumn}>
                        <h3 style={styles.footerTitle}>Product</h3>
                        <div style={styles.footerLinks}>
                            <a href="#" style={styles.footerLink}>Features</a>
                            <a href="#" style={styles.footerLink}>Security</a>
                            <a href="#" style={styles.footerLink}>Roadmap</a>
                            <a href="#" style={styles.footerLink}>Pricing</a>
                        </div>
                    </div>

                    {/* Company */}
                    <div style={styles.footerColumn}>
                        <h3 style={styles.footerTitle}>Company</h3>
                        <div style={styles.footerLinks}>
                            <a href="#" style={styles.footerLink}>About Us</a>
                            <a href="#" style={styles.footerLink}>Careers</a>
                            <a href="#" style={styles.footerLink}>Blog</a>
                            <a href="#" style={styles.footerLink}>Contact</a>
                        </div>
                    </div>

                    {/* Contact Info */}
                    <div style={styles.footerColumn}>
                        <h3 style={styles.footerTitle}>Contact Us</h3>
                        <div style={styles.footerLinks}>
                            <div style={styles.footerLink}>
                                <Mail size={16} color="#00C6FF" />
                                <span>contact@adjunct.in</span>
                            </div>
                            <div style={styles.footerLink}>
                                <MapPin size={16} color="#00C6FF" />
                                <span>India</span>
                            </div>
                            <div style={styles.footerLink}>
                                <Globe size={16} color="#00C6FF" />
                                <span>Available 24/7</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Copyright Row */}
                <div style={styles.copyright}>
                    <p>© {new Date().getFullYear()} Adjunct. All rights reserved.</p>
                    <div style={{ display: "flex", gap: "2rem" }}>
                        <a href="#" style={styles.footerLink}>Privacy Policy</a>
                        <a
                            href="#"
                            style={styles.footerLink}
                            onClick={(e) => {
                                e.preventDefault();
                                if (onOpenTerms) onOpenTerms();
                            }}
                        >
                            Terms of Service
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
