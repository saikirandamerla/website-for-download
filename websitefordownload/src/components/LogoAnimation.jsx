import React from 'react';
import logoImg from "../assets/logo.png";

const LogoAnimation = ({ showLogoAnimation, styles }) => {
    if (!showLogoAnimation) return null;

    return (
        <div style={styles.logoAnimationContainer}>
            <div style={styles.animatedLogo}>
                <img
                    src={logoImg}
                    alt="Adjunct Logo"
                    style={styles.logoImage}
                />
                <span style={styles.logoText}>djunct</span>
            </div>
        </div>
    );
};

export default LogoAnimation;
