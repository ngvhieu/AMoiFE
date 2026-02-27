import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Hiu – Auth',
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex min-h-screen items-center justify-center bg-hiu-bg px-4 overflow-hidden">
      {/* Subtle glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-hiu-music/5 blur-[120px] pointer-events-none" />
      {/* Corner label */}
      <span className="absolute top-6 left-8 text-[10px] font-mono tracking-[0.3em] uppercase text-white/15 select-none">HIU</span>
      <span className="absolute top-6 right-8 text-[10px] font-mono tracking-[0.3em] uppercase text-white/15 select-none">2026</span>
      <div className="relative z-10 w-full max-w-md border border-white/10 bg-hiu-surface/60 p-10 backdrop-blur-xl">
        {children}
      </div>
    </div>
  );
}
