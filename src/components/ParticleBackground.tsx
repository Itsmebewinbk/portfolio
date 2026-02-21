import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Cinematic floating geometric structures
function FloatingStructures() {
  const groupRef = useRef<THREE.Group>(null);
  const ringRefs = useRef<THREE.Mesh[]>([]);
  const timeRef = useRef(0);

  const ringData = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => ({
      radius: 2 + Math.random() * 5,
      tubeRadius: 0.01 + Math.random() * 0.02,
      z: -5 + i * -4,
      rotSpeed: (Math.random() - 0.5) * 0.3,
      wobble: Math.random() * 0.5,
      phase: Math.random() * Math.PI * 2,
    }));
  }, []);

  // Floating geometric shards
  const shardData = useMemo(() => {
    return Array.from({ length: 30 }, (_, i) => ({
      position: [
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 12,
        -3 + Math.random() * -40,
      ] as [number, number, number],
      rotation: [Math.random() * Math.PI, Math.random() * Math.PI, 0] as [number, number, number],
      scale: 0.1 + Math.random() * 0.4,
      speed: 0.1 + Math.random() * 0.5,
      phase: Math.random() * Math.PI * 2,
    }));
  }, []);

  useFrame((state, delta) => {
    timeRef.current += delta;
    const t = timeRef.current;

    if (groupRef.current) {
      // Subtle camera-like sway
      groupRef.current.rotation.y = Math.sin(t * 0.08) * 0.05;
      groupRef.current.rotation.x = Math.cos(t * 0.06) * 0.03;
    }

    ringRefs.current.forEach((mesh, i) => {
      if (!mesh) return;
      const data = ringData[i];
      mesh.rotation.x += data.rotSpeed * delta;
      mesh.rotation.y += data.rotSpeed * 0.5 * delta;
      mesh.position.y = Math.sin(t * data.wobble + data.phase) * 0.5;
      // Pulse scale
      const pulse = 1 + Math.sin(t * 0.5 + data.phase) * 0.05;
      mesh.scale.setScalar(pulse);
    });
  });

  return (
    <group ref={groupRef}>
      {/* Cinematic rings - like portals/tunnels */}
      {ringData.map((ring, i) => (
        <mesh
          key={`ring-${i}`}
          ref={(el) => { if (el) ringRefs.current[i] = el; }}
          position={[0, 0, ring.z]}
        >
          <torusGeometry args={[ring.radius, ring.tubeRadius, 16, 100]} />
          <meshStandardMaterial
            color={i % 2 === 0 ? "#3b82f6" : "#8b5cf6"}
            emissive={i % 2 === 0 ? "#3b82f6" : "#8b5cf6"}
            emissiveIntensity={1.5}
            transparent
            opacity={0.4 + (i / ringData.length) * 0.4}
          />
        </mesh>
      ))}

      {/* Floating shards */}
      {shardData.map((shard, i) => (
        <FloatingShard key={`shard-${i}`} data={shard} index={i} />
      ))}

      {/* Light beams / volumetric rays */}
      <LightBeams />
    </group>
  );
}

function FloatingShard({ data, index }: { data: any; index: number }) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.rotation.x += 0.002 * data.speed;
    ref.current.rotation.y += 0.003 * data.speed;
    ref.current.position.y = data.position[1] + Math.sin(t * data.speed + data.phase) * 0.8;
    ref.current.position.x = data.position[0] + Math.cos(t * data.speed * 0.5 + data.phase) * 0.3;

    // Subtle glow pulse
    const mat = ref.current.material as THREE.MeshStandardMaterial;
    mat.emissiveIntensity = 0.8 + Math.sin(t * 2 + data.phase) * 0.5;
  });

  const geo = useMemo(() => {
    const geos = [
      <octahedronGeometry args={[data.scale, 0]} />,
      <tetrahedronGeometry args={[data.scale, 0]} />,
      <icosahedronGeometry args={[data.scale, 0]} />,
    ];
    return geos[index % 3];
  }, [data.scale, index]);

  const color = index % 3 === 0 ? "#60a5fa" : index % 3 === 1 ? "#a78bfa" : "#818cf8";

  return (
    <mesh ref={ref} position={data.position} rotation={data.rotation}>
      {geo}
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={1}
        transparent
        opacity={0.5}
        wireframe={index % 4 === 0}
      />
    </mesh>
  );
}

function LightBeams() {
  const beamRef = useRef<THREE.Group>(null);

  const beams = useMemo(() => {
    return Array.from({ length: 6 }, (_, i) => ({
      position: [
        (Math.random() - 0.5) * 14,
        (Math.random() - 0.5) * 8,
        -10 - Math.random() * 20,
      ] as [number, number, number],
      rotation: [0, 0, (Math.random() - 0.5) * 0.8] as [number, number, number],
      height: 15 + Math.random() * 15,
      width: 0.03 + Math.random() * 0.06,
      color: i % 2 === 0 ? "#3b82f6" : "#7c3aed",
      phase: Math.random() * Math.PI * 2,
    }));
  }, []);

  useFrame((state) => {
    if (!beamRef.current) return;
    const t = state.clock.elapsedTime;
    beamRef.current.children.forEach((child, i) => {
      const mat = (child as THREE.Mesh).material as THREE.MeshBasicMaterial;
      mat.opacity = 0.06 + Math.sin(t * 0.4 + beams[i].phase) * 0.04;
    });
  });

  return (
    <group ref={beamRef}>
      {beams.map((beam, i) => (
        <mesh key={i} position={beam.position} rotation={beam.rotation}>
          <planeGeometry args={[beam.width, beam.height]} />
          <meshBasicMaterial
            color={beam.color}
            transparent
            opacity={0.08}
            side={THREE.DoubleSide}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  );
}

// Fog / depth particles for cinematic atmosphere
function AtmosphericDust() {
  const ref = useRef<THREE.Points>(null);
  const count = 300;

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 30;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 20;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 40;
    }
    return arr;
  }, []);

  const sizes = useMemo(() => {
    const arr = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      arr[i] = Math.random() * 2 + 0.5;
    }
    return arr;
  }, []);

  const dustTexture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext("2d")!;
    const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    gradient.addColorStop(0, "rgba(180, 200, 255, 0.8)");
    gradient.addColorStop(0.5, "rgba(120, 140, 255, 0.2)");
    gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 64, 64);
    return new THREE.CanvasTexture(canvas);
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    const pos = ref.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
      pos[i * 3 + 1] += Math.sin(t * 0.1 + i * 0.01) * 0.003;
      pos[i * 3] += Math.cos(t * 0.05 + i * 0.02) * 0.002;
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
    ref.current.rotation.y = t * 0.005;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-size" count={count} array={sizes} itemSize={1} />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        map={dustTexture}
        transparent
        opacity={0.4}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        color="#8ba4ff"
      />
    </points>
  );
}

// Cinematic slow-moving camera
function CinematicCamera() {
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    state.camera.position.x = Math.sin(t * 0.05) * 1.5;
    state.camera.position.y = Math.cos(t * 0.03) * 0.8;
    state.camera.lookAt(0, 0, -10);
  });
  return null;
}

export default function ParticleBackground() {
  return (
    <div className="fixed inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 60 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <fog attach="fog" args={["#050a18", 5, 40]} />
        <ambientLight intensity={0.15} />
        <pointLight position={[5, 5, 5]} intensity={0.5} color="#3b82f6" />
        <pointLight position={[-5, -3, -10]} intensity={0.3} color="#7c3aed" />

        <CinematicCamera />
        <FloatingStructures />
        <AtmosphericDust />
      </Canvas>
    </div>
  );
}
