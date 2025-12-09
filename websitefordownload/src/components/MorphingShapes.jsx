import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function FloatingShape({ position, color, scale }) {
    const meshRef = useRef();

    useFrame((state) => {
        if (!meshRef.current) return;
        meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
        meshRef.current.rotation.y += 0.01;
        meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.3 + position[0]) * 0.3;
    });

    return (
        <mesh ref={meshRef} position={position} scale={scale}>
            <sphereGeometry args={[1, 32, 32]} />
            <meshStandardMaterial
                color={color}
                emissive={color}
                emissiveIntensity={0.3}
                metalness={0.8}
                roughness={0.2}
                transparent
                opacity={0.7}
            />
        </mesh>
    );
}

const MorphingShapes = ({ mousePosition = { x: 0, y: 0 } }) => {
    return (
        <div
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 0,
                pointerEvents: 'none',
            }}
        >
            <Canvas
                camera={{ position: [0, 0, 5], fov: 75 }}
                gl={{ alpha: true, antialias: true }}
            >
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} color="#00C6FF" />
                <pointLight position={[-10, -10, -10]} intensity={1} color="#8B5CF6" />

                <FloatingShape position={[-3, 2, -5]} color="#00C6FF" scale={1.5} />
                <FloatingShape position={[3, -2, -7]} color="#8B5CF6" scale={1.2} />
                <FloatingShape position={[0, 0, -9]} color="#FF0080" scale={2} />
                <FloatingShape position={[-2, -3, -6]} color="#00FF88" scale={1} />
                <FloatingShape position={[4, 1, -8]} color="#FFD700" scale={1.3} />
            </Canvas>
        </div>
    );
};

export default MorphingShapes;
