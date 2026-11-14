
import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, ContactShadows } from "@react-three/drei";
import * as THREE from "three";

function LogoModel() {
  const groupRef = useRef();

  useFrame((state) => {
    if (!groupRef.current) return;

    const { pointer } = state;

    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      pointer.x * 0.28,
      0.04
    );

    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      -pointer.y * 0.18,
      0.04
    );
  });

  return (
    <Float speed={1.2} rotationIntensity={0.12} floatIntensity={0.25}>
      <group ref={groupRef}>
        <mesh>
          <planeGeometry args={[3.8, 3.8]} />
          <meshStandardMaterial
            color="#ffffff"
            roughness={0.3}
            metalness={0.15}
            transparent
            opacity={0}
          />
        </mesh>

        <mesh position={[0, 0, 0.08]}>
          <planeGeometry args={[3.5, 3.5]} />
          <meshBasicMaterial
            map={new THREE.TextureLoader().load("/shamoir-logo.png")}
            transparent
          />
        </mesh>
      </group>
    </Float>
  );
}

export default function Hero3D() {
  return (
    <div className="hero-3d">
      <Canvas camera={{ position: [0, 0, 6], fov: 42 }}>
        <ambientLight intensity={1.5} />
        <directionalLight position={[3, 4, 5]} intensity={2} />
        <pointLight position={[-3, -2, 2]} color="#0b9b63" intensity={3} />

        <LogoModel />

        <Environment preset="city" />
        <ContactShadows
          position={[0, -2.1, -0.5]}
          opacity={0.3}
          scale={6}
          blur={2}
        />
      </Canvas>
    </div>
  );
}
