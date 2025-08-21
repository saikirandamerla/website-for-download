import React from "react";

export default function DocsPage({ onBack }) {
  const [showNotification, setShowNotification] = React.useState(false);
  const [notificationTimer, setNotificationTimer] = React.useState(null);
  
  // Function to handle notification display
  const handleShowNotification = () => {
    try {
      // Clear any existing timer
      if (notificationTimer) {
        clearTimeout(notificationTimer);
      }
      
      setShowNotification(true);
      
      // Scroll to top of the page when notification appears
      window.scrollTo({ top: 0, behavior: 'smooth' });
      
      // Auto-hide notification after 5 seconds
      const timer = setTimeout(() => {
        setShowNotification(false);
      }, 5000);
      
      setNotificationTimer(timer);
    } catch (error) {
      console.error('Error showing notification:', error);
    }
  };
  
  // Cleanup timer on component unmount
  React.useEffect(() => {
    return () => {
      if (notificationTimer) {
        clearTimeout(notificationTimer);
      }
    };
  }, [notificationTimer]);
  
  const styles = {
         container: {
       backgroundColor: "#0d0d0d",
       minHeight: "100vh",
       color: "#f5f5f5",
       padding: "2rem",
       fontFamily: "kreon, serif",
     },
    header: {
      display: "flex",
      alignItems: "center",
      marginBottom: "3rem",
      borderBottom: "1px solid #333",
      paddingBottom: "1rem",
    },
    backButton: {
      backgroundColor: "transparent",
      border: "1px solid #666",
      color: "#666",
      padding: "0.5rem 1rem",
      cursor: "pointer",
      borderRadius: "4px",
      marginRight: "1rem",
      fontSize: "0.9rem",
    },
    title: {
      fontSize: "2.5rem",
      fontWeight: "600",
      color: "#f5f5f5",
      margin: 0,
    },
    content: {
      maxWidth: "800px",
      margin: "0 auto",
    },
    section: {
      marginBottom: "3rem",
    },
    sectionTitle: {
      fontSize: "1.8rem",
      fontWeight: "600",
      color: "#f5f5f5",
      marginBottom: "1rem",
      borderBottom: "1px solid #333",
      paddingBottom: "0.5rem",
      marginTop: "50px",
    },
    sectionContent: {
      fontSize: "1.1rem",
      lineHeight: "1.6",
      color: "#ccc",
    },
    codeBlock: {
      backgroundColor: "#1a1a1a",
      border: "1px solid #333",
      borderRadius: "4px",
      padding: "1rem",
      margin: "1rem 0",
      fontFamily: "monospace",
      fontSize: "0.9rem",
      color: "#e5e7eb",
      overflowX: "auto",
    },
    list: {
      margin: "1rem 0",
      paddingLeft: "2rem",
    },
    listItem: {
      marginBottom: "0.5rem",
      color: "#ccc",
    },
    highlight: {
      backgroundColor: "#22c55e",
      color: "#000",
      padding: "0.2rem 0.4rem",
      borderRadius: "3px",
      fontWeight: "600",
    },
    flowContainer: {
      marginTop: "2rem",
    },
    flowStep: {
      display: "flex",
      alignItems: "flex-start",
      marginBottom: "2rem",
      padding: "1.5rem",
      backgroundColor: "#1a1a1a",
      border: "1px solid #333",
      borderRadius: "8px",
    },
    stepNumber: {
      backgroundColor: "#22c55e",
      color: "#000",
      width: "40px",
      height: "40px",
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "1.2rem",
      fontWeight: "700",
      marginRight: "1.5rem",
      flexShrink: 0,
    },
    stepContent: {
      flex: 1,
    },
    stepTitle: {
      color: "#f5f5f5",
      fontSize: "1.3rem",
      fontWeight: "600",
      marginBottom: "0.5rem",
      marginTop: 0,
    },
    permissionList: {
      margin: "0.5rem 0",
      paddingLeft: "1.5rem",
    },
    noteBox: {
      backgroundColor: "#1a1a1a",
      border: "1px solid #22c55e",
      borderRadius: "8px",
      padding: "1.5rem",
      marginTop: "2rem",
    },
    encryptedMessageButton: {
      textAlign: "center",
      marginTop: "2rem",
      padding: "2rem",
      backgroundColor: "#1a1a1a",
      border: "2px solid #22c55e",
      borderRadius: "12px",
    },
    encryptedButton: {
      backgroundColor: "#22c55e",
      color: "#000",
      border: "none",
      padding: "1rem 2rem",
      borderRadius: "8px",
      fontSize: "1.1rem",
      fontWeight: "700",
      cursor: "pointer",
      transition: "all 0.3s ease",
      boxShadow: "0 4px 15px rgba(34, 197, 94, 0.3)",
    },
    buttonDescription: {
      marginTop: "1rem",
      color: "#ccc",
      fontSize: "0.9rem",
      fontStyle: "italic",
    },
    notification: {
      position: "fixed",
      top: "20px",
      left: "50%",
      transform: "translateX(-50%)",
      backgroundColor: "#0d0d0d",
      border: "2px solid #22c55e",
      borderRadius: "12px",
      padding: "1.5rem",
      maxWidth: "400px",
      width: "90%",
      boxShadow: "0 10px 30px rgba(0, 0, 0, 0.8), 0 0 20px rgba(34, 197, 94, 0.3)",
      zIndex: 10000,
      animation: "notificationSlideIn 0.5s ease-out",
    },
    notificationHeader: {
      display: "flex",
      alignItems: "center",
      marginBottom: "1rem",
    },
    notificationIcon: {
      fontSize: "1.5rem",
      marginRight: "0.75rem",
    },
    notificationTitle: {
      fontSize: "1.1rem",
      fontWeight: "600",
      color: "#22c55e",
      margin: 0,
    },
    notificationContent: {
      fontSize: "0.95rem",
      color: "#f5f5f5",
      lineHeight: "1.5",
      marginBottom: "1rem",
    },
    notificationList: {
      margin: "0.5rem 0",
      paddingLeft: "1.5rem",
    },
    notificationListItem: {
      color: "#ccc",
      marginBottom: "0.25rem",
      fontSize: "0.9rem",
    },
         notificationClose: {
       position: "absolute",
       top: "0.75rem",
       right: "0.75rem",
       backgroundColor: "transparent",
       border: "none",
       color: "#666",
       fontSize: "1.2rem",
       cursor: "pointer",
       padding: "0.25rem",
     },
     footer: {
       backgroundColor: "#0a0a0a",
       borderTop: "2px solid #22c55e",
       marginTop: "4rem",
       padding: "3rem 2rem 1rem",
       color: "#f5f5f5",
     },
     footerContent: {
       maxWidth: "1200px",
       margin: "0 auto",
       display: "grid",
       gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
       gap: "2rem",
       marginBottom: "2rem",
     },
     footerSection: {
       marginBottom: "1rem",
     },
     footerTitle: {
       fontSize: "1.3rem",
       fontWeight: "600",
       color: "#22c55e",
       marginBottom: "1rem",
       borderBottom: "1px solid #333",
       paddingBottom: "0.5rem",
     },
     footerText: {
       fontSize: "1rem",
       lineHeight: "1.6",
       color: "#ccc",
       marginBottom: "1rem",
     },
     footerList: {
       listStyle: "none",
       padding: 0,
       margin: 0,
     },
     footerListItem: {
       marginBottom: "0.75rem",
       color: "#ccc",
       fontSize: "0.95rem",
     },
     footerLink: {
       color: "#22c55e",
       textDecoration: "none",
       transition: "color 0.3s ease",
       cursor: "pointer",
     },
     footerLinkHover: {
       color: "#4ade80",
     },
   };

  return (
    <>
      <style>
        {`
          @keyframes notificationSlideIn {
            from {
              transform: translateX(-50%) translateY(-100%);
              opacity: 0;
            }
            to {
              transform: translateX(-50%) translateY(0);
              opacity: 1;
            }
          }
        `}
      </style>
      
      {/* Notification */}
      {showNotification && (
        <div style={styles.notification}>
                     <button 
             style={styles.notificationClose}
             onClick={() => {
               setShowNotification(false);
               if (notificationTimer) {
                 clearTimeout(notificationTimer);
                 setNotificationTimer(null);
               }
             }}
           >
             x
           </button>
          <div style={styles.notificationHeader}>
            <span style={styles.notificationIcon}>🔐</span>
            <h3 style={styles.notificationTitle}>Message Encrypted</h3>
          </div>
          <div style={styles.notificationContent}>
            Your message is now encrypted with military-grade security!
          </div>
          <div style={styles.notificationContent}>
            All communications in Adjunct are protected with:
          </div>
          <ul style={styles.notificationList}>
            <li style={styles.notificationListItem}>• End-to-end encryption</li>
            <li style={styles.notificationListItem}>• Public key cryptography</li>
            <li style={styles.notificationListItem}>• Zero-knowledge architecture</li>
            <li style={styles.notificationListItem}>• No server-side message storage</li>
          </ul>
        </div>
      )}
      
      <div style={styles.container}>
      <div style={styles.content}>
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Getting Started</h2>
          <div style={styles.sectionContent}>
            <p>
              Welcome to Adjunct, the revolutionary messaging platform with AI intelligence. 
              This documentation will guide you through all the features and capabilities of our platform.
            </p>
            <p>
              Adjunct combines human intelligence with AI precision to create a messaging experience 
              that goes beyond simple chat. Our platform understands context, learns your preferences, 
              and adapts to your communication style.
            </p>
          </div>
        </div>

        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Core Features</h2>
          <div style={styles.sectionContent}>
            <h3 style={{ color: "#f5f5f5", marginBottom: "0.5rem" }}>AI-Powered Intelligence</h3>
            <p>
              Our AI assistant can send emails, craft messages, summarize text, and handle tasks automatically. 
              Let AI do the heavy lifting while you focus on what matters most.
            </p>
            
            <h3 style={{ color: "#f5f5f5", marginBottom: "0.5rem", marginTop: "1.5rem" }}>Custom Commands</h3>
            <p>
              Execute powerful commands with natural language. Send emails, search the web, set reminders, 
              and automate tasks using simple text commands.
            </p>
            
            <h3 style={{ color: "#f5f5f5", marginBottom: "0.5rem", marginTop: "1.5rem" }}>Real-time Sync</h3>
            <p>
              Instant synchronization across all your devices. Your conversations, settings, and AI preferences 
              stay in sync wherever you go.
            </p>
          </div>
        </div>

                 <div style={styles.section}>
           <h2 style={styles.sectionTitle}>Privacy & Security</h2>
           <div style={styles.sectionContent}>
             <p>
               <span style={styles.highlight}>Asymmetric encryption</span> ensures your messages are secure. 
               Public key cryptography protects your data with mathematical complexity that's virtually unbreakable.
             </p>
             <p>
               Your privacy is our top priority. All communications are end-to-end encrypted, and we never store 
               your personal data or message content on our servers.
             </p>
             
             <div style={styles.encryptedMessageButton}>
                               <button 
                  style={styles.encryptedButton}
                  onClick={handleShowNotification}
                >
                  🔐 Send Encrypted Message
                </button>
               <p style={styles.buttonDescription}>
                 Click to experience our secure messaging system
               </p>
             </div>
           </div>
         </div>

                 <div style={styles.section}>
           <h2 style={styles.sectionTitle}>Quick Commands</h2>
           <div style={styles.sectionContent}>
             <p>Here are some useful commands you can try:</p>
             <div style={styles.codeBlock}>
               /ai - Call AI assistant and give commands
             </div>
             <p>
               Simply type these commands in any chat, and our AI will handle the rest. 
               You can also use natural language like "remind me to call John tomorrow at 3 PM."
             </p>
             
             <h3 style={{ color: "#f5f5f5", marginBottom: "0.5rem", marginTop: "1.5rem" }}>AI Command Examples</h3>
             <p>
               Use <span style={styles.highlight}>/ai</span> to directly interact with our AI assistant:
             </p>
             <p>
               The <span style={styles.highlight}>/ai</span> command is your direct line to AI assistance. 
               Just type "/ai" followed by your request, and our intelligent assistant will understand 
               and execute your command naturally.
             </p>
           </div>
         </div>

        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>App Flow & User Journey</h2>
          <div style={styles.sectionContent}>
            <p>
              Understanding how to get started with Adjunct is simple. Here's the complete flow from app opening to accessing your chats:
            </p>
            
            <div style={styles.flowContainer}>
              <div style={styles.flowStep}>
                <div style={styles.stepNumber}>1</div>
                <div style={styles.stepContent}>
                  <h4 style={styles.stepTitle}>App Launch</h4>
                  <p>Open the Adjunct app on your device. You'll see the welcome screen with our AI-powered messaging platform introduction.</p>
                </div>
              </div>

              <div style={styles.flowStep}>
                <div style={styles.stepNumber}>2</div>
                <div style={styles.stepContent}>
                  <h4 style={styles.stepTitle}>Phone Number Verification</h4>
                  <p>Enter your phone number to begin the verification process. This ensures secure access to your account.</p>
                </div>
              </div>

              <div style={styles.flowStep}>
                <div style={styles.stepNumber}>3</div>
                <div style={styles.stepContent}>
                  <h4 style={styles.stepTitle}>OTP Verification</h4>
                  <p>Receive a 6-digit OTP (One-Time Password) via SMS. Enter this code to verify your phone number and proceed.</p>
                </div>
              </div>

              <div style={styles.flowStep}>
                <div style={styles.stepNumber}>4</div>
                <div style={styles.stepContent}>
                  <h4 style={styles.stepTitle}>Access Permissions</h4>
                  <p>Grant necessary permissions for:</p>
                  <ul style={styles.permissionList}>
                    <li>Contacts - to sync your address book</li>
                      <li>Storage - for media file access</li>
                    <li>Notifications - to receive real-time updates</li>
                  </ul>
                </div>
              </div>

              <div style={styles.flowStep}>
                <div style={styles.stepNumber}>5</div>
                <div style={styles.stepContent}>
                  <h4 style={styles.stepTitle}>Profile Setup</h4>
                  <p>Create your profile by adding:</p>
                  <ul style={styles.permissionList}>
                    <li>Profile picture</li>
                    <li>Display name</li>
                    <li>Status message</li>
                    <li>Privacy preferences</li>
                  </ul>
                </div>
              </div>

    

              <div style={styles.flowStep}>
                <div style={styles.stepNumber}>6</div>
                <div style={styles.stepContent}>
                  <h4 style={styles.stepTitle}>Access Chats</h4>
                  <p>You're now ready to start messaging! Access your chats to:</p>
                  <ul style={styles.permissionList}>
                    <li>Start new conversations</li>
                    <li>Use AI-powered features</li>
                    <li>Send messages, files, and voice notes</li>
                    <li>Execute custom commands</li>
                    <li>Enjoy end-to-end encrypted communication</li>
                  </ul>
                </div>
              </div>
            </div>

            <div style={styles.noteBox}>
              <h4 style={{ color: "#22c55e", marginBottom: "0.5rem" }}>💡 Pro Tip</h4>
              <p>
                The entire setup process takes less than 2 minutes. Once completed, you'll have access to all 
                Adjunct features including AI-powered messaging, custom commands, and secure communication.
              </p>
            </div>
          </div>
        </div>
       </div>
      </div>
       
       {/* Footer */}
       <footer style={styles.footer}>
          <div style={styles.footerLinks}>
            <a href="#" style={{ color: "#aaa" }}>
              Privacy
            </a>
            <a href="#" style={{ color: "#aaa" }}>
              Terms
            </a>
          </div>
          
          {/* Contact Information */}
          <div style={{ marginTop: "1.5rem", textAlign: "center" }}>
            <h3 style={{ color: "#f5f5f5", fontSize: "1.1rem", marginBottom: "1rem" }}>Contact Us</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", alignItems: "center" }}>
              <p style={{ color: "#ccc", margin: "0" }}>
                <strong>Email:</strong> feedback@adjunct.in
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
     </>
   );
 }
