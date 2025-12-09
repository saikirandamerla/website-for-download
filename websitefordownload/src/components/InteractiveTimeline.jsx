import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { CheckCircle2, Circle, Clock } from 'lucide-react';

const TimelineItem = ({ milestone, index, isLast }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    const { title, description, date, status, details } = milestone;

    const statusConfig = {
        completed: { icon: CheckCircle2, color: '#00FF88', label: 'Completed' },
        inProgress: { icon: Clock, color: '#00C6FF', label: 'In Progress' },
        upcoming: { icon: Circle, color: '#666666', label: 'Upcoming' },
    };

    const StatusIcon = statusConfig[status].icon;

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: index * 0.15 }}
            style={{
                position: 'relative',
                paddingLeft: '4rem',
                paddingBottom: isLast ? '0' : '4rem',
            }}
        >
            {/* Timeline line */}
            {!isLast && (
                <div
                    style={{
                        position: 'absolute',
                        left: '1.75rem',
                        top: '3rem',
                        width: '2px',
                        height: 'calc(100% - 2rem)',
                        background: 'linear-gradient(180deg, rgba(0, 198, 255, 0.5) 0%, rgba(0, 198, 255, 0.1) 100%)',
                    }}
                />
            )}

            {/* Timeline dot */}
            <motion.div
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ duration: 0.4, delay: index * 0.15 + 0.2 }}
                style={{
                    position: 'absolute',
                    left: '0.5rem',
                    top: '0.5rem',
                    width: '2.5rem',
                    height: '2.5rem',
                    borderRadius: '50%',
                    background: `radial-gradient(circle, ${statusConfig[status].color} 0%, ${statusConfig[status].color}40 100%)`,
                    border: `2px solid ${statusConfig[status].color}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: `0 0 20px ${statusConfig[status].color}80`,
                    zIndex: 2,
                }}
            >
                <StatusIcon size={16} color="#ffffff" />
            </motion.div>

            {/* Content card */}
            <motion.div
                className="iridescent-glass neural-pulse"
                whileHover={{
                    scale: 1.02,
                    boxShadow: '0 20px 60px rgba(0, 198, 255, 0.3)',
                }}
                style={{
                    padding: '2rem',
                    borderRadius: '20px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    position: 'relative',
                    overflow: 'hidden',
                }}
            >
                {/* Metallic shine effect */}
                <div className="metallic-shine" />

                {/* Header */}
                <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                    <div>
                        <h3
                            className="text-quantum-glow"
                            style={{
                                fontSize: '1.5rem',
                                fontWeight: '700',
                                marginBottom: '0.5rem',
                                color: 'var(--text-primary)',
                            }}
                        >
                            {title}
                        </h3>
                        <span
                            style={{
                                fontSize: '0.9rem',
                                color: 'var(--text-secondary)',
                                fontWeight: '500',
                            }}
                        >
                            {date}
                        </span>
                    </div>
                    <span
                        style={{
                            padding: '0.5rem 1rem',
                            borderRadius: '12px',
                            fontSize: '0.85rem',
                            fontWeight: '600',
                            color: statusConfig[status].color,
                            background: `${statusConfig[status].color}20`,
                            border: `1px solid ${statusConfig[status].color}40`,
                        }}
                    >
                        {statusConfig[status].label}
                    </span>
                </div>

                {/* Description */}
                <p
                    style={{
                        color: 'var(--text-secondary)',
                        fontSize: '1rem',
                        lineHeight: '1.6',
                        marginBottom: details?.length > 0 ? '1rem' : '0',
                    }}
                >
                    {description}
                </p>

                {/* Details list */}
                {details && details.length > 0 && (
                    <ul
                        style={{
                            listStyle: 'none',
                            padding: '0',
                            margin: '0',
                        }}
                    >
                        {details.map((detail, i) => (
                            <motion.li
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                animate={isInView ? { opacity: 1, x: 0 } : {}}
                                transition={{ duration: 0.4, delay: index * 0.15 + 0.3 + i * 0.1 }}
                                style={{
                                    color: 'var(--text-muted)',
                                    fontSize: '0.9rem',
                                    paddingLeft: '1.5rem',
                                    position: 'relative',
                                    marginBottom: '0.5rem',
                                }}
                            >
                                <span
                                    style={{
                                        position: 'absolute',
                                        left: '0',
                                        top: '0.5rem',
                                        width: '6px',
                                        height: '6px',
                                        borderRadius: '50%',
                                        background: statusConfig[status].color,
                                        boxShadow: `0 0 8px ${statusConfig[status].color}`,
                                    }}
                                />
                                {detail}
                            </motion.li>
                        ))}
                    </ul>
                )}
            </motion.div>
        </motion.div>
    );
};

const InteractiveTimeline = () => {
    const milestones = [
        {
            title: 'Project Inception',
            description: 'Adjunct was born from the vision of creating truly intelligent, secure communication.',
            date: 'Q1 2024',
            status: 'completed',
            details: [
                'Core architecture designed',
                'Security protocols established',
                'AI integration framework built',
            ],
        },
        {
            title: 'Alpha Development',
            description: 'Building the foundation with cutting-edge encryption and AI capabilities.',
            date: 'Q2 2024',
            status: 'completed',
            details: [
                'Asymmetric encryption implemented',
                'AI assistant core developed',
                'Real-time sync architecture',
            ],
        },
        {
            title: 'Beta Testing',
            description: 'Refining the experience with select users and gathering crucial feedback.',
            date: 'Q3-Q4 2024',
            status: 'inProgress',
            details: [
                'Closed beta with 500+ testers',
                'Performance optimization ongoing',
                'Feature refinement based on feedback',
            ],
        },
        {
            title: 'Public Launch',
            description: 'Opening Adjunct to the world with full feature set and global availability.',
            date: 'Q1 2025',
            status: 'upcoming',
            details: [
                'Global server infrastructure',
                'Multi-platform support',
                'Premium features unlocked',
            ],
        },
        {
            title: 'Enterprise Edition',
            description: 'Expanding to serve businesses with advanced team collaboration features.',
            date: 'Q2 2025',
            status: 'upcoming',
            details: [
                'Team workspace management',
                'Advanced admin controls',
                'Custom integration APIs',
            ],
        },
    ];

    return (
        <section style={{ padding: '0', position: 'relative', maxWidth: '900px', margin: '0 auto' }}>
            {/* Section header */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                style={{
                    textAlign: 'center',
                    marginBottom: '4rem',
                }}
            >
                <h2
                    className="holographic-text"
                    style={{
                        fontSize: '2.5rem',
                        fontWeight: '700',
                        marginBottom: '1rem',
                    }}
                >
                    Our Journey
                </h2>
                <p
                    style={{
                        fontSize: '1.1rem',
                        color: 'var(--text-secondary)',
                        maxWidth: '600px',
                        margin: '0 auto',
                    }}
                >
                    From concept to reality - tracking Adjunct's evolution into the future of communication
                </p>
            </motion.div>

            {/* Timeline */}
            <div style={{ position: 'relative' }}>
                {milestones.map((milestone, index) => (
                    <TimelineItem
                        key={index}
                        milestone={milestone}
                        index={index}
                        isLast={index === milestones.length - 1}
                    />
                ))}
            </div>
        </section>
    );
};

export default InteractiveTimeline;
