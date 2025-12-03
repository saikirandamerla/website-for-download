import React from 'react';
import { Menu, X } from "lucide-react";
import logoImg from "../assets/logo.png";

const Header = ({
    styles,
    responsiveStyles,
    isMobileView,
    mobileMenuOpen,
    toggleMobileMenu,
    closeMobileMenu,
    setShowPopup,
    setShowDocsPage
}) => {
    return (
        <header style={styles.header} className="nav-shine">
            <div style={styles.headerContent}>
                {/* Left: logo + navigation */}
                <div style={responsiveStyles.leftSection}>
                    <div
                        style={{ ...responsiveStyles.logo, cursor: "pointer" }}
                        onClick={() => {
                            setShowDocsPage(false);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                    >
                        <img src={logoImg} alt="Logo" style={{ height: "40px", width: "auto" }} />
                        <span style={{ fontSize: "32px", fontWeight: "600", color: "#f5f5f5", display: "flex", alignItems: "center", lineHeight: "1" }}>djunct</span>
                    </div>
                    {/* Desktop Navigation */}
                    {!isMobileView && (
                        <nav style={styles.nav}>
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
        </header>
    );
};

export default Header;
