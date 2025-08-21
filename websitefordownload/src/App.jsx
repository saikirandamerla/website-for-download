import React,{useState} from "react";
import {Menu, X, Lock, Bot, Smartphone, MessagesSquare, Brain, Command, RefreshCw, } from "lucide-react";
import logoImg from "./assets/logo.png";
import screenshotImg from "./assets/Screenshot_2025-08-15_175401-removebg-preview.png";
import DocsPage from "./DocsPage"; 

export default function App() {
  const fontFamily = "kreon, serif";
  const fontWeightNormal = "400";

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
      icon: <Lock size={32}  color="#e5e7eb" />,
      title: "End to End Encryption",
      desc: "Your messages are kept safe using asymmetric encryption. This means there are two keys: one public (to lock/encrypt the data) and one private (to unlock/decrypt it). Because of the complex math behind it, hackers cannot realistically break it—making your communication secure",
    },
    {
      icon: <Smartphone size={32} color="#e5e7eb" />,
      title: "Why Adjunct?",
      desc: "A next-generation messaging experience powered by intelligence that adapts to you. It transforms everyday interactions into something smarter, smoother, and more intuitive—helping you stay ahead with less effort. Discover a new way to connect.",
    },
  ];

  // Second features for the special square layout
  const secondFeatures = [
    {
      icon: <Brain size={32} color="#e5e7eb" />,
      title: "AI-Powered Interface",
      image: "./assets/Screenshot_2025-08-15_175401-removebg-preview.png",
      desc: "Experience the future of messaging with our intelligent AI interface. Seamlessly integrated AI that understands context, learns your preferences, and adapts to your communication style.",
    },
    {
      icon: <Command size={32} color="#e5e7eb" />,
      title: "Custom Commands",
      desc: "Execute powerful commands with natural language. Send emails, search the web, set reminders, and automate tasks using simple text commands.",
    },
    {
      icon: <RefreshCw size={32} color="#e5e7eb" />,
      title: "Real-time Sync",
      desc: "Instant synchronization across all your devices. Your conversations, settings, and AI preferences stay in sync wherever you go.",
    },
    
  ];
const [reviews, setReviews] = useState([]); // store all reviews locally
const [reviewData, setReviewData] = useState({ name: "", review: "" });

  const styles = {
    container: {
      fontFamily,
      fontWeight: fontWeightNormal,
      color: "#f5f5f5",
      backgroundColor: "#0d0d0d",
      margin: 0,
      padding: 0,
      minHeight: "100vh",
    },
    // Global scrollbar hiding styles
    globalStyles: `
      .popup-form::-webkit-scrollbar {
        display: none;
      }
      .popup-form {
        -ms-overflow-style: none;
        scrollbar-width: none;
      }
      
      @keyframes button3DFloat {
        0%, 100% {
          transform: translateY(0) rotateX(0deg);
        }
        50% {
          transform: translateY(-3px) rotateX(2deg);
        }
      }
      
      .button-3d {
        animation: button3DFloat 3s ease-in-out infinite;
      }
      
      .button-3d:hover {
        animation: none;
        transform: translateY(-4px) rotateX(5deg) scale(1.05);
        box-shadow: 0 12px 24px rgba(0, 0, 0, 0.5), 0 6px 12px rgba(0, 0, 0, 0.4);
      }
      
      .button-3d:active {
        transform: translateY(1px) rotateX(0deg) scale(0.98);
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
      }
    `,
    contentWrapper: {
      maxWidth: "1100px",
      margin: "0 auto",
      fontFamily,
      padding: "0 1rem",
      overflowX: "hidden",
      paddingTop: "64px",
    },
    header: {
      borderBottom: "1px solid #333",
      backgroundColor: "#0d0d0d",
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      zIndex: 100,
      height: "64px",
      display: "flex",
      alignItems: "center",
    },
    headerContent: {
      margin: "0 auto",
      padding: "0 1rem",
      fontFamily,
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      height: "64px",
      width: "100%",
      maxWidth: "1100px",
    },
    leftSection: {
      display: "flex",
      alignItems: "center",
      gap: "1.5rem",
    },
    logo: {
      display: "flex",
      alignItems: "center",
    },
    nav: {
      display: "flex",
      gap: "1.25rem",
    },
    navLink: {
      textDecoration: "none",
      color: "#ccc",
      fontSize: "0.95rem",
      fontWeight: "500",
    },
    rightSection: {
      display: "flex",
      alignItems: "center",
      gap: "0.75rem",
    },
    text: {
      fontSize: "0.9rem",
      color: "#ccc",
    },
    buttonPrimary: {
      paddingTop: "0.75rem",
      paddingBottom: "0.75rem",
      paddingLeft: "1rem",
      paddingRight: "1rem",
      backgroundColor: "white",
      color: "black",
      border: "none",
      borderRadius: "6px",
      cursor: "pointer",
      fontSize: "0.9rem",
      height: "40px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      position: "relative",
      transform: "translateY(0)",
      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3), 0 2px 4px rgba(0, 0, 0, 0.2)",
    },
    buttonSecondary: {
      paddingTop: "0.75rem",
      paddingBottom: "0.75rem",
      paddingLeft: "1rem",
      paddingRight: "1rem",
      backgroundColor: "transparent",
      border: "1px solid #ffffff",
      borderRadius: "6px",
      color: "#ffffff",
      cursor: "pointer",
      fontSize: "0.9rem",
      height: "40px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    buttonPrimaryHover: {
      transform: "translateY(-2px)",
      boxShadow: "0 8px 16px rgba(0, 0, 0, 0.4), 0 4px 8px rgba(0, 0, 0, 0.3)",
    },
    buttonPrimaryActive: {
      transform: "translateY(1px)",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.3), 0 1px 2px rgba(0, 0, 0, 0.2)",
    },
    heroWrapper: {
      maxWidth: "800px",
      margin: "0 auto",
      padding: "0 1rem",
    },
    hero: {
      paddingTop: "2rem",
      paddingBottom: "2rem",
      paddingLeft: "0",
      paddingRight: "0",
      textAlign: "left",
    },
    heroTitle: {
      fontSize: "2.5rem",
      marginBottom: "1rem",
      color: "#f5f5f5",
    },
    heroText: {
      fontSize: "1.2rem",
      marginBottom: "2rem",
      color: "#ccc",
    },
    featuresGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
      gap: "1.5rem",
      padding: "2rem 0",
    },
    featureCard: {
      backgroundColor: "#0d0d0d",
      padding: "1.5rem",
      border: "1px solid #ffffff",
      boxShadow: "0 1px 3px rgba(255,255,255,0.05)",
      transition: "all 0.3s ease-in-out",
      transform: "scale(1)",
      borderRadius: 0,
    },
    featureCardHover: {
      transform: "scale(1.03)",
      boxShadow:
        "6px 6px 0 rgba(255,255,255,0.6), 7px 7px 5px rgba(255,255,255,0.1)",
    },
    featureTitle: {
      marginTop: "1rem",
      fontWeight: "600",
      fontSize: "1.125rem",
      color: "#fff",
    },
    featureDesc: {
      marginTop: "0.5rem",
      color: "#ccc",
      whiteSpace: "pre-line",
    },
    footer: {
      padding: "2rem 0",
      borderTop: "1px solid #333",
      fontSize: "0.9rem",
      textAlign: "center",
      color: "#888",
    },
    footerLinks: {
      display: "flex",
      justifyContent: "center",
      flexWrap: "wrap",
      gap: "1rem",
      margin: "1rem 0",
    },
    popupOverlay: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0, 0, 0, 0.8)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1000,
      marginTop: "-150px",
    },
    popupForm: {
      backgroundColor: "#0d0d0d",
      border: "2px solid #fff",
      padding: "2.5rem",
      borderRadius: "12px",
      maxWidth: "500px",
      width: "95%",
      maxHeight: "90vh",
      overflowY: "auto",
      boxShadow: "0 20px 40px rgba(0, 0, 0, 0.8)",
      position: "relative",
      // Hide scrollbar for webkit browsers
      scrollbarWidth: "none", // Firefox
      msOverflowStyle: "none", // IE and Edge
    },
    successPopup: {
      backgroundColor: "#0d0d0d",
      border: "2px solid #fff",
      padding: "2.5rem",
      borderRadius: "12px",
      maxWidth: "500px",
      width: "95%",
      maxHeight: "90vh",
      overflowY: "auto",
      boxShadow: "0 20px 40px rgba(0, 0, 0, 0.8)",
      position: "relative",
      animation: "successPopupFadeIn 0.5s ease-out",
      // Hide scrollbar for webkit browsers
      scrollbarWidth: "none", // Firefox
      msOverflowStyle: "none", // IE and Edge
    },
    popupTitle: {
      fontSize: "2rem",
      fontWeight: "700",
      color: "#f5f5f5",
      marginBottom: "2rem",
      textAlign: "center",
      textShadow: "0 2px 4px rgba(0, 0, 0, 0.5)",
    },
    formGroup: {
      marginBottom: "1.5rem",
    },
    formLabel: {
      display: "block",
      marginBottom: "0.75rem",
      color: "#f5f5f5",
      fontSize: "1rem",
      fontWeight: "500",
    },
    formInput: {
      width: "100%",
      padding: "1rem",
      border: "2px solid #333",
      borderRadius: "8px",
      backgroundColor: "#1a1a1a",
      color: "#f5f5f5",
      fontSize: "1rem",
      transition: "border-color 0.3s ease",
    },
    formSelect: {
      width: "100%",
      padding: "1rem",
      border: "2px solid #333",
      borderRadius: "8px",
      backgroundColor: "#1a1a1a",
      color: "#f5f5f5",
      fontSize: "1rem",
      transition: "border-color 0.3s ease",
    },
    formTextarea: {
      width: "100%",
      padding: "1rem",
      border: "2px solid #333",
      borderRadius: "8px",
      backgroundColor: "#1a1a1a",
      color: "#f5f5f5",
      fontSize: "1rem",
      minHeight: "100px",
      resize: "vertical",
      transition: "border-color 0.3s ease",
    },
    formButtons: {
      display: "flex",
      gap: "1rem",
      marginTop: "2rem",
      justifyContent: "center",
    },
    successIcon: {
      fontSize: "4rem",
      marginBottom: "1.5rem",
      textAlign: "center",
      animation: "successIconBounce 0.6s ease-out 0.2s both",
    },
    successTitle: {
      fontSize: "2rem",
      fontWeight: "700",
      color: "#f5f5f5",
      marginBottom: "1.5rem",
      textAlign: "center",
      textShadow: "0 2px 4px rgba(0, 0, 0, 0.5)",
    },
    successMessage: {
      fontSize: "1.1rem",
      color: "#f5f5f5",
      marginBottom: "1rem",
      lineHeight: "1.6",
      textAlign: "center",
    },
    successSubMessage: {
      fontSize: "0.95rem",
      color: "#ccc",
      marginBottom: "2rem",
      lineHeight: "1.5",
      textAlign: "center",
    },
    successButton: {
      backgroundColor: "white",
      color: "black",
      border: "none",
      padding: "0.75rem 1rem",
      borderRadius: "6px",
      fontSize: "0.9rem",
      fontWeight: "600",
      cursor: "pointer",
      transition: "all 0.3s ease",
      height: "40px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      margin: "0 auto",
    },

    // New styles for the second features section container
    secondFeaturesContainer: {
      display: "flex",
      gap: "1.5rem",
      padding: "3rem 0",
      // Increased height to make big block taller
      height: "600px",
    },
    bigBlock: {
      flex: 2,
      backgroundColor: "#0d0d0d",
      border: "1px solid #fff",
      padding: "1.5rem",
      boxShadow:
        "6px 6px 0 rgba(255,255,255,0.6), 7px 7px 5px rgba(255,255,255,0.1)",
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      gap: "1.5rem",
      borderRadius: 0,
    },
    bigBlockImage: {
      flex: 1,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    bigBlockContent: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      gap: "0.5rem",
    },
    smallBlocksContainer: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      gap: "1.5rem",
    },
    smallBlock: {
      flex: 1,
      backgroundColor: "#0d0d0d",
      border: "1px solid #fff",
      padding: "1rem",
      boxShadow: "6px 6px 0 rgba(255,255,255,0.6), 7px 7px 5px rgba(255,255,255,0.1)",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      borderRadius: 0,
    },

    // Mobile-specific styles
    mobileMenuButton: {
      display: "none",
      backgroundColor: "transparent",
      border: "none",
      color: "#f5f5f5",
      cursor: "pointer",
      padding: "0.5rem",
      zIndex: 101,
    },
    mobileMenu: {
      position: "fixed",
      top: "64px",
      left: 0,
      right: 0,
      backgroundColor: "#0d0d0d",
      borderBottom: "1px solid #333",
      padding: "1rem",
      zIndex: 99,
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      maxHeight: "calc(100vh - 64px)",
      overflowY: "auto",
      width: "100%",
    },
    mobileMenuBackdrop: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      zIndex: 98,
      opacity: 0,
      visibility: "hidden",
      transition: "opacity 0.3s ease, visibility 0.3s ease",
      width: "100%",
      height: "100%",
    },
    mobileMenuBackdropOpen: {
      opacity: 1,
      visibility: "visible",
    },
    mobileNav: {
      display: "flex",
      flexDirection: "column",
      gap: "1rem",
    },
    mobileNavLink: {
      textDecoration: "none",
      color: "#ccc",
      fontSize: "1rem",
      fontWeight: "500",
      paddingTop: "0.75rem",
      paddingBottom: "0.75rem",
      paddingLeft: "0",
      paddingRight: "0",
      borderBottom: "1px solid #333",
      display: "block",
      transition: "color 0.2s ease",
    },
    logoAnimationContainer: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "#0d0d0d",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1000,
      transition: "opacity 0.5s ease-out",
    },
    animatedLogo: {
      display: "flex",
      alignItems: "center",
      gap: "1rem",
      animation: "logoMove 2s ease-in-out forwards",
    },
    logoImage: {
      height: "80px",
      width: "auto",
      filter: "drop-shadow(0 0 20px rgba(255, 255, 255, 0.5))",
    },
    logoText: {
      fontSize: "3rem",
      fontWeight: "600",
      color: "#ffffff",
      textShadow: "0 0 20px rgba(255, 255, 255, 0.5)",
      display: "flex", 
      lineHeight: "1"
    },
    mainContentContainer: {
      opacity: 0,
      transform: "translateY(20px)",
      transition: "all 0.8s ease-out",
    },
  };

  const [hoveredIndex, setHoveredIndex] = React.useState(null);
  const [hoveredSecondIndex, setHoveredSecondIndex] = React.useState(null);
  const [showPopup, setShowPopup] = React.useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [isMobileView, setIsMobileView] = React.useState(false);
  const [showDocsPage, setShowDocsPage] = React.useState(false);
  const [showLogoAnimation, setShowLogoAnimation] = React.useState(true);
  const [showMainContent, setShowMainContent] = React.useState(false);
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    phone: '',
    reason: '',
    referral: ''
  });

  // Check if screen is mobile
  const isMobile = () => window.innerWidth <= 768;

  // Add resize listener
  React.useEffect(() => {
    const checkMobile = () => {
      const mobile = isMobile();
      setIsMobileView(mobile);
      console.log('Mobile view:', mobile, 'Window width:', window.innerWidth);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Logo animation effect
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setShowLogoAnimation(false);
      setShowMainContent(true);
    }, 2000); // Animation duration

    return () => clearTimeout(timer);
  }, []);

  // Inject global styles for hiding scrollbars
  React.useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.textContent = styles.globalStyles;
    document.head.appendChild(styleElement);
    
    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

  // Add responsive styles based on screen size
  const getResponsiveStyles = () => {
    const mobile = isMobileView;
    
    return {
      hero: {
        ...styles.hero,
        paddingTop: mobile ? "2rem" : "4rem",
        paddingBottom: mobile ? "2rem" : "4rem",
      },
      heroTitle: {
        ...styles.heroTitle,
        fontSize: mobile ? "1.8rem" : "2.5rem",
      },
      heroText: {
        ...styles.heroText,
        fontSize: mobile ? "1rem" : "1.2rem",
      },
      featuresGrid: {
        ...styles.featuresGrid,
        gridTemplateColumns: mobile ? "1fr" : "repeat(auto-fit, minmax(220px, 1fr))",
        gap: mobile ? "1rem" : "1.5rem",
      },
      secondFeaturesContainer: {
        ...styles.secondFeaturesContainer,
        flexDirection: mobile ? "column" : "row",
        height: mobile ? "auto" : "600px",
        gap: mobile ? "1rem" : "1.5rem",
      },
      bigBlock: {
        ...styles.bigBlock,
        flexDirection: mobile ? "column" : "row",
        paddingTop: mobile ? "1rem" : "1.5rem",
        paddingBottom: mobile ? "1rem" : "1.5rem",
        paddingLeft: mobile ? "1rem" : "1.5rem",
        paddingRight: mobile ? "1rem" : "1.5rem",
      },
      bigBlockImage: {
        ...styles.bigBlockImage,
        order: mobile ? 1 : 0,
      },
      bigBlockContent: {
        ...styles.bigBlockContent,
        order: mobile ? 2 : 1,
      },
      smallBlocksContainer: {
        ...styles.smallBlocksContainer,
        flexDirection: mobile ? "column" : "column",
      },
      smallBlock: {
        ...styles.smallBlock,
        minHeight: mobile ? "120px" : "auto",
      },
      popupForm: {
        ...styles.popupForm,
        paddingTop: mobile ? "1.5rem" : "2.5rem",
        paddingBottom: mobile ? "1.5rem" : "2.5rem",
        paddingLeft: mobile ? "1.5rem" : "2.5rem",
        paddingRight: mobile ? "1.5rem" : "2.5rem",
        width: mobile ? "95%" : "95%",
        maxWidth: mobile ? "400px" : "500px",
      },
      popupTitle: {
        ...styles.popupTitle,
        fontSize: mobile ? "1.5rem" : "2rem",
      },
      formButtons: {
        ...styles.formButtons,
        flexDirection: mobile ? "column" : "row",
        gap: mobile ? "0.5rem" : "1rem",
      },
      nav: {
        ...styles.nav,
        display: mobile ? "none" : "flex",
        visibility: mobile ? "hidden" : "visible",
      },
      mobileMenuButton: {
        ...styles.mobileMenuButton,
        display: mobile ? "block" : "none",
        height: "40px",
        width: "40px",
        marginLeft: mobile ? "0.5rem" : "0",
      },
      leftSection: {
        ...styles.leftSection,
        gap: mobile ? "0.5rem" : "1.5rem",
      },
      rightSection: {
        ...styles.rightSection,
        gap: mobile ? "0.5rem" : "0.75rem",
      },
      logo: {
        ...styles.logo,
        fontSize: mobile ? "1rem" : "1.2rem",
      },
      buttonPrimary: {
        ...styles.buttonPrimary,
        paddingTop: mobile ? "0.75rem" : "0.4rem",
        paddingBottom: mobile ? "0.75rem" : "0.4rem",
        paddingLeft: mobile ? "1.2rem" : "0.9rem",
        paddingRight: mobile ? "1.2rem" : "0.9rem",
        fontSize: mobile ? "1rem" : "0.9rem",
      },
      buttonSecondary: {
        ...styles.buttonSecondary,
        paddingTop: mobile ? "0.5rem" : "0.4rem",
        paddingBottom: mobile ? "0.5rem" : "0.4rem",
        paddingLeft: mobile ? "0.8rem" : "0.9rem",
        paddingRight: mobile ? "0.8rem" : "0.9rem",
        fontSize: mobile ? "0.85rem" : "0.9rem",
      },
    };
  };

  const responsiveStyles = React.useMemo(() => getResponsiveStyles(), [isMobileView]);

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
    
    try {
      // Try Google Apps Script (original method)
      const submissionData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        reason: formData.reason,
        referral: formData.referral,
        timestamp: new Date().toISOString()
      };

// Method 1: Google Apps Script (original)
try {
  await fetch('https://script.google.com/macros/s/AKfycbwIrB_-BfxtQRqDLkxMvxDgbi3X17F90g0F91xIC8q7e8KgiH5eeZOOzkrc6NhemhHI/exec', {
    method: 'POST',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(submissionData)   // can be formData for waitlist OR reviewData for reviews
  });
  console.log('Google Apps Script submission attempted');
} catch (googleError) {
  console.log('Google Apps Script failed:', googleError);
}

// Method 2: Simple email notification (works immediately)
const emailBody = `
New Waitlist Signup / Review:

Name: ${formData?.name || reviewData?.name || "Anonymous"}
Email: ${formData?.email || "N/A"}
Phone: ${formData?.phone || "N/A"}
Reason: ${formData?.reason || "N/A"}
Referral: ${formData?.referral || "N/A"}
Review: ${reviewData?.review || "N/A"}
Timestamp: ${new Date().toLocaleString()}

This submission was also saved locally in the browser.
`;

const mailtoLink = `mailto:adjunctpa@gmail.com?subject=New Submission - ${formData?.name || reviewData?.name}&body=${encodeURIComponent(emailBody)}`;

console.log('Form submitted successfully:', formData || reviewData);
console.log('Email link prepared:', mailtoLink);

// Show success popup
setShowSuccessPopup(true);
setShowPopup(false);
setFormData({ name: '', email: '', phone: '', reason: '', referral: '' });
setReviewData({review: '', });

      
      // Optionally open email client (uncomment to enable)
      // window.open(mailtoLink);
      
    } catch (error) {
      console.error('Submission error:', error);
      
      // Since we already saved to localStorage, we can still show success
      setShowSuccessPopup(true);
      setShowPopup(false);
      setFormData({ name: '', email: '', phone: '', reason: '', referral: '' });
    }
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

 



  // Close mobile menu on escape key
  React.useEffect(() => {
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

      {/* Logo Animation Overlay */}
      {showLogoAnimation && (
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
          {/* HEADER */}
          <header style={styles.header}>
        <div style={styles.headerContent}>
          {/* Left: logo + navigation */}
          <div style={responsiveStyles.leftSection}>
            <div 
              style={{...responsiveStyles.logo, cursor: "pointer"}}
              onClick={() => {
                setShowDocsPage(false);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <img src={logoImg} alt="Logo" style={{ height: "40px", width: "auto" }} />
              <span style={{fontSize: "32px", fontWeight: "600", color: "#f5f5f5", display: "flex", alignItems: "center", lineHeight: "1"}}>djunct</span>
            </div>
            {/* Desktop Navigation */}
            {!isMobileView && (
              <nav style={styles.nav}>
                <a 
                  style={{...styles.navLink, cursor: "pointer"}}
                  onClick={() => setShowDocsPage(true)}
                >
                  Manual
                </a>
                <a 
                  style={{...styles.navLink, cursor: "pointer"}}
                  onClick={() => {
                    const whatsNewSection = document.getElementById('whats-new');
                    if (whatsNewSection) {
                      whatsNewSection.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                >
                  About
                </a>
                <a 
                  style={{...styles.navLink, cursor: "pointer"}}
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
                style={{...styles.mobileNavLink, cursor: "pointer"}}
                onClick={() => {
                  closeMobileMenu();
                  setShowDocsPage(true);
                }}
              >
                Manual
              </a>
              <a href="#features" style={styles.mobileNavLink} onClick={closeMobileMenu}>
                Features
              </a>
              <a 
                style={{...styles.mobileNavLink, cursor: "pointer"}}
                onClick={() => {
                  closeMobileMenu();
                  const whatsNewSection = document.getElementById('whats-new');
                  if (whatsNewSection) {
                    whatsNewSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                About
              </a>
              <a 
                style={{...styles.mobileNavLink, cursor: "pointer"}}
                onClick={() => {
                  closeMobileMenu();
                  document.querySelector('footer').scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Contact
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Show Docs Page or Main Content */}
      {showDocsPage ? (
        <DocsPage onBack={() => setShowDocsPage(false)} />
      ) : (
        <>
          {/* MAIN CONTENT */}
          <div style={styles.contentWrapper}>
        {/* HERO */}
        <div style={styles.heroWrapper}>
          <section style={responsiveStyles.hero}>
            <h1 style={responsiveStyles.heroTitle}>
              Adjunct - Pioneer the Future of AI Communication
            </h1>
            <p style={responsiveStyles.heroText}>
              Human Intelligence, AI Precision, Perfectly Fused. The messaging
              app that uses the AI which does the work easy and provides the
              privacy than any other. Not just the guidance, It's the
              performance.
            </p>
            <button 
              className="button-3d"
              style={responsiveStyles.buttonPrimary}
              onClick={() => setShowPopup(true)}
            >
              Join Waitlist
            </button>
          </section>
        </div>

        {/* FIRST FEATURES GRID */}
        <section style={responsiveStyles.featuresGrid}>
          {features.map((f, i) => (
            <div
              key={i}
              style={{
                ...styles.featureCard,
                ...(hoveredIndex === i ? styles.featureCardHover : {}),
              }}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {f.icon}
              <h3 style={styles.featureTitle}>{f.title}</h3>
              <p style={styles.featureDesc}>{f.desc}</p>
            </div>
          ))}
        </section>
<div id="whats-new" style={{ textAlign: "center", marginBottom: "2rem", fontFamily: "kreon, serif" }}>
  <h1 >whats new?</h1>
  <p>Adjunct is the new messanging app ,which has the AI intelligence and perform the action unlike the other.
    It performs the tasks like the messaging,searching, custom commands like send emails and other things.
  </p>
</div>

        {/* SECOND FEATURES SQUARE-LIKE LAYOUT */}
        <section style={responsiveStyles.secondFeaturesContainer}>
          {/* Big block on left */}
          <div
            style={{
              ...responsiveStyles.bigBlock,
              ...(hoveredSecondIndex === 0 ? styles.featureCardHover : {}),
            }}
            onMouseEnter={() => setHoveredSecondIndex(0)}
            onMouseLeave={() => setHoveredSecondIndex(null)}
          >
            <div style={responsiveStyles.bigBlockImage}>
              <img 
                src={screenshotImg} 
                alt="Feature preview" 
                style={{ 
                  maxWidth: "100%", 
                  maxHeight: "300px", 
                  objectFit: "contain" 
                }} 
              />
            </div>
            <div style={responsiveStyles.bigBlockContent}>
              {secondFeatures[0].icon}
              <h3 style={styles.featureTitle}>{secondFeatures[0].title}</h3>
              <p style={styles.featureDesc}>{secondFeatures[0].desc}</p>
            </div>
          </div>

          {/* Four smaller stacked blocks on right */}
          <div style={responsiveStyles.smallBlocksContainer}>
            {secondFeatures.slice(1).map((f, i) => (
              <div
                key={i + 1}
                style={{
                  ...responsiveStyles.smallBlock,
                  ...(hoveredSecondIndex === i + 1
                    ? styles.featureCardHover
                    : {}),
                }}
                onMouseEnter={() => setHoveredSecondIndex(i + 1)}
                onMouseLeave={() => setHoveredSecondIndex(null)}
              >
                {f.icon}
                <h3 style={styles.featureTitle}>{f.title}</h3>
                <p style={styles.featureDesc}>{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ABOUT US SECTION */}
        <div id="whats-new" style={{ textAlign: "center", marginBottom: "2rem", fontFamily: "kreon, serif" }}>
          <h1 style={{ color: "#f5f5f5", fontSize: "2.5rem", marginBottom: "1.5rem" }}>About Us</h1>
          <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "left" }}>
            <h2 style={{ color: "#f5f5f5", fontSize: "1.8rem", marginBottom: "1rem" }}>🎉 Adjunct - Worlds First Ai Communication platform</h2>
            
            <p style={{ fontSize: "1.1rem", lineHeight: "1.6", color: "#ccc", marginBottom: "1.5rem" }}>
              We are glad to announce the successful completion of our web development project for <strong style={{ color: "#22c55e" }}>Adjunct</strong>.
            </p>

            
            <div style={{ backgroundColor: "#1a1a1a", padding: "1.5rem", borderRadius: "8px", border: "1px solid #333", marginBottom: "1.5rem" }}>
              <h3 style={{ color: "#f5f5f5", fontSize: "1.3rem", marginBottom: "1rem" }}>🚀 Our Journey</h3>
              <p style={{ color: "#ccc", lineHeight: "1.6", marginBottom: "1rem" }}>
                We started our journey as a team of two passionate individuals who shared the vision of creating impactful projects and exploring new ideas. As students, we began with web development, building small projects that, although not fully successful, laid the foundation for our technical skills and boosted our confidence. These early experiences taught us that with persistence, we could learn and build anything practically, even with free resources.
              </p>
              <p style={{ color: "#ccc", lineHeight: "1.6" }}>
              With this vision, we created our first website and launched it. However, it did not receive the expected response, and we encountered several technical challenges and bugs. Instead of seeing this as a failure, we treated it as a learning step and moved forward.
              </p>
              <p style={{ color: "#ccc", lineHeight: "1.6" }}>
              As our team grew with the addition of a new member, we expanded our vision. We experimented with creating a user-friendly WhatsApp bot, though we faced challenges with verification and scalability. This pushed us to think differently — to build a standalone messaging platform that users could personalize, offering both convenience and privacy while integrating AI as a personal assistant.
              </p>
              <p style={{ color: "#ccc", lineHeight: "1.6" }}>
              This marks our journey so far: from experimenting with early projects, to envisioning and building Adjunct, and continuously learning, improving, and adapting to create a product that truly helps people manage their work and lives more effectively.
              </p>
            </div>
            
            <div style={{ textAlign: "center", marginTop: "2rem", fontFamily: "kreon, serif" }}>
              <p style={{ color: "#22c55e", fontSize: "1.1rem", fontStyle: "italic" }}>
                "Success is not final, failure is not fatal: it is the courage to continue that counts." - Winston Churchill
              </p>
            </div>
          </div>
        </div>
{/* Review box */}
{/* REVIEW SECTION */}
<div 
  style={{ 
    backgroundColor: "#1a1a1a", 
    padding: "2rem", 
    borderRadius: "12px", 
    border: "1px solid #333", 
    margin: "3rem auto", 
    maxWidth: "800px",
    textAlign: "center",
    fontFamily: "kreon, serif"
  }}
>
  <h2 style={{ color: "#f5f5f5", fontSize: "2rem", marginBottom: "1rem" }}>
    ⭐ Share Your Review
  </h2>
  <p style={{ color: "#ccc", marginBottom: "1.5rem" }}>
    We'd love to hear your thoughts about <strong style={{ color: "#22c55e" }}>Adjunct</strong>.  
    Your feedback helps us improve and grow.
  </p>

  <form onSubmit={(e) => { e.preventDefault(); alert("Thank you for your review!"); }}>
    <div style={{ marginBottom: "1rem" }}>
      <textarea 
        placeholder="Write your review here..." 
        style={{
          width: "100%",
          minHeight: "100px",
          padding: "10px",
          borderRadius: "8px",
          border: "1px solid #333",
          backgroundColor: "#121212",
          color: "#f5f5f5",
          resize: "none"
        }}
        required
      />
    </div>
    <div style={{ display: "flex", justifyContent: "center", gap: "1rem" }}>
      <button 
        type="submit" 
        style={{
          padding: "10px 20px",
          backgroundColor: "#ffffff",
          border: "none",
          borderRadius: "6px",
          color: "#000",
          cursor: "pointer",
          fontWeight: "600"

        }}
      >
        Submit Review
      </button>
      <button 
        type="reset" 
        style={{
          padding: "10px 20px",
          backgroundColor: "#333",
          border: "none",
          borderRadius: "6px",
          color: "#fff",
          cursor: "pointer"
        }}
      >
        Clear
      </button>
    </div>
  </form>
</div>

        {/* FOOTER */}
        <footer style={styles.footer}>
          {/* Contact Information */}
          <div style={{ marginTop: "1.5rem", textAlign: "center" }}>
            <h3 style={{ color: "#f5f5f5", fontSize: "1.1rem", marginBottom: "1rem" }}>Contact Us</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", alignItems: "center" }}>
              <p style={{ color: "#ccc", margin: "0" }}>
                <strong>Email:</strong> contact@adjunct.in
              </p>
              <p style={{ color: "#ccc", margin: "0" }}>
                <strong>Location:</strong> India
              </p>
              <p style={{ color: "#ccc", margin: "0" }}>
                <strong>Support:</strong> Available 24/7
              </p>
            </div>
          </div>
        </footer>
          </div>
        </>
      )}

      {/* POPUP FORM */}
      {showPopup && (
        <div style={styles.popupOverlay} onClick={handleClosePopup}>
                      <div 
              className="popup-form"
              style={{
                ...responsiveStyles.popupForm,
                position: "absolute",
                left: "50%",
                top: isMobileView ? "13%" : "75%",
                transform: isMobileView ? "translate(-50%, -50%)" : "translate(-50%, -335%)" ,
              }} 
              onClick={(e) => e.stopPropagation()}
            >
            <h2 style={responsiveStyles.popupTitle}>Join the Waitlist</h2>
            <form onSubmit={handleSubmit}>
              <div style={styles.formGroup}>
                <label style={styles.formLabel} htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  style={styles.formInput}
                  onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
                  onBlur={(e) => {
                    e.target.style.borderColor = "#333";
                    e.target.style.boxShadow = "none";
                  }}
                  required
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.formLabel} htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  style={styles.formInput}
                  onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
                  onBlur={(e) => {
                    e.target.style.borderColor = "#333";
                    e.target.style.boxShadow = "none";
                  }}
                  required
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.formLabel} htmlFor="phone">Phone Number (Optional)</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  style={styles.formInput}
                  onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
                  onBlur={(e) => {
                    e.target.style.borderColor = "#333";
                    e.target.style.boxShadow = "none";
                  }}
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.formLabel} htmlFor="reason">Why are you interested in Adjunct? (Optional)</label>
                <textarea
                  id="reason"
                  name="reason"
                  value={formData.reason}
                  onChange={handleInputChange}
                  style={styles.formTextarea}
                  onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
                  onBlur={(e) => {
                    e.target.style.borderColor = "#333";
                    e.target.style.boxShadow = "none";
                  }}
                  placeholder="Tell us why you're interested in our messaging platform..."
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.formLabel} htmlFor="referral">How did you hear about us?</label>
                <select
                  id="referral"
                  name="referral"
                  value={formData.referral}
                  onChange={handleInputChange}
                  style={styles.formSelect}
                  onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
                  onBlur={(e) => {
                    e.target.style.borderColor = "#333";
                    e.target.style.boxShadow = "none";
                  }}
                  required
                >
                  <option value="">Select an option</option>
                  <option value="family">Family</option>
                  <option value="friends">Friends</option>
                  <option value="social-media">Social Media</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div style={responsiveStyles.formButtons}>
                <button 
                  type="submit" 
                  style={styles.buttonPrimary}
                >
                  Submit
                </button>
                <button 
                  type="button" 
                  style={styles.buttonSecondary}
                  onClick={handleClosePopup}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* SUCCESS POPUP */}
      {showSuccessPopup && (
        <div style={styles.popupOverlay} onClick={() => setShowSuccessPopup(false)}>
          <div 
            className="success-popup"
            style={{
              ...styles.successPopup,
              position: "absolute",
              left: "50%",
              top: isMobileView ? "50%" : "10%",
              transform: isMobileView ? "translate(-50%, -50%)" : "translateX(-50%)",
            }} 
            onClick={(e) => e.stopPropagation()}
          >
            <h2 style={styles.successTitle}>Thank You!</h2>
            <div style={styles.successIcon}>✅</div>
            <p style={styles.successMessage}>
              You've successfully joined the Adjunct waitlist! We're excited to have you on board.
            </p>
            <p style={styles.successSubMessage}>
              We'll be in touch soon with updates about our launch. Your submission has been saved and you'll receive notifications about our progress.
            </p>
            <div style={styles.formButtons}>
              <button 
                style={styles.successButton}
                onClick={() => setShowSuccessPopup(false)}
              >
                Got it!
              </button>
            </div>
          </div>
        </div>
      )}
        </div>
      </div>
    </>
  );
}
