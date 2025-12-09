import React, { useState, useEffect, useMemo } from "react";
import { MessagesSquare, Bot, Lock, Smartphone, Brain, Command, RefreshCw } from "lucide-react";
import TermsPage from "./TermsPage";
import DocsPage from "./DocsPage";
import FeaturesPage from "./components/FeaturesPage";
import SecurityPage from "./components/SecurityPage";
import RoadmapPage from "./components/RoadmapPage";
import PrivacyPolicyPage from "./components/PrivacyPolicyPage";
import Background from "./components/Background";
import LogoAnimation from "./components/LogoAnimation";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Features from "./components/Features";
import EncryptionTool from "./components/EncryptionTool";
import SecondFeatures from "./components/SecondFeatures";
import ReviewSection from "./components/ReviewSection";
import Footer from "./components/Footer";
import PopupForm from "./components/PopupForm";
import SuccessPopup from "./components/SuccessPopup";
import { styles, getResponsiveStyles } from "./styles";

import CustomCursor from "./components/CustomCursor";
import ScrollProgress from "./components/ScrollProgress";
import LoadingScreen from "./components/LoadingScreen";
import InteractiveTimeline from "./components/InteractiveTimeline";
import ScrollAnimation from "./components/ScrollAnimation";
import ParallaxBackground from "./components/ParallaxBackground";
import ScrollReveal from "./components/ScrollReveal";
import { useSmoothScroll } from "./hooks/useSmoothScroll";
import CursorLight from "./components/CursorLight";
import Metaballs from "./components/Metaballs";
import FogLayers from "./components/FogLayers";
import DepthOfField from "./components/DepthOfField";

export default function App() {
  const features = [
    {
      icon: <MessagesSquare size={32} color="#e5e7eb" />,
      title: "Dynamic Messaging",
      desc: "The Adjunct offers a dynamic chat facility with seamless mode-switching capabilities—ranging from privacy-focused to compatibility-enhanced modes. It ensures secure and reliable messaging, allowing users to communicate safely and confidently.",
    },
    {
      icon: <Bot size={32} color="#e5e7eb" />,
      title: "AI-Powered Intelligence",
      desc: "An intelligent companion designed to simplify your workflow and boost productivity. It streamlines your routine, offering smarter ways to stay organized and efficient. Focus on your priorities while intelligence works seamlessly in the background.",
    },
    {
      icon: <Lock size={32} color="#e5e7eb" />,
      title: "Asymmetric Encryption",
      desc: "This security model relies on a pair of keys: one public for encryption and one private for decryption. The advanced mathematics behind this process makes it virtually impossible to compromise, ensuring that your communication remains private, secure, and trustworthy.",
    },
    {
      icon: <Smartphone size={32} color="#e5e7eb" />,
      title: "Why Adjunct?",
      desc: "Adjunct is redefining what it means to connect in the digital age. With intelligence at its core, it transforms everyday communication into something fluid, intuitive, and forward-looking. No noise, no barriers—just a smarter, simpler way to interact and move forward. Discover the next chapter in human connection.",
    },
  ];

  // Second features for the special square layout
  const secondFeatures = [
    {
      icon: <Brain size={32} color="#e5e7eb" />,
      title: "AI-Powered Interface",
      image: "./assets/Screenshot_2025-08-15_175401-removebg-preview.png",
      desc: "Experience the future of communication with Adjunct, a platform designed to transform the way people connect. Built with intelligence at its core, it creates a seamless environment where conversations flow effortlessly, distractions fade away, and every interaction feels natural. More than just technology, it’s a new standard for how communication should be—smarter, faster, and truly human.",
    },
    {
      icon: <Command size={32} color="#e5e7eb" />,
      title: "Custom Commands",
      desc: 'Adjunct makes technology effortless by turning simple language into meaningful action. Just say what you need—and it’s done, making work smarter, smoother, and seamless.',
    },
    {
      icon: <RefreshCw size={32} color="#e5e7eb" />,
      title: "Real-time Sync",
      desc: "Your conversations, preferences, and settings follow you wherever you go—ensuring a consistent, uninterrupted experience whether you’re on any mobile device. ",
    },
  ];

  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [hoveredSecondIndex, setHoveredSecondIndex] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);
  const [showDocsPage, setShowDocsPage] = useState(false);
  const [showTermsPage, setShowTermsPage] = useState(false);
  const [showFeaturesPage, setShowFeaturesPage] = useState(false);
  const [showSecurityPage, setShowSecurityPage] = useState(false);
  const [showRoadmapPage, setShowRoadmapPage] = useState(false);
  const [showPrivacyPolicyPage, setShowPrivacyPolicyPage] = useState(false);
  const [showLogoAnimation, setShowLogoAnimation] = useState(false); // Disabled - loading screen handles this
  const [showMainContent, setShowMainContent] = useState(false);
  const [showLoadingScreen, setShowLoadingScreen] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    reason: '',
    referral: '',
    review: '',
  });

  // Check if screen is mobile
  const isMobile = () => window.innerWidth <= 768;

  // Add resize listener
  useEffect(() => {
    const checkMobile = () => {
      const mobile = isMobile();
      setIsMobileView(mobile);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Logo animation effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLogoAnimation(false);
      setShowMainContent(true);
    }, 2000); // Animation duration

    return () => clearTimeout(timer);
  }, []);

  // Inject global styles for hiding scrollbars
  useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.textContent = styles.globalStyles;
    document.head.appendChild(styleElement);

    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

  // Initialize smooth scroll
  useSmoothScroll();

  const responsiveStyles = useMemo(() => getResponsiveStyles(isMobileView), [isMobileView]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Store in localStorage first (as backup)
    try {
      const submissions = JSON.parse(localStorage.getItem('waitlistSubmissions') || '[]');
      submissions.push({
        ...formData,
        timestamp: new Date().toISOString(),
        submittedAt: new Date().toLocaleString()
      });
      localStorage.setItem('waitlistSubmissions', JSON.stringify(submissions));
      console.log('Form data saved to localStorage');
    } catch (localError) {
      console.error('Error saving locally:', localError);
    }

    // Prepare data to send to Google Sheets via Apps Script
    const submissionData = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      reason: formData.reason,
      referral: formData.referral,
      timestamp: new Date().toISOString(),
    };

    // Show success popup immediately (UI feedback) and close the form
    setShowSuccessPopup(true);
    setShowPopup(false);
    // Clear form fields after successful submit
    setFormData({ name: '', email: '', phone: '', reason: '', referral: '' });

    // Send to Google Apps Script in background (non-blocking)
    (async () => {
      const endpoint = 'https://script.google.com/macros/s/AKfycbwIrB_-BfxtQRqDLkxMvxDgbi3X17F90g0F91xIC8q7e8KgiH5eeZOOzkrc6NhemhHI/exec';
      try {
        // Try a normal CORS-enabled POST first
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(submissionData),
        });

        if (!res.ok) {
          console.warn('Apps Script responded with non-OK status', res.status);
        } else {
          console.log('Submission stored via Apps Script (CORS POST)');
          return;
        }
      } catch (err) {
        console.warn('CORS POST to Apps Script failed, will try no-cors fallback', err);
      }

      // Fallback: try sending with no-cors (may succeed if script accepts anonymous requests)
      try {
        await fetch(endpoint, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(submissionData),
        });
        console.log('Submission attempted via Apps Script (no-cors fallback)');
      } catch (fallbackErr) {
        console.error('Apps Script fallback failed:', fallbackErr);
      }
    })();

    // Optional: prepare mailto link for logging/debugging
    const emailBody = `
New Waitlist Signup / Review:

Name: ${submissionData.name || 'Anonymous'}
Email: ${submissionData.email || 'N/A'}
Phone: ${submissionData.phone || 'N/A'}
Reason: ${submissionData.reason || 'N/A'}
Referral: ${submissionData.referral || 'N/A'}
Timestamp: ${new Date().toLocaleString()}

This submission was also saved locally in the browser.
`;

    const mailtoLink = `mailto:adjunctpa@gmail.com?subject=New Submission - ${submissionData.name || ''}&body=${encodeURIComponent(emailBody)}`;

    console.log('Form submitted (local saved) — background Apps Script upload started');
    console.log('Email link prepared:', mailtoLink);

    // Show success popup only (do not close the form or clear inputs)
    setShowSuccessPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setFormData({ name: '', email: '', phone: '', reason: '', referral: '' });
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        closeMobileMenu();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [mobileMenuOpen]);

  // Add focus styles for better UX
  const inputFocusStyle = {
    borderColor: "#22c55e",
    outline: "none",
    boxShadow: "0 0 0 3px rgba(34, 197, 94, 0.1)",
  };

  return (
    <>
      {/* Loading Screen */}
      {showLoadingScreen && (
        <LoadingScreen onComplete={() => setShowLoadingScreen(false)} />
      )}

      {/* Phase 4: Background Effects */}
      <CursorLight />
      <Metaballs />
      <FogLayers />
      <DepthOfField />

      {/* Main App Content */}
      {!showLoadingScreen && (
        <>
          <ScrollProgress />
          <CustomCursor />
          <Background />
          <style>
            {`
          @keyframes logoMove {
            0% {
              transform: translate(-100vw, -100vh) scale(0.3);
              opacity: 0;
            }
            50% {
              transform: translate(0, 0) scale(1.2);
              opacity: 1;
            }
            100% {
              transform: translate(0, 0) scale(1);
              opacity: 1;
            }
          }
        `}
          </style>

          <LogoAnimation showLogoAnimation={showLogoAnimation} styles={styles} />

          {!showTermsPage && (
            <Header
              styles={styles}
              responsiveStyles={responsiveStyles}
              isMobileView={isMobileView}
              mobileMenuOpen={mobileMenuOpen}
              toggleMobileMenu={toggleMobileMenu}
              closeMobileMenu={closeMobileMenu}
              setShowPopup={setShowPopup}
              setShowDocsPage={setShowDocsPage}
              setShowFeaturesPage={setShowFeaturesPage}
              setShowSecurityPage={setShowSecurityPage}
              setShowRoadmapPage={setShowRoadmapPage}
            />
          )}

          {/* Main App Content */}
          <div style={{
            ...styles.mainContentContainer,
            ...(showMainContent && {
              opacity: 1,
              transform: "translateY(0)",
            }),
          }}>
            <div style={styles.container}>

              {/* Show Docs Page, Terms Page, Product Pages, or Main Content */}
              {showDocsPage ? (
                <DocsPage onBack={() => setShowDocsPage(false)} />
              ) : showTermsPage ? (
                <TermsPage
                  onBack={() => setShowTermsPage(false)}
                  styles={styles}
                  responsiveStyles={responsiveStyles}
                />
              ) : showFeaturesPage ? (
                <FeaturesPage onBack={() => setShowFeaturesPage(false)} />
              ) : showSecurityPage ? (
                <SecurityPage onBack={() => setShowSecurityPage(false)} />
              ) : showRoadmapPage ? (
                <RoadmapPage onBack={() => setShowRoadmapPage(false)} />
              ) : showPrivacyPolicyPage ? (
                <PrivacyPolicyPage onBack={() => setShowPrivacyPolicyPage(false)} />
              ) : (
                <>
                  {/* MAIN CONTENT */}
                  <div style={styles.contentWrapper}>
                    <Hero
                      styles={styles}
                      responsiveStyles={responsiveStyles}
                      setShowPopup={setShowPopup}
                    />

                    {/* AnimatedStats removed per user request */}

                    <Features
                      styles={styles}
                      responsiveStyles={responsiveStyles}
                      features={features}
                      hoveredIndex={hoveredIndex}
                      setHoveredIndex={setHoveredIndex}
                    />

                    <ScrollReveal direction="up" delay={0.1}>
                      <EncryptionTool />
                    </ScrollReveal>

                    {/* InteractiveTimeline removed to eliminate gap */}

                    <SecondFeatures
                      styles={styles}
                      responsiveStyles={responsiveStyles}
                      secondFeatures={secondFeatures}
                      hoveredSecondIndex={hoveredSecondIndex}
                      setHoveredSecondIndex={setHoveredSecondIndex}
                    />

                    <ScrollReveal direction="up" delay={0.1}>
                      <ReviewSection />
                    </ScrollReveal>

                    <Footer
                      styles={styles}
                      responsiveStyles={responsiveStyles}
                      onOpenTerms={() => {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                        setShowTermsPage(true);
                      }}
                      onOpenFeatures={() => {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                        setShowFeaturesPage(true);
                      }}
                      onOpenSecurity={() => {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                        setShowSecurityPage(true);
                      }}
                      onOpenRoadmap={() => {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                        setShowRoadmapPage(true);
                      }}
                      onOpenPrivacyPolicy={() => {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                        setShowPrivacyPolicyPage(true);
                      }}
                    />
                  </div>
                </>
              )}

            </div>
          </div>

          <PopupForm
            styles={styles}
            responsiveStyles={responsiveStyles}
            showPopup={showPopup}
            handleClosePopup={handleClosePopup}
            handleSubmit={handleSubmit}
            formData={formData}
            handleInputChange={handleInputChange}
            inputFocusStyle={inputFocusStyle}
          />

          <SuccessPopup
            styles={styles}
            showSuccessPopup={showSuccessPopup}
            setShowSuccessPopup={setShowSuccessPopup}
            isMobileView={isMobileView}
          />
        </>
      )}
    </>
  );
}
