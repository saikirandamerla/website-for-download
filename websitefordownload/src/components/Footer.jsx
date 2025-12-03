import React from 'react';
import { Twitter, Linkedin, Github, Mail, MapPin, Globe } from 'lucide-react';

const Footer = ({
    styles,
    responsiveStyles,
    onOpenTerms,
    onOpenFeatures,
    onOpenSecurity,
    onOpenRoadmap,
    onOpenPrivacyPolicy
}) => {
    return (
        <footer style={styles.footer}>
            <div style={responsiveStyles?.footerContainer || styles.footerContainer}>
                <div style={responsiveStyles?.footerContent || styles.footerContent}>
                    {/* Brand Column */}
                    <div style={styles.footerBrand}>
                        <h2 style={styles.footerLogo}>Adjunct</h2>
                        <p style={styles.footerDesc}>
                            Pioneering the future of AI communication.
                            Secure, intelligent, and designed for the modern world.
                        </p>
                        <div style={styles.socialLinks}>
                            <a href="https://x.com/Adjunctpa" style={styles.socialIcon}><Twitter size={20} /></a>
                            <a href="https://www.linkedin.com/company/adjunct-org/" style={styles.socialIcon}><Linkedin size={20} /></a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div style={responsiveStyles?.footerColumn || styles.footerColumn}>
                        <h3 style={styles.footerTitle}>Product</h3>
                        <div style={styles.footerLinks}>
                            <a href="#" onClick={(e) => { e.preventDefault(); onOpenFeatures && onOpenFeatures(); }} style={styles.footerLink}>Features</a>
                            <a href="#" onClick={(e) => { e.preventDefault(); onOpenSecurity && onOpenSecurity(); }} style={styles.footerLink}>Security</a>
                            <a href="#" onClick={(e) => { e.preventDefault(); onOpenRoadmap && onOpenRoadmap(); }} style={styles.footerLink}>Roadmap</a>
                        </div>
                    </div>

                    {/* Contact Info */}
                    <div style={responsiveStyles?.footerColumn || styles.footerColumn}>
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
                        <a
                            href="#"
                            style={styles.footerLink}
                            onClick={(e) => {
                                e.preventDefault();
                                if (onOpenPrivacyPolicy) onOpenPrivacyPolicy();
                            }}
                        >
                            Privacy Policy
                        </a>
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
