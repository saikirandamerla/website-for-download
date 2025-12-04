import React from 'react';
import { Menu, X } from "lucide-react";
import logoImg from "../assets/logo.png";
import { motion } from "framer-motion";

const Header = ({
    styles,
    responsiveStyles,
    isMobileView,
    mobileMenuOpen,
    toggleMobileMenu,
    closeMobileMenu,
    setShowPopup,
    setShowDocsPage,
    setShowFeaturesPage,
    setShowSecurityPage,
    setShowRoadmapPage
}) => {
    const handleNavClick = (setter) => {
        setter(true);
        setShowDocsPage(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        if (isMobileView) closeMobileMenu();
    };

    return (
        <motion.header
            style={styles.header}
            className="nav-shimmer"
            initial={{ y: -100, x: "-50%", opacity: 0 }}
            animate={{ y: 0, x: "-50%", opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
            <div style={styles.headerContent}>
                {/* Left: logo + navigation */}
                <div style={responsiveStyles.leftSection}>
                    <div
                        style={{ ...responsiveStyles.logo, cursor: "pointer" }}
                        onClick={() => {
                            setShowDocsPage(false);
                            setShowFeaturesPage(false);
                            setShowSecurityPage(false);
                            setShowRoadmapPage(false);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                    >
                        <img src={logoImg} alt="Logo" style={{ height: "40px", width: "auto" }} />
                        <span style={{ fontSize: "32px", fontWeight: "600", color: "#f5f5f5", display: "flex", alignItems: "center", lineHeight: "1" }}>djunct</span>
                    </div>
                    {/* Desktop Navigation */}
                    {!isMobileView && (
                        <nav style={styles.nav}>
                            <a style={{ ...styles.navLink, cursor: "pointer" }} onClick={() => handleNavClick(setShowFeaturesPage)}>Features</a>
                            <a style={{ ...styles.navLink, cursor: "pointer" }} onClick={() => handleNavClick(setShowSecurityPage)}>Security</a>
                            <a style={{ ...styles.navLink, cursor: "pointer" }} onClick={() => handleNavClick(setShowRoadmapPage)}>Roadmap</a>
                            <a
                                style={{ ...styles.navLink, cursor: "pointer" }}
                                onClick={() => document.querySelector('footer').scrollIntoView({ behavior: 'smooth' })}
                            >
                                Contact
                            </a>
                        </nav>
                    )}
                </div>

                {/* Right: CTA + Mobile Menu */}
                <div style={responsiveStyles.rightSection}>
                    <button
                        className="button-3d"
                        style={responsiveStyles.buttonSecondary}
                        onClick={() => setShowPopup(true)}
                    >
                        Get early access
                    </button>
                    {isMobileView && (
                        <button
                            style={responsiveStyles.mobileMenuButton}
                            onClick={toggleMobileMenu}
                        >
                            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    )}
                </div>
            </div>

            {/* Mobile Menu Backdrop */}
            {isMobileView && mobileMenuOpen && (
                <div
                    style={styles.mobileMenuBackdrop}
                    onClick={closeMobileMenu}
                />
            )}

            {/* Mobile Menu */}
            {isMobileView && mobileMenuOpen && (
                <div
                    key="mobile-menu"
                    style={styles.mobileMenu}
                >
                    <div style={styles.mobileNav}>
                        <a style={{ ...styles.mobileNavLink, cursor: "pointer" }} onClick={() => handleNavClick(setShowFeaturesPage)}>Features</a>
                        <a style={{ ...styles.mobileNavLink, cursor: "pointer" }} onClick={() => handleNavClick(setShowSecurityPage)}>Security</a>
                        <a style={{ ...styles.mobileNavLink, cursor: "pointer" }} onClick={() => handleNavClick(setShowRoadmapPage)}>Roadmap</a>
                        <a
                            style={{ ...styles.mobileNavLink, cursor: "pointer" }}
                            onClick={() => {
                                closeMobileMenu();
                                document.querySelector('footer').scrollIntoView({ behavior: 'smooth' });
                            }}
                        >
                            Contact
                        </a>
                    </div>
                    <button
                        className="button-3d"
                        style={{
                            ...styles.buttonPrimary,
                            width: "100%",
                            marginTop: "auto"
                        }}
                        onClick={() => {
                            closeMobileMenu();
                            setShowPopup(true);
                        }}
                    >
                        Get early access
                    </button>
                </div>
            )}
        </motion.header>
    );
};

export default Header;
