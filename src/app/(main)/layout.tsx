import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Hiu',
};

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-60 shrink-0 fixed top-0 left-0 h-screen border-r border-hiu-border bg-hiu-surface/80 backdrop-blur-xl z-40">
        {/* Logo */}
        <div className="px-6 py-5 border-b border-hiu-border">
          <span className="text-xl font-bold bg-gradient-to-r from-hiu-music to-hiu-photo bg-clip-text text-transparent">
            hiu
          </span>
        </div>

        {/* Nav links - placeholder, sẽ có NavLinks component sau */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {[
            { label: 'Trang chủ', href: '/feed' },
            { label: 'Khám phá', href: '/discover' },
            { label: 'Thư viện', href: '/library' },
            { label: 'Profile', href: '/profile' },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-hiu-secondary hover:text-hiu-primary hover:bg-white/5 transition-colors text-sm font-medium"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 md:ml-60 pb-24">
        {children}
      </main>

      {/* Player bar — bottom fixed, placeholder */}
      <div className="fixed bottom-0 left-0 right-0 h-20 glass border-t border-hiu-border z-50 flex items-center px-4 gap-4">
        <div className="flex items-center gap-3 w-64">
          <div className="w-12 h-12 rounded-lg bg-hiu-elevated shrink-0" />
          <div className="min-w-0">
            <p className="text-sm font-medium text-hiu-primary truncate">Chưa phát nhạc</p>
            <p className="text-xs text-hiu-muted truncate">—</p>
          </div>
        </div>
        <div className="flex-1 flex justify-center">
          <button className="w-9 h-9 rounded-full bg-hiu-music/20 border border-hiu-music/30 flex items-center justify-center hover:bg-hiu-music/30 transition-colors">
            <svg className="w-4 h-4 text-hiu-music ml-0.5" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
