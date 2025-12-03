import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Stars, Float, PerspectiveCamera, Text } from '@react-three/drei';
import * as THREE from 'three';

function HeroMesh() {
    const meshRef = useRef();

    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        if (meshRef.current) {
            // Complex rotation
            meshRef.current.rotation.x = Math.sin(time * 0.2) * 0.2;
            meshRef.current.rotation.y = time * 0.1;
            meshRef.current.rotation.z = Math.cos(time * 0.2) * 0.1;
        }
    });

    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <mesh ref={meshRef} position={[4, 0, -5]} scale={1.5}>
                <torusKnotGeometry args={[1, 0.3, 128, 16]} />
                <meshStandardMaterial
                    color="#0072FF"
                    emissive="#001a33"
                    wireframe
                    transparent
                    opacity={0.15}
                    roughness={0}
                    metalness={1}
                />
            </mesh>
        </Float>
    );
}

function InteractiveParticles({ count = 150 }) {
    const mesh = useRef();
    const { mouse, viewport } = useThree();

    const dummy = useMemo(() => new THREE.Object3D(), []);

    // Generate random initial positions and speeds
    const particles = useMemo(() => {
        const temp = [];
        for (let i = 0; i < count; i++) {
            const t = Math.random() * 100;
            const factor = 20 + Math.random() * 100;
            const speed = 0.01 + Math.random() / 200;
            const xFactor = -50 + Math.random() * 100;
            const yFactor = -50 + Math.random() * 100;
            const zFactor = -50 + Math.random() * 100;
            temp.push({ t, factor, speed, xFactor, yFactor, zFactor, mx: 0, my: 0 });
        }
        return temp;
    }, [count]);

    useFrame((state) => {
        particles.forEach((particle, i) => {
            let { t, factor, speed, xFactor, yFactor, zFactor } = particle;

            // Update time
            t = particle.t += speed / 2;

            // Interactive mouse movement
            // Lerp particle mouse position towards actual mouse position
            particle.mx += (mouse.x * viewport.width - particle.mx) * 0.02;
            particle.my += (mouse.y * viewport.height - particle.my) * 0.02;

            const a = Math.cos(t) + Math.sin(t * 1) / 10;
            const b = Math.sin(t) + Math.cos(t * 2) / 10;
            const s = Math.max(0.2, Math.cos(t));

            dummy.position.set(
                (particle.mx / 10) * a + xFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 1) * factor) / 10,
                (particle.my / 10) * b + yFactor + Math.sin((t / 10) * factor) + (Math.cos(t * 2) * factor) / 10,
                (particle.my / 10) * b + zFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 3) * factor) / 10
            );

            dummy.scale.set(s, s, s);
            dummy.rotation.set(s * 5, s * 5, s * 5);
            dummy.updateMatrix();

            mesh.current.setMatrixAt(i, dummy.matrix);
        });
        mesh.current.instanceMatrix.needsUpdate = true;
    });

    return (
        <instancedMesh ref={mesh} args={[null, null, count]}>
            <dodecahedronGeometry args={[0.2, 0]} />
            <meshPhongMaterial color="#00C6FF" transparent opacity={0.6} />
        </instancedMesh>
    );
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
                background: 'radial-gradient(ellipse at top, #0f0c29 0%, #302b63 50%, #24243e 100%)', // Deep purple/blue premium gradient
            }}
        >
            {/* Dark overlay for better text contrast */}
            <div style={{
                position: 'absolute',
                top: 0, left: 0, right: 0, bottom: 0,
                background: 'rgba(0,0,0,0.7)',
                zIndex: 0
            }} />

            <Canvas dpr={[1, 2]} gl={{ antialias: true, alpha: true }}>
                <PerspectiveCamera makeDefault position={[0, 0, 15]} fov={50} />
                <fog attach="fog" args={['#000000', 10, 40]} />

                {/* Lighting */}
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1.5} color="#0072FF" />
                <pointLight position={[-10, -10, -10]} intensity={1} color="#00C6FF" />
                <spotLight position={[0, 10, 0]} intensity={0.8} penumbra={1} />

                {/* 3D Elements */}
                <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
                <HeroMesh />
                <InteractiveParticles count={200} />
            </Canvas>

            {/* Vignette overlay */}
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
