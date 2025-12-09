import React, { useState } from 'react';
import { styles } from '../styles';
import { Loader2, Lock, Check, AlertCircle } from 'lucide-react';

const API_URL = 'http://localhost:3001/api';

const EncryptionTool = () => {
    const [text, setText] = useState("");
    const [encrypted, setEncrypted] = useState("");
    const [encryptionData, setEncryptionData] = useState(null);
    const [isEncrypting, setIsEncrypting] = useState(false);
    const [encryptedAt, setEncryptedAt] = useState(null);
    const [copied, setCopied] = useState(false);
    const [error, setError] = useState(null);

    const handleEncrypt = async () => {
        if (text.trim() === '') return;

        setIsEncrypting(true);
        setCopied(false);
        setError(null);

        try {
            const response = await fetch(`${API_URL}/encrypt`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: text })
            });

            if (!response.ok) {
                throw new Error('Encryption failed');
            }

            const data = await response.json();

            if (data.success) {
                // Store the full encryption data (encrypted, iv, authTag)
                setEncryptionData(data);
                // Display the encrypted text
                setEncrypted(data.encrypted);
                setEncryptedAt(new Date(data.timestamp).toLocaleString());
            } else {
                throw new Error(data.error || 'Encryption failed');
            }
        } catch (err) {
            console.error('Encryption error:', err);
            setError('Failed to encrypt message. Make sure the encryption server is running on port 3001.');
            setEncrypted('');
        } finally {
            setIsEncrypting(false);
        }
    };

    const handleCopyEncrypted = async () => {
        if (!encrypted) return;
        try {
            // Copy the full encryption data as JSON for later decryption
            const dataToCopy = JSON.stringify({
                encrypted: encryptionData.encrypted,
                iv: encryptionData.iv,
                authTag: encryptionData.authTag
            }, null, 2);

            await navigator.clipboard.writeText(dataToCopy);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Copy failed:', err);
        }
    };

    return (
        <div style={{
            textAlign: "center",
            padding: "0 1rem",
            maxWidth: "100%",
        }}>
            <h2 style={{ marginBottom: "0.5rem" }}>Try Our Encryption Tool</h2>
            <p style={{
                color: "var(--text-secondary)",
                fontSize: "0.9rem",
                marginBottom: "1.5rem"
            }}>
                Server-side AES-256-GCM encryption - Each message gets unique encryption
            </p>

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
                    onKeyPress={(e) => e.key === 'Enter' && handleEncrypt()}
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
                    disabled={!text.trim() || isEncrypting}
                    className={text.trim() ? "gradient-button" : ""}
                    style={{
                        ...styles.buttonPrimary,
                        width: window.innerWidth <= 768 ? "100%" : "auto",
                        opacity: text.trim() && !isEncrypting ? 1 : 0.5,
                        cursor: text.trim() && !isEncrypting ? "pointer" : "not-allowed",
                    }}
                    onMouseEnter={(e) => {
                        if (text.trim() && !isEncrypting) {
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
                        if (text.trim() && !isEncrypting) {
                            Object.assign(e.currentTarget.style, styles.buttonPrimaryActive);
                        }
                    }}
                    onMouseUp={(e) => {
                        if (text.trim() && !isEncrypting) {
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

            {/* Error Message */}
            {error && (
                <div style={{
                    marginTop: '1.5rem',
                    padding: '1rem',
                    background: 'rgba(239, 68, 68, 0.1)',
                    border: '1px solid rgba(239, 68, 68, 0.3)',
                    borderRadius: '8px',
                    color: '#ef4444',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    justifyContent: 'center',
                    fontSize: '0.9rem'
                }}>
                    <AlertCircle size={18} />
                    <span>{error}</span>
                </div>
            )}

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
                        <span>Encrypting with AES-256-GCM...</span>
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
                            <Lock size={18} style={{ marginRight: '8px', color: '#22c55e' }} />
                            Encrypted Text
                        </div>
                        <div style={{
                            padding: window.innerWidth <= 768 ? '10px' : '12px 16px',
                            border: '1px solid rgba(0, 198, 255, 0.3)',
                            borderRadius: 8,
                            background: 'rgba(0, 0, 0, 0.5)',
                            color: '#00C6FF',
                            fontFamily: 'monospace',
                            wordBreak: "break-all",
                            fontSize: window.innerWidth <= 768 ? "0.75rem" : "0.85rem",
                            maxWidth: "100%",
                            overflowX: "auto",
                            maxHeight: "150px",
                            overflowY: "auto",
                        }}>
                            {encrypted}
                        </div>

                        {/* Show IV and Auth Tag info */}
                        {encryptionData && (
                            <div style={{
                                marginTop: '0.75rem',
                                padding: '0.75rem',
                                background: 'rgba(139, 92, 246, 0.1)',
                                border: '1px solid rgba(139, 92, 246, 0.2)',
                                borderRadius: '6px',
                                fontSize: '0.8rem',
                                color: 'var(--text-secondary)',
                                textAlign: 'left'
                            }}>
                                <div style={{ marginBottom: '0.25rem' }}>
                                    <strong>IV:</strong> {encryptionData.iv.substring(0, 20)}...
                                </div>
                                <div>
                                    <strong>Auth Tag:</strong> {encryptionData.authTag.substring(0, 20)}...
                                </div>
                            </div>
                        )}

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
                                        Copied Full Data!
                                    </>
                                ) : 'Copy Encryption Data'}
                            </button>
                            <button
                                onClick={() => { setEncrypted(''); setText(''); setEncryptionData(null); setError(null); }}
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
                        Enter text above and click Encrypt to create a secure encrypted string.
                        <div style={{ marginTop: '0.5rem', fontSize: '0.85rem', color: '#555' }}>
                            💡 Each encryption is unique - try encrypting the same text twice!
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default EncryptionTool;
