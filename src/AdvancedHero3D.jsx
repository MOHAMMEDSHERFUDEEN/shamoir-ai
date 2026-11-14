
import { useRef, Suspense, memo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Float,
  Sparkles,
  Environment,
  useTexture,
} from "@react-three/drei";
import * as THREE from "three";

/* ORIGINAL SHAMOIR EMBLEM */
function OriginalEmblem({ scrollProgress = 0 }) {
  const group = useRef();
  const texture = useTexture("/shamoir-logo.png");

  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;

  useFrame((state, delta) => {
    if (!group.current) return;

    const targetX =
      state.pointer.y * 0.18 + scrollProgress * 0.2;

    const targetY =
      state.pointer.x * 0.24 + scrollProgress * 0.55;

    const targetZ = scrollProgress * 0.16;

    group.current.rotation.x = THREE.MathUtils.damp(
      group.current.rotation.x,
      targetX,
      2.5,
      delta
    );

    group.current.rotation.y = THREE.MathUtils.damp(
      group.current.rotation.y,
      targetY,
      2.5,
      delta
    );

    group.current.rotation.z = THREE.MathUtils.damp(
      group.current.rotation.z,
      targetZ,
      2.5,
      delta
    );

    group.current.position.y = THREE.MathUtils.damp(
      group.current.position.y,
      Math.sin(state.clock.elapsedTime * 0.65) * 0.07,
      2,
      delta
    );
  });

  return (
    <Float
      speed={0.8}
      rotationIntensity={0.035}
      floatIntensity={0.15}
    >
      <group ref={group}>
        <mesh>
          <planeGeometry args={[5.2, 5]} />
          <meshBasicMaterial
            map={texture}
            transparent
            side={THREE.DoubleSide}
            toneMapped={false}
            depthWrite={false}
          />
        </mesh>
      </group>
    </Float>
  );
}

/* OPTIMIZED ORBITAL SYSTEM */
function Orbitals({ scrollProgress = 0 }) {
  const group = useRef();
  const innerRing = useRef();

  useFrame((state, delta) => {
    if (!group.current || !innerRing.current) return;

    group.current.rotation.z += delta * 0.035;

    group.current.rotation.x = THREE.MathUtils.damp(
      group.current.rotation.x,
      scrollProgress * 0.15,
      2,
      delta
    );

    group.current.rotation.y = THREE.MathUtils.damp(
      group.current.rotation.y,
      scrollProgress * 0.25,
      2,
      delta
    );

    innerRing.current.rotation.z -= delta * 0.055;
  });

  return (
    <>
      <group ref={group}>
        <mesh rotation={[1.1, 0.3, 0.2]}>
          <torusGeometry args={[2.85, 0.008, 8, 128]} />
          <meshBasicMaterial
            color="#16B879"
            transparent
            opacity={0.5}
          />
        </mesh>

        <mesh rotation={[0.5, 1, -0.4]}>
          <torusGeometry args={[3.1, 0.006, 8, 128]} />
          <meshBasicMaterial
            color="#C2CEC8"
            transparent
            opacity={0.3}
          />
        </mesh>

        <mesh rotation={[0.8, -0.6, 0.7]}>
          <torusGeometry args={[3.35, 0.004, 8, 128]} />
          <meshBasicMaterial
            color="#45E0A0"
            transparent
            opacity={0.2}
          />
        </mesh>
      </group>

      <group ref={innerRing}>
        <mesh rotation={[1.3, 0.2, 0.4]}>
          <torusGeometry args={[2.45, 0.004, 8, 128]} />
          <meshBasicMaterial
            color="#D9E5DF"
            transparent
            opacity={0.18}
          />
        </mesh>
      </group>
    </>
  );
}

/* AMBIENT LIGHTING */
function SceneLighting() {
  return (
    <>
      <ambientLight intensity={0.65} />

      <pointLight
        position={[-4, 1, -2]}
        intensity={20}
        color="#087A50"
        distance={10}
      />

      <pointLight
        position={[4, -2, 3]}
        intensity={18}
        color="#16B879"
        distance={10}
      />

      <pointLight
        position={[0, 4, 4]}
        intensity={8}
        color="#C2CEC8"
        distance={12}
      />

      <directionalLight
        position={[3, 5, 6]}
        intensity={1.5}
      />
    </>
  );
}

/* COMPLETE 3D SCENE */
function Scene({ scrollProgress }) {
  return (
    <>
      <SceneLighting />

      <Orbitals scrollProgress={scrollProgress} />

      <OriginalEmblem scrollProgress={scrollProgress} />

      <Sparkles
        count={65}
        scale={7}
        size={1.6}
        speed={0.2}
        opacity={0.55}
        color="#45E0A0"
      />

      <Sparkles
        count={25}
        scale={[5, 5, 3]}
        size={2}
        speed={0.12}
        opacity={0.3}
        color="#C2CEC8"
      />

      <Sparkles
        count={12}
        scale={[4, 4, 4]}
        size={3}
        speed={0.08}
        opacity={0.18}
        color="#16B879"
      />

      <Environment preset="city" />
    </>
  );
}

/* SHAMOIR AI 3D EXPERIENCE */
function AdvancedHero3D({ scrollProgress = 0 }) {
  return (
    <div className="advanced-hero-3d">
      <Canvas
        dpr={[1, 1.25]}
        camera={{
          position: [0, 0, 8],
          fov: 38,
        }}
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: "high-performance",
        }}
        frameloop="always"
      >
        <Suspense fallback={null}>
          <Scene scrollProgress={scrollProgress} />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default memo(AdvancedHero3D);
