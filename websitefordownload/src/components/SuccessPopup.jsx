import React from 'react';

const SuccessPopup = ({ styles, showSuccessPopup, setShowSuccessPopup, isMobileView }) => {
    if (!showSuccessPopup) return null;

    return (
        <div style={styles.popupOverlay} onClick={() => setShowSuccessPopup(false)}>
            <div
                className="success-popup"
                style={{
                    ...styles.successPopup,
                    position: "absolute",
                    left: "50%",
                    top: isMobileView ? "5%" : "10%",   // 👈 show at the start of page in mobile
                    transform: isMobileView ? "translateX(-50%)" : "translateX(-50%)", // 👈 no Y shifting in mobile
                    marginTop: isMobileView ? "1rem" : "0", // 👈 little spacing from very top
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
    );
};

export default SuccessPopup;
