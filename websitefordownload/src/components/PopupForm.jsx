import React, { useState } from 'react';
import { X } from 'lucide-react';

const PopupForm = ({
    styles,
    responsiveStyles,
    showPopup,
    handleClosePopup,
    handleSubmit,
    formData,
    handleInputChange
}) => {
    if (!showPopup) return null;

    const [focusedInput, setFocusedInput] = useState(null);
    const [closeButtonHovered, setCloseButtonHovered] = useState(false);

    const getInputStyle = (name) => ({
        ...styles.modernInput,
        ...(focusedInput === name ? styles.modernInputFocus : {})
    });

    return (
        <div style={styles.popupOverlay} onClick={handleClosePopup}>
            <div
                className="popup-form"
                style={responsiveStyles.popupForm}
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    style={{
                        ...styles.closeButton,
                        ...(closeButtonHovered ? styles.closeButtonHover : {})
                    }}
                    onClick={handleClosePopup}
                    onMouseEnter={() => setCloseButtonHovered(true)}
                    onMouseLeave={() => setCloseButtonHovered(false)}
                    aria-label="Close form"
                >
                    <X size={20} />
                </button>
                <h2 style={responsiveStyles.popupTitle}>Join the Waitlist</h2>
                <p style={styles.popupSubtitle}>Be the first to experience the future of AI communication</p>
                <form onSubmit={handleSubmit}>
                    <div style={styles.formGroup}>
                        <label style={styles.formLabel} htmlFor="name">Full Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            style={getInputStyle('name')}
                            onFocus={() => setFocusedInput('name')}
                            onBlur={() => setFocusedInput(null)}
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
                            style={getInputStyle('email')}
                            onFocus={() => setFocusedInput('email')}
                            onBlur={() => setFocusedInput(null)}
                            required
                        />
                    </div>
                    <div style={styles.formGroup}>
                        <label style={styles.formLabel} htmlFor="phone">Phone Number</label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            style={getInputStyle('phone')}
                            onFocus={() => setFocusedInput('phone')}
                            onBlur={() => setFocusedInput(null)}
                        />
                    </div>
                    <div style={styles.formGroup}>
                        <label style={styles.formLabel} htmlFor="reason">Why are you interested in Adjunct? (Optional)</label>
                        <textarea
                            id="reason"
                            name="reason"
                            value={formData.reason}
                            onChange={handleInputChange}
                            style={{
                                ...getInputStyle('reason'),
                                minHeight: "100px",
                                resize: "vertical"
                            }}
                            onFocus={() => setFocusedInput('reason')}
                            onBlur={() => setFocusedInput(null)}
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
                            style={getInputStyle('referral')}
                            onFocus={() => setFocusedInput('referral')}
                            onBlur={() => setFocusedInput(null)}
                            required
                        >
                            <option value="" style={{ color: "black" }}>Select an option</option>
                            <option value="family" style={{ color: "black" }}>Family</option>
                            <option value="friends" style={{ color: "black" }}>Friends</option>
                            <option value="social-media" style={{ color: "black" }}>Social Media</option>
                            <option value="other" style={{ color: "black" }}>Other</option>
                        </select>
                    </div>
                    <div style={responsiveStyles.formButtons}>
                        <button
                            type="submit"
                            style={styles.gradientButton}
                            className="gradient-button"
                        >
                            Join Now
                        </button>
                        <button
                            type="button"
                            style={{
                                ...styles.buttonSecondary,
                                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                            }}
                            onClick={handleClosePopup}
                            onMouseEnter={(e) => {
                                e.target.style.background = "rgba(255, 255, 255, 0.12)";
                                e.target.style.borderColor = "rgba(255, 255, 255, 0.5)";
                                e.target.style.transform = "translateY(-2px)";
                                e.target.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.4)";
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.background = "rgba(255, 255, 255, 0.05)";
                                e.target.style.borderColor = "rgba(255, 255, 255, 0.3)";
                                e.target.style.transform = "translateY(0)";
                                e.target.style.boxShadow = "none";
                            }}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PopupForm;
