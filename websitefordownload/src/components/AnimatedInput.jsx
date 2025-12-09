import React, { useState } from 'react';
import { motion } from 'framer-motion';

const AnimatedInput = ({
    label,
    type = 'text',
    value,
    onChange,
    placeholder = '',
    name,
    required = false,
    style = {},
    ...props
}) => {
    const [isFocused, setIsFocused] = useState(false);
    const hasValue = value && value.length > 0;

    return (
        <motion.div
            style={{
                position: 'relative',
                marginBottom: '1.5rem',
                ...style,
            }}
        >
            {/* Permanent Label Above */}
            <div style={{
                marginBottom: '0.5rem',
                fontSize: '0.9rem',
                fontWeight: '500',
                color: 'rgba(255, 255, 255, 0.8)',
            }}>
                {label}{required && ' *'}
            </div>

            {/* Input Field */}
            <motion.input
                id={name}
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                required={required}
                animate={{
                    scale: isFocused ? 1.01 : 1,
                }}
                transition={{
                    type: 'spring',
                    stiffness: 300,
                    damping: 20,
                }}
                style={{
                    width: '100%',
                    padding: '12px',
                    fontSize: '1rem',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: `2px solid ${isFocused ? '#00C6FF' : 'rgba(255, 255, 255, 0.1)'}`,
                    borderRadius: '8px',
                    color: '#fff',
                    outline: 'none',
                    transition: 'border-color 0.3s, box-shadow 0.3s',
                    boxShadow: isFocused
                        ? '0 0 0 3px rgba(0, 198, 255, 0.1), 0 0 20px rgba(0, 198, 255, 0.2)'
                        : 'none',
                }}
                {...props}
            />

            {/* Bottom Border Animation */}
            <motion.div
                initial={{ scaleX: 0 }}
                animate={{
                    scaleX: isFocused ? 1 : 0,
                }}
                transition={{
                    type: 'spring',
                    stiffness: 300,
                    damping: 30,
                }}
                style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '2px',
                    background: 'linear-gradient(90deg, #00C6FF 0%, #8B5CF6 50%, #FF0080 100%)',
                    transformOrigin: 'center',
                    borderRadius: '0 0 8px 8px',
                }}
            />
        </motion.div>
    );
};

export default AnimatedInput;
