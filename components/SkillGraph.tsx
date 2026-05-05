"use client";

import { useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { Float, OrbitControls } from "@react-three/drei";
import { skillClusters } from "@/lib/skills";

export default function SkillGraph() {
  const points = useMemo(
    () => skillClusters.map((skill, index) => ({
      ...skill,
      position: [Math.cos((index / skillClusters.length) * Math.PI * 2) * 1.7, Math.sin((index / skillClusters.length) * Math.PI * 2) * 1.2, Math.sin(index) * 0.5] as [number, number, number],
    })),
    []
  );

  return (
    <div className="overflow-hidden rounded-[32px] border border-white/10 bg-slate-950/70 p-5 shadow-2xl shadow-violet-500/10 ring-1 ring-white/5">
      <div className="flex items-center justify-between gap-3 pb-4 text-sm uppercase tracking-[0.24em] text-slate-400">
        <span>AI + Full Stack balance</span>
        <span className="rounded-full bg-slate-900/70 px-3 py-1 text-slate-200">Realtime motion</span>
      </div>
      <div className="h-[320px] w-full rounded-3xl bg-slate-950/50">
        <Canvas camera={{ position: [0, 0, 6], fov: 40 }}>
          <ambientLight intensity={0.65} />
          <directionalLight position={[5, 5, 5]} intensity={1.1} />
          <Float speed={1.5} rotationIntensity={0.85} floatIntensity={0.45}>
            <mesh>
              <icosahedronGeometry args={[1.1, 3]} />
              <meshStandardMaterial color="#a855f7" emissive="#8b5cf6" emissiveIntensity={0.2} roughness={0.18} metalness={0.6} transparent opacity={0.88} />
            </mesh>
          </Float>

          {points.map((skill) => (
            <Float key={skill.name} speed={0.8} rotationIntensity={0.55} floatIntensity={0.6}>
              <mesh position={skill.position}>
                <sphereGeometry args={[0.14, 20, 20]} />
                <meshPhongMaterial color={skill.color} emissive={skill.color} emissiveIntensity={0.25} />
              </mesh>
            </Float>
          ))}
          <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.4} minPolarAngle={0} maxPolarAngle={Math.PI / 1.7} />
        </Canvas>
      </div>
      <div className="mt-5 space-y-3 text-sm text-slate-300">
        {skillClusters.slice(0, 4).map((skill) => (
          <div key={skill.name} className="flex items-center justify-between rounded-3xl bg-slate-900/70 px-4 py-3 ring-1 ring-white/5">
            <span>{skill.name}</span>
            <span className="text-cyan-300">{skill.level}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
