import React, { useState } from 'react';
import { styles } from '../styles';
import { Loader2, Lock, Check } from 'lucide-react';

const EncryptionTool = () => {
    const [text, setText] = useState("");
    const [encrypted, setEncrypted] = useState("");
    const [isEncrypting, setIsEncrypting] = useState(false);
    const [encryptedAt, setEncryptedAt] = useState(null);
    const [copied, setCopied] = useState(false);

    const handleEncrypt = () => {
        // Create a UTF-8 safe base64 encoder
        const utf8ToB64 = (str) => {
            try {
                const uint8 = new TextEncoder().encode(str);
                let binary = "";
                for (let i = 0; i < uint8.length; i++) {
                    binary += String.fromCharCode(uint8[i]);
                }
                return btoa(binary);
            } catch (err) {
                // Fallback to simple btoa if TextEncoder isn't available
                try {
                    return btoa(str);
                } catch (e) {
                    console.error('Base64 encode failed:', e);
                    return '';
                }
            }
        };

        // Generate a short random nonce (hex) using crypto API
        const generateNonce = (length = 8) => {
            try {
                const arr = new Uint8Array(length);
                window.crypto.getRandomValues(arr);
                return Array.from(arr).map((b) => b.toString(16).padStart(2, '0')).join('');
            } catch (err) {
                // fallback to Math.random
                let s = '';
                for (let i = 0; i < length; i++) s += Math.floor(Math.random() * 256).toString(16).padStart(2, '0');
                return s;
            }
        };

        // Ensure non-empty input
        if (text.trim() === '') return;
        setIsEncrypting(true);
        setCopied(false);

        // Simulate a short processing delay for UX and create a unique payload
        setTimeout(() => {
            try {
                const nonce = generateNonce(8);
                const timestamp = new Date().toISOString();
                // Combine original text with nonce and timestamp so repeated encryptions produce different outputs
                const payload = JSON.stringify({ text, nonce, timestamp });
                const encoded = utf8ToB64(payload);
                setEncrypted(encoded);
                setEncryptedAt(new Date().toLocaleString());
            } catch (err) {
                console.error('Encryption error:', err);
                setEncrypted('');
            } finally {
                setIsEncrypting(false);
            }
        }, 250);
    };

    const handleCopyEncrypted = async () => {
        if (!encrypted) return;
        try {
            await navigator.clipboard.writeText(encrypted);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Copy failed:', err);
        }
    };

    return (
        <div style={{
            textAlign: "center",
            padding: "2rem 1rem",
            maxWidth: "100%",
        }}>
            <h2 style={{ marginBottom: "1rem" }}>Try Our Simple Encryption Tool</h2>
            <div style={{
                marginTop: "2rem",
                display: "flex",
                flexDirection: window.innerWidth <= 768 ? "column" : "row",
                gap: "0.75rem",
                justifyContent: "center",
                alignItems: "center",
                flexWrap: "wrap",
            }}>
                <input
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Enter text to encrypt"
                    style={{
                        padding: "0.75rem",
                        borderRadius: "8px",
                        border: "1px solid #ccc",
                        width: window.innerWidth <= 768 ? "100%" : "min(300px, 100%)",
                        maxWidth: "100%",
                        fontSize: "1rem",
                        boxSizing: "border-box",
                        fontFamily: "inherit",
                    }}
                />
                <button
                    onClick={handleEncrypt}
                    disabled={!text.trim()}
                    className={text.trim() ? "gradient-button" : ""}
                    style={{
                        ...styles.buttonPrimary,
                        width: window.innerWidth <= 768 ? "100%" : "auto",
                        opacity: text.trim() ? 1 : 0.5,
                        cursor: text.trim() ? "pointer" : "not-allowed",
                    }}
                    onMouseEnter={(e) => {
                        if (text.trim()) {
                            Object.assign(e.currentTarget.style, styles.buttonPrimaryHover);
                        }
                    }}
                    onMouseLeave={(e) => {
                        Object.assign(e.currentTarget.style, {
                            transform: styles.buttonPrimary.transform,
                            boxShadow: styles.buttonPrimary.boxShadow
                        });
                    }}
                    onMouseDown={(e) => {
                        if (text.trim()) {
                            Object.assign(e.currentTarget.style, styles.buttonPrimaryActive);
                        }
                    }}
                    onMouseUp={(e) => {
                        if (text.trim()) {
                            Object.assign(e.currentTarget.style, styles.buttonPrimaryHover);
                        }
                    }}
                >
                    {isEncrypting ? (
                        <>
                            <Loader2 className="animate-spin" size={18} style={{ marginRight: '8px' }} />
                            Encrypting...
                        </>
                    ) : (
                        <>
                            <Lock size={18} style={{ marginRight: '8px' }} />
                            Encrypt
                        </>
                    )}
                </button>
            </div>

            <div style={{
                marginTop: '2rem',
                textAlign: 'center',
                padding: "0 1rem",
                maxWidth: "100%",
            }}>
                {isEncrypting ? (
                    <div style={{
                        color: 'var(--text-secondary)',
                        fontSize: "1rem",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "0.75rem"
                    }}>
                        <Loader2 className="animate-spin" size={20} color="var(--accent-secondary)" />
                        <span>Encrypting data...</span>
                    </div>
                ) : encrypted ? (
                    <div style={{
                        display: 'inline-block',
                        textAlign: 'left',
                        maxWidth: "100%",
                        width: "100%",
                    }}>
                        <div style={{
                            fontWeight: '700',
                            marginBottom: '0.5rem',
                            fontSize: window.innerWidth <= 768 ? "1rem" : "1.1rem",
                            display: "flex",
                            alignItems: "center",
                        }}>
                            <Lock size={18} className="text-green-500" style={{ marginRight: '8px', color: '#22c55e' }} />
                            Encrypted Text
                        </div>
                        <div style={{
                            padding: window.innerWidth <= 768 ? '10px' : '12px 16px',
                            border: '1px solid #ccc',
                            borderRadius: 8,
                            background: '#0b0b0b',
                            color: '#22c55e',
                            fontFamily: 'monospace',
                            wordBreak: "break-all",
                            fontSize: window.innerWidth <= 768 ? "0.85rem" : "0.95rem",
                            maxWidth: "100%",
                            overflowX: "auto",
                        }}>
                            {encrypted}
                        </div>
                        <div style={{
                            marginTop: '0.75rem',
                            display: 'flex',
                            flexDirection: window.innerWidth <= 768 ? "column" : "row",
                            gap: '0.5rem',
                            justifyContent: 'center',
                            maxWidth: "100%",
                        }}>
                            <button
                                onClick={handleCopyEncrypted}
                                style={{
                                    ...styles.buttonSecondary,
                                    width: window.innerWidth <= 768 ? "100%" : "auto",
                                    backgroundColor: copied ? '#22c55e' : styles.buttonSecondary.background,
                                    color: copied ? '#fff' : styles.buttonSecondary.color,
                                    borderColor: copied ? '#22c55e' : styles.buttonSecondary.border.split(' ')[2],
                                }}
                            >
                                {copied ? (
                                    <>
                                        <Check size={16} style={{ marginRight: '6px' }} />
                                        Copied!
                                    </>
                                ) : 'Copy'}
                            </button>
                            <button
                                onClick={() => { setEncrypted(''); setText(''); }}
                                style={{
                                    ...styles.buttonSecondary,
                                    width: window.innerWidth <= 768 ? "100%" : "auto",
                                }}
                            >
                                Clear
                            </button>
                        </div>
                        {encryptedAt && (
                            <div style={{
                                marginTop: '0.75rem',
                                color: '#888',
                                fontSize: window.innerWidth <= 768 ? '0.8rem' : '0.85rem',
                            }}>
                                Encrypted at: {encryptedAt}
                            </div>
                        )}
                    </div>
                ) : (
                    <div style={{
                        color: '#777',
                        fontSize: window.innerWidth <= 768 ? "0.9rem" : "1rem",
                        padding: "0 1rem",
                    }}>
                        Enter text above and click Encrypt to create an encrypted string.
                    </div>
                )}
            </div>
        </div>
    );
};

export default EncryptionTool;
