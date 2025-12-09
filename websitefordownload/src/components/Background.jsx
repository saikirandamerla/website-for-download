import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Simple Holographic Shape Component
function HolographicShape({ position, shape, scale, rotationSpeed, color }) {
    const meshRef = useRef();

    useFrame((state) => {
        if (!meshRef.current) return;
        meshRef.current.rotation.x += rotationSpeed * 0.01;
        meshRef.current.rotation.y += rotationSpeed * 0.015;
        meshRef.current.rotation.z += rotationSpeed * 0.008;

        // Floating animation
        meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.2;
    });

    const geometry = useMemo(() => {
        switch (shape) {
            case 'octahedron': return <octahedronGeometry args={[1, 0]} />;
            case 'dodecahedron': return <dodecahedronGeometry args={[1, 0]} />;
            case 'icosahedron': return <icosahedronGeometry args={[1, 0]} />;
            case 'tetrahedron': return <tetrahedronGeometry args={[1, 0]} />;
            default: return <boxGeometry args={[1, 1, 1]} />;
        }
    }, [shape]);

    return (
        <mesh ref={meshRef} position={position} scale={scale}>
            {geometry}
            <meshPhysicalMaterial
                color={color}
                emissive={color}
                emissiveIntensity={0.5}
                metalness={0.9}
                roughness={0.1}
                transparent
                opacity={0.6}
                transmission={0.9}
                thickness={0.5}
                ior={1.5}
                clearcoat={1}
                clearcoatRoughness={0}
            />
        </mesh>
    );
}

// Enhanced Particle System
function EnergyTrails({ count = 600 }) {
    const points = useRef();

    const particles = useMemo(() => {
        const positions = new Float32Array(count * 3);
        const colors = new Float32Array(count * 3);
        const sizes = new Float32Array(count);

        for (let i = 0; i < count; i++) {
            const i3 = i * 3;
            const angle = Math.random() * Math.PI * 2;
            const radius = 5 + Math.random() * 15;

            positions[i3] = Math.cos(angle) * radius;
            positions[i3 + 1] = (Math.random() - 0.5) * 20;
            positions[i3 + 2] = Math.sin(angle) * radius;

            const t = Math.random();
            colors[i3] = 0 + t * 0.5;
            colors[i3 + 1] = 0.77 - t * 0.3;
            colors[i3 + 2] = 1;

            sizes[i] = Math.random() * 0.1 + 0.03;
        }

        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

        return geometry;
    }, [count]);

    useFrame((state) => {
        if (!points.current) return;
        points.current.rotation.y = state.clock.getElapsedTime() * 0.05;

        const scale = 1 + Math.sin(state.clock.getElapsedTime() * 0.5) * 0.1;
        points.current.scale.set(scale, scale, scale);
    });

    return (
        <points ref={points} geometry={particles}>
            <pointsMaterial
                size={0.05}
                vertexColors
                transparent
                opacity={0.8}
                sizeAttenuation
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
}

// Fragment Field Generator
function FragmentField({ count = 18 }) {
    const fragments = useMemo(() => {
        const shapes = ['octahedron', 'dodecahedron', 'icosahedron', 'tetrahedron'];
        const colors = ['#00C6FF', '#8B5CF6', '#FF0080', '#00FF88'];
        return Array.from({ length: count }, () => ({
            position: [
                (Math.random() - 0.5) * 20,
                (Math.random() - 0.5) * 20,
                (Math.random() - 0.5) * 10
            ],
            shape: shapes[Math.floor(Math.random() * shapes.length)],
            color: colors[Math.floor(Math.random() * colors.length)],
            scale: 0.3 + Math.random() * 1.2,
            rotationSpeed: 0.2 + Math.random() * 0.8
        }));
    }, [count]);

    return (
        <group>
            {fragments.map((fragment, i) => (
                <HolographicShape
                    key={i}
                    position={fragment.position}
                    shape={fragment.shape}
                    color={fragment.color}
                    scale={fragment.scale}
                    rotationSpeed={fragment.rotationSpeed}
                />
            ))}
        </group>
    );
}

const Background = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePosition({
                x: (e.clientX / window.innerWidth) * 2 - 1,
                y: -(e.clientY / window.innerHeight) * 2 + 1,
            });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: -1,
                background: 'radial-gradient(circle at center, #050510 0%, #000000 100%)',
            }}
        >
            <Canvas
                dpr={[1, 2]}
                camera={{ position: [0, 0, 12], fov: 60 }}
                gl={{
                    antialias: true,
                    alpha: true,
                    toneMapping: THREE.ACESFilmicToneMapping,
                    toneMappingExposure: 1.2
                }}
            >
                <color attach="background" args={['#000000']} />
                <fog attach="fog" args={['#000000', 5, 25]} />

                <ambientLight intensity={0.3} />
                <pointLight position={[10, 10, 10]} intensity={50} color="#00C6FF" />
                <pointLight position={[-10, -10, -10]} intensity={50} color="#8B5CF6" />
                <spotLight
                    position={[0, 15, 0]}
                    angle={0.5}
                    penumbra={0.5}
                    intensity={30}
                    color="#ffffff"
                    castShadow
                />

                <FragmentField count={20} />
                <EnergyTrails count={700} />
            </Canvas>

            {/* Vignette overlay */}
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'radial-gradient(circle at center, transparent 20%, rgba(0, 0, 0, 0.5) 100%)',
                    pointerEvents: 'none',
                    zIndex: 1
                }}
            />

            {/* Mouse-following glow */}
            <div
                style={{
                    position: 'absolute',
                    left: `${(mousePosition.x + 1) * 50}%`,
                    top: `${(-mousePosition.y + 1) * 50}%`,
                    width: '400px',
                    height: '400px',
                    background: 'radial-gradient(circle, rgba(0, 198, 255, 0.15) 0%, transparent 70%)',
                    transform: 'translate(-50%, -50%)',
                    pointerEvents: 'none',
                    filter: 'blur(60px)',
                    transition: 'all 0.3s ease-out',
                    zIndex: 2,
                }}
            />
        </div>
    );
};

export default Background;
