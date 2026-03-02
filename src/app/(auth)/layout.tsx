import type { Metadata } from 'next';
import Link from 'next/link';
import AuthBackground from './AuthBackground';

export const metadata: Metadata = {
  title: 'Hiu – Auth',
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex min-h-screen items-center justify-center bg-hiu-bg px-4 py-12 overflow-hidden">
      <AuthBackground />

      {/* Corner markers — matching homepage */}
      <Link
        href="/"
        className="absolute top-6 left-8 text-[10px] font-mono tracking-[0.4em] uppercase text-white/20 hover:text-white/60 transition-colors duration-300 select-none z-20"
      >
        HIU
      </Link>
      <span className="absolute top-6 right-8 text-[10px] font-mono tracking-[0.3em] uppercase text-white/15 select-none z-20">
        2026
      </span>

      {/* Card */}
      <div className="relative z-10 w-full max-w-md">
        <div className="border border-white/[0.08] bg-hiu-surface/70 backdrop-blur-2xl p-10 relative overflow-hidden">
          {/* Inner glow top */}
          <div
            className="absolute inset-x-0 top-0 h-px"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(168,85,247,0.4), transparent)' }}
          />
          {children}
        </div>
      </div>
    </div>
  );
}
