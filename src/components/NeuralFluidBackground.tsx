import { useRef, useMemo, memo, Suspense, lazy } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, Float, Stars, PerspectiveCamera, Points, PointMaterial, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";
import { useTheme } from "./ThemeProvider";

/* ==============================
   LIGHT THEME SCENE (Ghibli)
   ============================== */

const SunLight = memo(function SunLight() {
  return (
    <group position={[10, 10, -5]}>
      <pointLight intensity={3} color="#fffcf0" />
    </group>
  );
});

const Fireflies = memo(function Fireflies() {
  const count = 80; // reduced from 100
  const positions = useMemo(() => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      p[i * 3] = (Math.random() - 0.5) * 30;
      p[i * 3 + 1] = (Math.random() - 0.5) * 20;
      p[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return p;
  }, []);

  const ref = useRef<THREE.Points>(null);
  useFrame((state) => {
    if (ref.current) {
      const t = state.clock.getElapsedTime();
      ref.current.rotation.y = t * 0.05;
      ref.current.position.y = Math.sin(t * 0.4) * 0.3;
    }
  });

  return (
    <Points positions={positions} ref={ref}>
      <PointMaterial
        transparent
        color="#fbbf24"
        size={0.12}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        opacity={0.4}
      />
    </Points>
  );
});

const FloatingPetals = memo(function FloatingPetals() {
  const petalCount = 18; // reduced from 30
  const petals = useMemo(() =>
    Array.from({ length: petalCount }, () => ({
      position: [
        (Math.random() - 0.5) * 40,
        Math.random() * 20,
        (Math.random() - 0.5) * 20
      ] as [number, number, number],
      rotation: [Math.asin(Math.random()), Math.asin(Math.random()), Math.asin(Math.random())] as [number, number, number],
      speed: 0.01 + Math.random() * 0.03
    })), []);

  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    const children = ref.current.children;
    for (let i = 0; i < children.length; i++) {
      const child = children[i];
      child.position.y -= petals[i].speed;
      child.position.x += Math.sin(t + i) * 0.005;
      child.rotation.x += 0.005;
      child.rotation.z += 0.005;
      if (child.position.y < -15) child.position.y = 15;
    }
  });

  // Share a single geometry and material
  const geo = useMemo(() => new THREE.PlaneGeometry(0.15, 0.15), []);
  const mat = useMemo(() => new THREE.MeshBasicMaterial({ color: "#d1fae5", transparent: true, opacity: 0.5, side: THREE.DoubleSide }), []);

  return (
    <group ref={ref}>
      {petals.map((p, i) => (
        <mesh key={i} position={p.position} rotation={p.rotation} geometry={geo} material={mat} />
      ))}
    </group>
  );
});

function DreamySky() {
  return (
    <>
      <fog attach="fog" args={["#e0f2fe", 20, 80]} />
      <ambientLight intensity={1.2} />
      <directionalLight position={[0, 10, 5]} intensity={0.6} color="#fff1f2" />
    </>
  );
}

const LightScene = memo(function LightScene() {
  return (
    <>
      <DreamySky />
      <SunLight />
      <Fireflies />
      <FloatingPetals />
    </>
  );
});

/* ==============================
   DARK THEME SCENE (Cyberpunk)
   ============================== */

const CyberGrid = memo(function CyberGrid() {
  return (
    <group rotation={[Math.PI / 2.5, 0, 0]} position={[0, -2, 0]}>
      <gridHelper args={[80, 40, "#3b82f6", "#1e293b"]} />
    </group>
  );
});

const FloatingStructure = memo(function FloatingStructure() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.x = t * 0.1;
    meshRef.current.rotation.y = t * 0.15;
  });

  return (
    <Float speed={2} rotationIntensity={2} floatIntensity={5}>
      <mesh ref={meshRef} position={[0, 0.5, 0]}>
        <icosahedronGeometry args={[2, 8]} />
        <MeshDistortMaterial
          color="#1d4ed8"
          speed={2}
          distort={0.4}
          radius={1}
          emissive="#3b82f6"
          emissiveIntensity={0.2}
          wireframe
          opacity={0.3}
          transparent
        />
      </mesh>
    </Float>
  );
});

const FloatingCubes = memo(function FloatingCubes() {
  const cubeCount = 25; // reduced from 40
  const cubes = useMemo(() =>
    Array.from({ length: cubeCount }, () => ({
      position: [
        (Math.random() - 0.5) * 25,
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 20
      ] as [number, number, number],
      size: Math.random() * 0.5 + 0.1,
      speed: Math.random() * 0.5 + 0.2
    })), []);

  const ref = useRef<THREE.Group>(null);

  // Share geometry and material across all cubes
  const mat = useMemo(() => new THREE.MeshStandardMaterial({ color: "#3b82f6", opacity: 0.15, transparent: true }), []);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    const children = ref.current.children;
    for (let i = 0; i < children.length; i++) {
      children[i].rotation.x += 0.01;
      children[i].rotation.y += 0.01;
      children[i].position.y += Math.sin(t * cubes[i].speed) * 0.01;
    }
  });

  return (
    <group ref={ref}>
      {cubes.map((cube, i) => (
        <mesh key={i} position={cube.position} material={mat}>
          <boxGeometry args={[cube.size, cube.size, cube.size]} />
        </mesh>
      ))}
    </group>
  );
});

const DarkScene = memo(function DarkScene() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1.5} color="#3b82f6" />
      <pointLight position={[-10, -10, -10]} intensity={1} color="#6366f1" />
      <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
      <CyberGrid />
      <FloatingStructure />
      <FloatingCubes />
      <fog attach="fog" args={["#020617", 5, 25]} />
    </>
  );
});

/* ==============================
   MAIN COMPONENT
   ============================== */

export default function NeuralFluidBackground() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className={`fixed inset-0 z-[-1] overflow-hidden transition-colors duration-700 ${
      isDark ? "bg-[#020617]" : "bg-gradient-to-b from-[#e0f2fe] via-[#f0f9ff] to-white"
    }`}>
      {/* Light theme landscape elements */}
      {!isDark && (
        <>
          <div className="absolute inset-0 sun-ray opacity-40" />
          
          <div className="absolute bottom-0 left-0 w-full h-[60vh] opacity-20 pointer-events-none">
            <svg viewBox="0 0 1440 320" className="absolute bottom-0 w-full h-full fill-blue-200/50">
              <path d="M0,256L80,224C160,192,320,128,480,122.7C640,117,800,171,960,186.7C1120,203,1280,181,1360,170.7L1440,160L1440,320L0,320Z"></path>
            </svg>
          </div>

          <div className="absolute bottom-0 left-0 w-full h-[30vh] pointer-events-none opacity-40">
            <svg viewBox="0 0 1440 320" className="absolute bottom-0 w-full h-full fill-emerald-100/60">
              <path d="M0,192L48,208C96,224,192,256,288,234.7C384,213,480,139,576,144C672,149,768,235,864,240C960,245,1056,171,1152,144C1248,117,1344,139,1392,149.3L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
            </svg>
          </div>
        </>
      )}

      <Canvas dpr={[1, 1.5]} performance={{ min: 0.5 }} gl={{ antialias: false, powerPreference: "high-performance" }}>
        <PerspectiveCamera makeDefault position={isDark ? [0, 0, 10] : [0, 0, 15]} fov={75} />
        {isDark ? <DarkScene /> : <LightScene />}
      </Canvas>

      {/* Overlays */}
      {isDark ? (
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#020617]/40 to-[#020617] pointer-events-none" />
      ) : (
        <>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-white/15 pointer-events-none" />
          <div className="absolute inset-0 komorebi-overlay opacity-15" />
        </>
      )}
    </div>
  );
}
