import React, { useState } from 'react';
import { X, ChevronRight, ChevronLeft, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedInput from './AnimatedInput';
import RippleButton from './RippleButton';

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

    const [currentStep, setCurrentStep] = useState(1);
    const [focusedInput, setFocusedInput] = useState(null);
    const [direction, setDirection] = useState(0);
    const [showCountryDropdown, setShowCountryDropdown] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState({ code: '+1', country: 'US', flag: '🇺🇸' });

    const countries = [
        { code: '+1', country: 'US', flag: '🇺🇸' },
        { code: '+91', country: 'IN', flag: '🇮🇳' },
        { code: '+44', country: 'UK', flag: '🇬🇧' },
        { code: '+61', country: 'AU', flag: '🇦🇺' },
        { code: '+49', country: 'DE', flag: '🇩🇪' },
        { code: '+33', country: 'FR', flag: '🇫🇷' },
        { code: '+81', country: 'JP', flag: '🇯🇵' },
        { code: '+86', country: 'CN', flag: '🇨🇳' },
        { code: '+55', country: 'BR', flag: '🇧🇷' },
    ];

    const totalSteps = 3;

    const validateStep = (step) => {
        if (step === 1) {
            return formData.name.trim() !== '' && formData.email.trim() !== '';
        }
        if (step === 2) {
            // Check if phone number is exactly 10 digits
            const phoneDigits = formData.phone.replace(/\D/g, '');
            return phoneDigits.length === 10;
        }
        if (step === 3) {
            return formData.referral !== '';
        }
        return true;
    };

    const handleNext = () => {
        if (currentStep < totalSteps && validateStep(currentStep)) {
            setDirection(1);
            setCurrentStep(prev => prev + 1);
        }
    };

    const handleBack = () => {
        if (currentStep > 1) {
            setDirection(-1);
            setCurrentStep(prev => prev - 1);
        }
    };

    const getInputStyle = (name) => ({
        ...styles.modernInput,
        ...(focusedInput === name ? styles.modernInputFocus : {})
    });

    // Custom handler for phone input to allow only numbers and max 10 digits
    const handlePhoneChange = (e) => {
        const value = e.target.value;
        // Allow only numbers
        if (value === '' || /^\d+$/.test(value)) {
            // Limit to 10 digits
            if (value.length <= 10) {
                handleInputChange(e);
            }
        }
    };

    const variants = {
        enter: (direction) => ({
            x: direction > 0 ? 50 : -50,
            opacity: 0,
            scale: 0.95
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1,
            scale: 1
        },
        exit: (direction) => ({
            zIndex: 0,
            x: direction < 0 ? 50 : -50,
            opacity: 0,
            scale: 0.95
        })
    };

    const renderStepIndicator = () => (
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem', gap: '0.5rem' }}>
            {[1, 2, 3].map((step) => (
                <div
                    key={step}
                    style={{
                        width: step === currentStep ? '30px' : '10px',
                        height: '10px',
                        borderRadius: '5px',
                        backgroundColor: step <= currentStep ? '#00C6FF' : 'rgba(255,255,255,0.2)',
                        transition: 'all 0.3s ease',
                        boxShadow: step === currentStep ? '0 0 10px rgba(0, 198, 255, 0.5)' : 'none'
                    }}
                />
            ))}
        </div>
    );

    const isStepValid = validateStep(currentStep);

    return (
        <div style={styles.popupOverlay} onClick={handleClosePopup}>
            <motion.div
                className="popup-form"
                style={{
                    ...responsiveStyles.popupForm,
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column'
                }}
                onClick={(e) => e.stopPropagation()}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ type: "spring", duration: 0.5 }}
            >
                <button
                    style={styles.closeButton}
                    onClick={handleClosePopup}
                    aria-label="Close form"
                >
                    <X size={20} />
                </button>

                <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
                    <h2 style={responsiveStyles.popupTitle}>
                        {currentStep === 1 && "Let's Start"}
                        {currentStep === 2 && "Stay Connected"}
                        {currentStep === 3 && "Final Touch"}
                    </h2>
                    <p style={styles.popupSubtitle}>
                        Step {currentStep} of {totalSteps}
                    </p>
                </div>

                {renderStepIndicator()}

                <form onSubmit={(e) => { e.preventDefault(); if (isStepValid) handleSubmit(e); }} style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <div style={{ flex: 1, position: 'relative', minHeight: '200px' }}>
                        <AnimatePresence initial={false} custom={direction} mode="wait">
                            {currentStep === 1 && (
                                <motion.div
                                    key="step1"
                                    custom={direction}
                                    variants={variants}
                                    initial="enter"
                                    animate="center"
                                    exit="exit"
                                    transition={{ x: { type: "spring", stiffness: 300, damping: 30 }, opacity: { duration: 0.2 } }}
                                    style={{ position: 'absolute', width: '100%' }}
                                >
                                    <AnimatedInput
                                        label="Full Name"
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        required
                                        style={{ marginBottom: '1.5rem' }}
                                    />
                                    <AnimatedInput
                                        label="Email Address"
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </motion.div>
                            )}

                            {currentStep === 2 && (
                                <motion.div
                                    key="step2"
                                    custom={direction}
                                    variants={variants}
                                    initial="enter"
                                    animate="center"
                                    exit="exit"
                                    transition={{ x: { type: "spring", stiffness: 300, damping: 30 }, opacity: { duration: 0.2 } }}
                                    style={{ position: 'absolute', width: '100%' }}
                                >
                                    <div style={styles.formGroup}>
                                        <label style={styles.formLabel} htmlFor="phone">Phone Number</label>
                                        <div style={styles.phoneInputContainer}>
                                            <div style={styles.countrySelector}>
                                                <button
                                                    type="button"
                                                    style={styles.countryButton}
                                                    onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                                                >
                                                    <span style={{ fontSize: '1.2rem' }}>{selectedCountry.flag}</span>
                                                    <span>{selectedCountry.code}</span>
                                                    <ChevronRight size={14} style={{ transform: `rotate(${showCountryDropdown ? '90deg' : '0deg'})`, transition: 'transform 0.2s' }} />
                                                </button>
                                                {showCountryDropdown && (
                                                    <div style={styles.countryDropdown}>
                                                        {countries.map((country) => (
                                                            <div
                                                                key={country.code + country.country}
                                                                style={{
                                                                    ...styles.countryItem,
                                                                    backgroundColor: selectedCountry.code === country.code ? 'rgba(255, 255, 255, 0.1)' : 'transparent'
                                                                }}
                                                                onClick={() => {
                                                                    setSelectedCountry(country);
                                                                    setShowCountryDropdown(false);
                                                                }}
                                                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'}
                                                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = selectedCountry.code === country.code ? 'rgba(255, 255, 255, 0.1)' : 'transparent'}
                                                            >
                                                                <span style={{ fontSize: '1.2rem' }}>{country.flag}</span>
                                                                <span style={{ color: 'rgba(255,255,255,0.6)' }}>{country.code}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                            <input
                                                type="tel"
                                                id="phone"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handlePhoneChange}
                                                style={{ ...getInputStyle('phone'), flex: 1 }}
                                                onFocus={() => setFocusedInput('phone')}
                                                onBlur={() => setFocusedInput(null)}
                                                placeholder="0000000000"
                                                required
                                                maxLength={10}
                                                pattern="\d{10}"
                                            />
                                        </div>
                                    </div>
                                    <div style={{
                                        padding: '1rem',
                                        background: 'rgba(0, 198, 255, 0.1)',
                                        borderRadius: '12px',
                                        border: '1px solid rgba(0, 198, 255, 0.2)',
                                        marginTop: '1rem'
                                    }}>
                                        <p style={{ fontSize: '0.9rem', color: '#e0e0e0', margin: 0, display: 'flex', gap: '0.5rem' }}>
                                            <Check size={16} color="#00C6FF" />
                                            We'll only use this for important updates.
                                        </p>
                                    </div>
                                </motion.div>
                            )}

                            {currentStep === 3 && (
                                <motion.div
                                    key="step3"
                                    custom={direction}
                                    variants={variants}
                                    initial="enter"
                                    animate="center"
                                    exit="exit"
                                    transition={{ x: { type: "spring", stiffness: 300, damping: 30 }, opacity: { duration: 0.2 } }}
                                    style={{ position: 'absolute', width: '100%' }}
                                >
                                    <div style={styles.formGroup}>
                                        <label style={styles.formLabel} htmlFor="reason">Why Adjunct? (Optional)</label>
                                        <textarea
                                            id="reason"
                                            name="reason"
                                            value={formData.reason}
                                            onChange={handleInputChange}
                                            style={{
                                                ...getInputStyle('reason'),
                                                minHeight: "80px",
                                                resize: "vertical"
                                            }}
                                            onFocus={() => setFocusedInput('reason')}
                                            onBlur={() => setFocusedInput(null)}
                                            placeholder="I want to experience the future..."
                                        />
                                    </div>
                                    <div style={styles.formGroup}>
                                        <label style={styles.formLabel} htmlFor="referral">Source</label>
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
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <div style={{ ...responsiveStyles.formButtons, marginTop: 'auto', paddingTop: '2rem', display: 'flex', gap: '1rem', width: '100%' }}>
                        {currentStep > 1 && (
                            <button
                                type="button"
                                onClick={handleBack}
                                style={{
                                    ...styles.buttonSecondary,
                                    flex: 1,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '0.5rem'
                                }}
                            >
                                <ChevronLeft size={18} /> Back
                            </button>
                        )}

                        {currentStep < totalSteps ? (
                            <RippleButton
                                onClick={handleNext}
                                disabled={!isStepValid}
                                style={{
                                    ...styles.gradientButton,
                                    flex: 1,
                                    width: 'auto',
                                    opacity: isStepValid ? 1 : 0.5,
                                    cursor: isStepValid ? 'pointer' : 'not-allowed',
                                    filter: isStepValid ? 'none' : 'grayscale(100%)',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '0.5rem',
                                    whiteSpace: 'nowrap',
                                }}
                            >
                                Next <ChevronRight size={18} />
                            </RippleButton>
                        ) : (
                            <RippleButton
                                onClick={handleSubmit}
                                disabled={!isStepValid}
                                style={{
                                    ...styles.gradientButton,
                                    flex: 1,
                                    width: 'auto',
                                    opacity: isStepValid ? 1 : 0.5,
                                    cursor: isStepValid ? 'pointer' : 'not-allowed',
                                    filter: isStepValid ? 'none' : 'grayscale(100%)'
                                }}
                            >
                                Join Now
                            </RippleButton>
                        )}
                    </div>
                </form>
            </motion.div>
        </div>
    );
};

export default PopupForm;
