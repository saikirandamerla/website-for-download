import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Stars, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

function NeuralFlux({ count = 1000 }) {
    const mesh = useRef();
    const { mouse, viewport } = useThree();

    const particles = useMemo(() => {
        const temp = new Float32Array(count * 3);
        const randomProps = [];
        for (let i = 0; i < count; i++) {
            const i3 = i * 3;
            // Initial positions in a sphere-like distribution
            const r = 10 + Math.random() * 10;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);

            temp[i3] = r * Math.sin(phi) * Math.cos(theta);
            temp[i3 + 1] = r * Math.sin(phi) * Math.sin(theta);
            temp[i3 + 2] = r * Math.cos(phi);

            randomProps.push({
                speed: 0.1 + Math.random() * 0.5,
                factor: 0.5 + Math.random() * 1.5,
                offset: Math.random() * 100,
                basePos: [temp[i3], temp[i3 + 1], temp[i3 + 2]]
            });
        }
        return { positions: temp, props: randomProps };
    }, [count]);

    useFrame((state) => {
        if (!mesh.current) return;

        const time = state.clock.getElapsedTime();
        const positions = mesh.current.geometry.attributes.position.array;

        for (let i = 0; i < count; i++) {
            const i3 = i * 3;
            const { speed, factor, offset, basePos } = particles.props[i];

            // Organic movement logic
            const t = time * speed + offset;

            // Mouse interaction
            const mouseX = (mouse.x * viewport.width) / 2;
            const mouseY = (mouse.y * viewport.height) / 2;

            // Calculate distance to mouse for interaction
            const dx = positions[i3] - mouseX;
            const dy = positions[i3 + 1] - mouseY;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const mouseInfluence = Math.max(0, 5 - dist) * 0.5;

            // Update positions with wave motion + mouse influence
            positions[i3] = basePos[0] + Math.sin(t) * factor + (Math.sin(t * 0.5) * 2) - (dx / dist) * mouseInfluence;
            positions[i3 + 1] = basePos[1] + Math.cos(t * 0.8) * factor + (Math.cos(t * 0.3) * 2) - (dy / dist) * mouseInfluence;
            positions[i3 + 2] = basePos[2] + Math.sin(t * 0.3) * factor;
        }

        mesh.current.geometry.attributes.position.needsUpdate = true;

        // Slowly rotate the entire system
        mesh.current.rotation.y = time * 0.05;
        mesh.current.rotation.z = time * 0.02;
    });

    return (
        <points ref={mesh}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={particles.positions.length / 3}
                    array={particles.positions}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.15}
                color="#00C6FF"
                sizeAttenuation={true}
                transparent={true}
                opacity={0.8}
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
}

function ConnectionLines({ count = 50 }) {
    // A simpler secondary layer for "connections"
    const linesRef = useRef();

    useFrame((state) => {
        if (linesRef.current) {
            linesRef.current.rotation.x = state.clock.getElapsedTime() * 0.02;
            linesRef.current.rotation.y = state.clock.getElapsedTime() * 0.03;
        }
    });

    const points = useMemo(() => {
        const p = [];
        for (let i = 0; i < count; i++) {
            const x = (Math.random() - 0.5) * 30;
            const y = (Math.random() - 0.5) * 30;
            const z = (Math.random() - 0.5) * 30;
            p.push(new THREE.Vector3(x, y, z));
        }
        return p;
    }, [count]);

    return (
        <group ref={linesRef}>
            {points.map((point, i) => (
                <mesh key={i} position={point}>
                    <sphereGeometry args={[0.05, 8, 8]} />
                    <meshBasicMaterial color="#0072FF" transparent opacity={0.4} />
                </mesh>
            ))}
        </group>
    )
}

const Background = () => {
    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: -1,
                background: 'radial-gradient(ellipse at top, #0f0c29 0%, #302b63 50%, #24243e 100%)',
            }}
        >
            <div style={{
                position: 'absolute',
                top: 0, left: 0, right: 0, bottom: 0,
                background: 'rgba(0,0,0,0.7)',
                zIndex: 0
            }} />

            <Canvas dpr={[1, 2]} gl={{ antialias: true, alpha: true }} camera={{ position: [0, 0, 20], fov: 60 }}>
                <fog attach="fog" args={['#0f0c29', 10, 60]} />

                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1.5} color="#0072FF" />

                <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
                <NeuralFlux count={1500} />
                <ConnectionLines count={30} />
            </Canvas>

            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'radial-gradient(circle at center, transparent 30%, rgba(0, 0, 0, 0.8) 100%)',
                    pointerEvents: 'none',
                    zIndex: 1
                }}
            />
        </div>
    );
};

export default Background;
