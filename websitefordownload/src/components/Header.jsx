import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useScrollDirection, springs, easings } from '../utils/animations';
import logo from '../assets/logo.png';

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
    setShowRoadmapPage,
}) => {
    const scrollDirection = useScrollDirection();
    const [activeIndex, setActiveIndex] = useState(null);

    const navItems = [
        { label: 'Features', onClick: () => { setShowFeaturesPage(true); closeMobileMenu(); } },
        { label: 'Security', onClick: () => { setShowSecurityPage(true); closeMobileMenu(); } },
        { label: 'Docs', onClick: () => { setShowDocsPage(true); closeMobileMenu(); } },
        { label: 'Roadmap', onClick: () => { setShowRoadmapPage(true); closeMobileMenu(); } },
    ];

    return (
        <>
            <motion.header
                initial={{ y: -100, opacity: 0, x: '-50%' }}
                animate={{
                    y: scrollDirection === 'down' && !isMobileView ? -100 : 0,
                    opacity: 1,
                    x: '-50%',
                }}
                transition={{ duration: 0.3, ease: easings.easeOutCubic }}
                style={{
                    ...styles.header,
                    left: '50%',
                }}
            >
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '100%',
                    height: '64px',
                    position: 'relative',
                    padding: '0 1rem',
                }}>
                    {/* Logo - Left (A + djunct) */}
                    <motion.div
                        style={{
                            cursor: 'pointer',
                            zIndex: 2,
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.15rem',
                        }}
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        {/* Logo as "A" */}
                        <img
                            src={logo}
                            alt="A"
                            style={{
                                height: '40px',
                                width: 'auto',
                            }}
                        />
                        {/* Text "djunct" */}
                        <span
                            className="holographic-text"
                            style={{
                                fontSize: isMobileView ? '1.2rem' : '1.5rem',
                                fontWeight: '700',
                                letterSpacing: '-0.02em',
                                whiteSpace: 'nowrap',
                            }}
                        >
                            djunct
                        </span>
                    </motion.div>

                    {/* Desktop Navigation - Center (Absolute) */}
                    {!isMobileView && (
                        <nav style={{
                            position: 'absolute',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            display: 'flex',
                            gap: '0.5rem',
                            alignItems: 'center',
                        }}>
                            {navItems.map((item, index) => (
                                <motion.div
                                    key={index}
                                    style={{ position: 'relative' }}
                                    onMouseEnter={() => setActiveIndex(index)}
                                    onMouseLeave={() => setActiveIndex(null)}
                                >
                                    <motion.a
                                        style={{
                                            textDecoration: 'none',
                                            color: 'var(--text-secondary)',
                                            fontSize: '0.95rem',
                                            fontWeight: '500',
                                            cursor: 'pointer',
                                            whiteSpace: 'nowrap',
                                            padding: '0.6rem 1rem',
                                            display: 'block',
                                            borderRadius: '12px',
                                            position: 'relative',
                                            zIndex: 2,
                                        }}
                                        onClick={item.onClick}
                                        whileHover={{
                                            color: '#00C6FF',
                                            scale: 1.05,
                                        }}
                                        whileTap={{ scale: 0.95 }}
                                        transition={springs.snappy}
                                    >
                                        {item.label}
                                    </motion.a>

                                    {/* Liquid hover background */}
                                    <AnimatePresence>
                                        {activeIndex === index && (
                                            <motion.div
                                                layoutId="navHover"
                                                initial={{ opacity: 0, scale: 0.8 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0, scale: 0.8 }}
                                                transition={springs.bouncy}
                                                style={{
                                                    position: 'absolute',
                                                    inset: 0,
                                                    background: 'linear-gradient(135deg, rgba(0, 198, 255, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)',
                                                    borderRadius: '12px',
                                                    zIndex: 1,
                                                    boxShadow: '0 0 20px rgba(0, 198, 255, 0.3)',
                                                }}
                                            />
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            ))}
                        </nav>
                    )}

                    {/* CTA Button - Desktop (Right) */}
                    {!isMobileView && (
                        <div style={{ zIndex: 2 }}>
                            <motion.button
                                style={{
                                    ...styles.buttonSecondary,
                                    cursor: 'pointer',
                                    whiteSpace: 'nowrap',
                                    position: 'relative',
                                    overflow: 'hidden',
                                }}
                                onClick={() => setShowPopup(true)}
                                whileHover={{
                                    scale: 1.05,
                                    backgroundColor: 'rgba(0, 198, 255, 0.15)',
                                    boxShadow: '0 0 25px rgba(0, 198, 255, 0.4)',
                                }}
                                whileTap={{ scale: 0.95 }}
                                transition={springs.snappy}
                            >
                                <span style={{ position: 'relative', zIndex: 2 }}>Get Early Access</span>

                                {/* Shimmer effect */}
                                <motion.div
                                    style={{
                                        position: 'absolute',
                                        top: '-50%',
                                        left: '-50%',
                                        width: '200%',
                                        height: '200%',
                                        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
                                        zIndex: 1,
                                    }}
                                    animate={{
                                        x: ['-100%', '100%'],
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        ease: 'linear',
                                    }}
                                />
                            </motion.button>
                        </div>
                    )}

                    {/* Mobile menu button */}
                    {isMobileView && (
                        <motion.button
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                background: 'transparent',
                                border: 'none',
                                color: '#fff',
                                cursor: 'pointer',
                                padding: '0.5rem',
                            }}
                            onClick={toggleMobileMenu}
                            whileTap={{ scale: 0.9, rotate: 90 }}
                            transition={springs.bouncy}
                        >
                            <AnimatePresence mode="wait">
                                {mobileMenuOpen ? (
                                    <motion.div
                                        key="close"
                                        initial={{ rotate: -90, opacity: 0 }}
                                        animate={{ rotate: 0, opacity: 1 }}
                                        exit={{ rotate: 90, opacity: 0 }}
                                        transition={springs.fast}
                                    >
                                        <X size={24} />
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="menu"
                                        initial={{ rotate: -90, opacity: 0 }}
                                        animate={{ rotate: 0, opacity: 1 }}
                                        exit={{ rotate: 90, opacity: 0 }}
                                        transition={springs.fast}
                                    >
                                        <Menu size={24} />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.button>
                    )}
                </div>
            </motion.header>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileView && mobileMenuOpen && (
                    <>
                        {/* Backdrop with blur */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            style={{
                                position: 'fixed',
                                inset: 0,
                                background: 'rgba(0, 0, 0, 0.6)',
                                backdropFilter: 'blur(10px)',
                                zIndex: 99,
                            }}
                            onClick={closeMobileMenu}
                        />

                        {/* Menu */}
                        <motion.div
                            initial={{ opacity: 0, y: -20, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -20, scale: 0.95 }}
                            transition={springs.snappy}
                            style={{
                                ...styles.mobileMenu,
                                borderRadius: '20px',
                                overflow: 'hidden',
                            }}
                        >
                            <nav style={{ ...styles.mobileNav, padding: '1rem 0' }}>
                                {navItems.map((item, index) => (
                                    <motion.a
                                        key={index}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.05, ...springs.snappy }}
                                        style={{
                                            ...styles.mobileNavLink,
                                            position: 'relative',
                                            overflow: 'hidden',
                                        }}
                                        onClick={item.onClick}
                                        whileTap={{ scale: 0.98, x: 5 }}
                                    >
                                        <span style={{ position: 'relative', zIndex: 2 }}>{item.label}</span>

                                        {/* Hover gradient */}
                                        <motion.div
                                            whileHover={{
                                                opacity: 1,
                                                scale: 1,
                                            }}
                                            style={{
                                                position: 'absolute',
                                                inset: 0,
                                                background: 'linear-gradient(90deg, rgba(0, 198, 255, 0.1), rgba(139, 92, 246, 0.1))',
                                                opacity: 0,
                                                zIndex: 1,
                                            }}
                                        />
                                    </motion.a>
                                ))}
                            </nav>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3, ...springs.snappy }}
                                style={{ padding: '0 1.5rem 1.5rem' }}
                            >
                                <motion.button
                                    style={{
                                        ...styles.buttonPrimary,
                                        width: '100%',
                                        cursor: 'pointer',
                                    }}
                                    onClick={() => {
                                        setShowPopup(true);
                                        closeMobileMenu();
                                    }}
                                    whileTap={{ scale: 0.98 }}
                                    whileHover={{ scale: 1.02 }}
                                >
                                    Get Early Access
                                </motion.button>
                            </motion.div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

export default Header;
