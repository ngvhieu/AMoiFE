'use client';

import { Spotlight } from '@/components/ui/Spotlight';
import Particles from '@/components/ui/Particles';

export default function AuthBackground() {
  return (
    <>
      <Spotlight className="-top-60 left-1/4 md:-top-40" fill="#a855f7" />
      <Spotlight className="-top-60 right-1/4 md:-top-40" fill="#f43f5e" />

      <Particles
        className="absolute inset-0 z-0"
        quantity={40}
        color="#a855f7"
        size={0.4}
        staticity={60}
        ease={60}
      />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#a855f7 1px, transparent 1px), linear-gradient(90deg, #a855f7 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Center ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-hiu-music/[0.04] blur-[140px] pointer-events-none" />
    </>
  );
}
