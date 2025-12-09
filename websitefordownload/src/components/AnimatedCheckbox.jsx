import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const AnimatedCheckbox = ({
    checked,
    onChange,
    label,
    name,
    disabled = false,
}) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.label
            style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.75rem',
                cursor: disabled ? 'not-allowed' : 'pointer',
                userSelect: 'none',
                opacity: disabled ? 0.5 : 1,
            }}
            onMouseEnter={() => !disabled && setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            whileHover={!disabled ? { scale: 1.02 } : {}}
        >
            <input
                type="checkbox"
                checked={checked}
                onChange={onChange}
                name={name}
                disabled={disabled}
                style={{ display: 'none' }}
            />

            {/* Custom Checkbox */}
            <motion.div
                animate={{
                    scale: isHovered ? 1.1 : 1,
                    backgroundColor: checked
                        ? 'rgba(0, 198, 255, 1)'
                        : 'rgba(255, 255, 255, 0.05)',
                    borderColor: checked || isHovered
                        ? '#00C6FF'
                        : 'rgba(255, 255, 255, 0.2)',
                }}
                transition={{
                    type: 'spring',
                    stiffness: 400,
                    damping: 25,
                }}
                style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '6px',
                    border: '2px solid',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    overflow: 'hidden',
                }}
            >
                {/* Checkmark */}
                <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{
                        scale: checked ? 1 : 0,
                        rotate: checked ? 0 : -180,
                    }}
                    transition={{
                        type: 'spring',
                        stiffness: 500,
                        damping: 20,
                    }}
                >
                    <Check size={16} color="#fff" strokeWidth={3} />
                </motion.div>

                {/* Ripple effect on check */}
                {checked && (
                    <motion.div
                        initial={{ scale: 0, opacity: 0.6 }}
                        animate={{ scale: 2, opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        style={{
                            position: 'absolute',
                            inset: 0,
                            background: 'rgba(0, 198, 255, 0.5)',
                            borderRadius: '6px',
                        }}
                    />
                )}
            </motion.div>

            {/* Label */}
            {label && (
                <span style={{
                    fontSize: '0.95rem',
                    color: 'rgba(255, 255, 255, 0.9)',
                }}>
                    {label}
                </span>
            )}
        </motion.label>
    );
};

export default AnimatedCheckbox;
