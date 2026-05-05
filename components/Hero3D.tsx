"use client";

import { useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { Float, Html, OrbitControls } from "@react-three/drei";
import { Quaternion, Vector3 } from "three";

const projectNodes = [
  {
    id: "ai-portal",
    label: "AI Student Portal",
    color: "#7c3aed",
    position: [-1.8, 1.3, 0],
  },
  {
    id: "deepfake",
    label: "Deepfake Detection",
    color: "#0ea5e9",
    position: [1.7, 1.1, 0],
  },
  {
    id: "gesture",
    label: "Gesture Recognition",
    color: "#8b5cf6",
    position: [0, -1.3, 0],
  },
];

interface Hero3DProps {
  onSelectProject: (id: string) => void;
}

function NodeMarker({ node, onSelect }: { node: (typeof projectNodes)[number]; onSelect: (id: string) => void }) {
  return (
    <mesh position={node.position as [number, number, number]} onClick={() => onSelect(node.id)}>
      <sphereGeometry args={[0.14, 24, 24]} />
      <meshStandardMaterial color={node.color} emissive={node.color} emissiveIntensity={0.5} metalness={0.4} roughness={0.2} />
      <Html center distanceFactor={1.8} className="pointer-events-none">
        <div className="text-[11px] font-semibold uppercase tracking-[0.25em] text-slate-100 drop-shadow-[0_0_12px_rgba(0,0,0,0.55)]">
          {node.label}
        </div>
      </Html>
    </mesh>
  );
}

function ConnectionRod({ start, end }: { start: [number, number, number]; end: [number, number, number] }) {
  const startVec = new Vector3(...start);
  const endVec = new Vector3(...end);
  const direction = endVec.clone().sub(startVec);
  const length = direction.length();
  const midpoint = startVec.add(endVec).multiplyScalar(0.5).toArray() as [number, number, number];
  const quaternion = new Quaternion();
  quaternion.setFromUnitVectors(new Vector3(0, 1, 0), direction.clone().normalize());

  return (
    <mesh position={midpoint} quaternion={quaternion}>
      <cylinderGeometry args={[0.02, 0.02, length, 8]} />
      <meshStandardMaterial color="#60a5fa" opacity={0.7} transparent />
    </mesh>
  );
}

export default function Hero3D({ onSelectProject }: Hero3DProps) {
  const rods = useMemo(
    () => [
      [projectNodes[0].position, projectNodes[1].position],
      [projectNodes[1].position, projectNodes[2].position],
      [projectNodes[2].position, projectNodes[0].position],
    ] as [ [number, number, number], [number, number, number] ][],
    []
  );

  return (
    <div className="relative h-[560px] w-full overflow-hidden rounded-[32px] border border-white/10 bg-slate-950/60 shadow-2xl shadow-cyan-500/10 ring-1 ring-slate-100/5 backdrop-blur-xl md:h-[620px]">
      <Canvas camera={{ position: [0, 0, 8], fov: 35 }}>
        <ambientLight intensity={0.55} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} castShadow />
        <Float speed={1.2} rotationIntensity={0.4} floatIntensity={0.8}>
          <mesh position={[0, 0.1, 0]}>
            <sphereGeometry args={[1.05, 32, 32]} />
            <meshStandardMaterial color="#5b8fff" emissive="#5b72ff" emissiveIntensity={0.6} roughness={0.15} metalness={0.6} transparent opacity={0.96} />
          </mesh>
          <mesh position={[0, 0.1, 0]}> 
            <icosahedronGeometry args={[0.74, 2]} />
            <meshStandardMaterial color="#c7d2fe" emissive="#c7d2fe" emissiveIntensity={0.25} roughness={0.25} metalness={0.45} transparent opacity={0.42} />
          </mesh>
        </Float>

        {rods.map(([start, end], index) => (
          <ConnectionRod key={index} start={start} end={end} />
        ))}

        {projectNodes.map((node) => (
          <NodeMarker key={node.id} node={node} onSelect={onSelectProject} />
        ))}

        <Float speed={0.7} rotationIntensity={0.55} floatIntensity={0.3}>
          <mesh position={[0, -2.3, 0]} rotation={[0.2, 0.25, 0]}> 
            <torusGeometry args={[2.3, 0.03, 16, 120]} />
            <meshStandardMaterial color="#818cf8" emissive="#818cf8" emissiveIntensity={0.25} roughness={0.2} metalness={0.9} transparent opacity={0.65} />
          </mesh>
        </Float>

        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.9} maxPolarAngle={Math.PI / 2} minPolarAngle={Math.PI / 3} />
      </Canvas>
      <div className="pointer-events-none absolute inset-x-0 bottom-6 flex justify-center text-xs uppercase tracking-[0.24em] text-slate-300/70">
        Tap a node to open live project details
      </div>
    </div>
  );
}
