import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';

const Toast = ({
    message,
    type = 'info',
    duration = 3000,
    onClose,
}) => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
            setTimeout(() => onClose && onClose(), 300);
        }, duration);

        return () => clearTimeout(timer);
    }, [duration, onClose]);

    const config = {
        success: {
            icon: CheckCircle,
            color: '#22c55e',
            bg: 'rgba(34, 197, 94, 0.1)',
            border: 'rgba(34, 197, 94, 0.3)',
        },
        error: {
            icon: AlertCircle,
            color: '#ef4444',
            bg: 'rgba(239, 68, 68, 0.1)',
            border: 'rgba(239, 68, 68, 0.3)',
        },
        info: {
            icon: Info,
            color: '#00C6FF',
            bg: 'rgba(0, 198, 255, 0.1)',
            border: 'rgba(0, 198, 255, 0.3)',
        },
    };

    const { icon: Icon, color, bg, border } = config[type] || config.info;

    if (!isVisible) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, y: -50, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{
                    type: 'spring',
                    stiffness: 500,
                    damping: 30,
                }}
                style={{
                    position: 'fixed',
                    top: '2rem',
                    right: '2rem',
                    zIndex: 10000,
                    background: bg,
                    border: `1px solid ${border}`,
                    borderRadius: '12px',
                    padding: '1rem 1.5rem',
                    backdropFilter: 'blur(10px)',
                    boxShadow: `0 8px 32px rgba(0, 0, 0, 0.3), 0 0 20px ${color}40`,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    maxWidth: '400px',
                    minWidth: '300px',
                }}
            >
                <Icon size={20} color={color} />
                <span style={{
                    flex: 1,
                    color: '#fff',
                    fontSize: '0.95rem',
                    fontWeight: '500',
                }}>
                    {message}
                </span>
                <button
                    onClick={() => {
                        setIsVisible(false);
                        setTimeout(() => onClose && onClose(), 300);
                    }}
                    style={{
                        background: 'none',
                        border: 'none',
                        color: 'rgba(255, 255, 255, 0.6)',
                        cursor: 'pointer',
                        padding: '4px',
                        display: 'flex',
                        alignItems: 'center',
                        transition: 'color 0.2s',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#fff'}
                    onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255, 255, 255, 0.6)'}
                >
                    <X size={18} />
                </button>

                {/* Progress bar */}
                <motion.div
                    initial={{ scaleX: 1 }}
                    animate={{ scaleX: 0 }}
                    transition={{ duration: duration / 1000, ease: 'linear' }}
                    style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: '3px',
                        background: color,
                        transformOrigin: 'left',
                        borderRadius: '0 0 12px 12px',
                    }}
                />
            </motion.div>
        </AnimatePresence>
    );
};

// Toast Manager Hook
export const useToast = () => {
    const [toasts, setToasts] = useState([]);

    const showToast = (message, type = 'info', duration = 3000) => {
        const id = Date.now() + Math.random();
        setToasts(prev => [...prev, { id, message, type, duration }]);
    };

    const removeToast = (id) => {
        setToasts(prev => prev.filter(t => t.id !== id));
    };

    const ToastContainer = () => (
        <div style={{ position: 'fixed', top: 0, right: 0, zIndex: 10000 }}>
            {toasts.map((toast, index) => (
                <div key={toast.id} style={{ marginTop: index > 0 ? '1rem' : 0 }}>
                    <Toast
                        {...toast}
                        onClose={() => removeToast(toast.id)}
                    />
                </div>
            ))}
        </div>
    );

    return { showToast, ToastContainer };
};

export default Toast;
