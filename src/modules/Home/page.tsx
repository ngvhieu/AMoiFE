'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, ArrowRight, Play, Music2, ImageIcon } from 'lucide-react';
import Link from 'next/link';
import { Spotlight } from '@/components/ui/Spotlight';
import Particles from '@/components/ui/Particles';
import { ShinyText } from '@/components/ui/ShinyText';

// ─── Word animation (giống hieumoi.online) ───────────────────────────────────
const wordVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      delay: 0.1 + i * 0.12,
    },
  }),
};

const TICKER = [
  'Nghe nhạc', 'Chia sẻ ảnh', 'Kết nối bạn bè',
  'Upload track', 'Khám phá cộng đồng', 'Playlist cá nhân',
  'Nghe nhạc', 'Chia sẻ ảnh', 'Kết nối bạn bè',
  'Upload track', 'Khám phá cộng đồng', 'Playlist cá nhân',
];

// ─── Section label ────────────────────────────────────────────────────────────
const SectionLabel = ({ num, name }: { num: string; name: string }) => (
  <p className="text-[10px] font-mono tracking-[0.35em] uppercase text-white/30 mb-12">
    {'< '}{num} / {name}{' >'}
  </p>
);

// ─── Fade up helper ───────────────────────────────────────────────────────────
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1], delay },
});

// ─── Hero ─────────────────────────────────────────────────────────────────────
const Hero = () => {
  const [tickerPaused, setTickerPaused] = useState(false);

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-[#0a0a0f]">
      {/* Spotlight — ánh sáng cone từ góc trái như hieumoi.online */}
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="#a855f7"
      />

      {/* Particles — hạt nổi tương tác chuột */}
      <Particles
        className="absolute inset-0 z-0"
        quantity={60}
        color="#a855f7"
        size={0.5}
        staticity={60}
        ease={60}
      />

      {/* Grid background — lưới mờ như hieumoi.online */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#a855f7 1px, transparent 1px), linear-gradient(90deg, #a855f7 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Corner markers */}
      <div className="absolute top-24 left-6 md:left-12 text-[10px] tracking-[0.3em] uppercase text-white/20 font-mono z-10">
        &lt; 01 / HERO &gt;
      </div>
      <div className="absolute top-24 right-6 md:right-12 text-[10px] tracking-[0.3em] uppercase text-white/20 font-mono z-10">
        2026
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-8 pt-32 pb-28 w-full">

        {/* Label với ShinyText */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex items-center gap-3 mb-8"
        >
          <span className="block w-8 h-px bg-hiu-music" />
          <ShinyText
            text="Nghe nhạc · Chia sẻ ảnh · Kết nối"
            className="text-[11px] tracking-[0.35em] uppercase font-mono"
            speed={4}
          />
          <span className="w-2 h-2 rounded-full bg-hiu-music animate-pulse" />
        </motion.div>

        {/* Heading line 1 — solid */}
        <div className="overflow-hidden">
          <motion.h1
            custom={0}
            variants={wordVariants}
            initial="hidden"
            animate="visible"
            className="font-black leading-[0.88] tracking-tight text-white uppercase"
            style={{ fontSize: 'clamp(3.5rem, 12vw, 9rem)' }}
          >
            Nơi âm nhạc
          </motion.h1>
        </div>

        {/* Heading line 2 — stroke outline như hieumoi.online */}
        <div className="overflow-hidden">
          <motion.h1
            custom={1}
            variants={wordVariants}
            initial="hidden"
            animate="visible"
            className="font-black leading-[0.88] tracking-tight text-transparent uppercase"
            style={{
              fontSize: 'clamp(3.5rem, 12vw, 9rem)',
              WebkitTextStroke: '1.5px #a855f7',
            }}
          >
            &amp; khoảnh khắc
          </motion.h1>
        </div>

        {/* Heading line 3 — solid muted */}
        <div className="overflow-hidden">
          <motion.h1
            custom={2}
            variants={wordVariants}
            initial="hidden"
            animate="visible"
            className="font-black leading-[0.88] tracking-tight text-white/25 uppercase"
            style={{ fontSize: 'clamp(3.5rem, 12vw, 9rem)' }}
          >
            gặp nhau
          </motion.h1>
        </div>

        {/* Tagline row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mt-10"
        >
          <p className="max-w-sm text-sm leading-relaxed text-white/35">
            Nền tảng nghe nhạc và chia sẻ ảnh đa người dùng.<br />
            Upload, khám phá, kết nối với cộng đồng.
          </p>

          <div className="flex items-center gap-4">
            <Link
              href="/register"
              className="group inline-flex items-center gap-3 text-[11px] font-bold tracking-[0.15em] uppercase px-6 py-3 bg-white text-[#0a0a0f] hover:bg-hiu-music hover:text-white transition-all duration-300"
            >
              Bắt đầu
              <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/login"
              className="text-[11px] tracking-[0.15em] uppercase px-6 py-3 border border-white/15 text-white/40 hover:text-white hover:border-white/30 transition-all duration-300"
            >
              Đăng nhập
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Ticker — bottom border như hieumoi.online */}
      <div
        className="absolute bottom-0 inset-x-0 border-t border-white/10 overflow-hidden"
        onMouseEnter={() => setTickerPaused(true)}
        onMouseLeave={() => setTickerPaused(false)}
      >
        <div
          className="flex whitespace-nowrap py-3 animate-ticker"
          style={{ animationPlayState: tickerPaused ? 'paused' : 'running' }}
        >
          {TICKER.map((t, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-6 px-6 text-[10px] tracking-[0.3em] uppercase text-white/20 hover:text-white/50 font-mono transition-colors duration-300 cursor-default shrink-0"
            >
              {t}
              <span className="text-hiu-music">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-16 right-8 md:right-12 flex flex-col items-center gap-2 text-white/20 z-10"
      >
        <span className="text-[9px] tracking-[0.3em] uppercase font-mono">Scroll</span>
        <ArrowDown size={13} className="animate-bounce" />
      </motion.div>
    </section>
  );
};

// ─── Stats ────────────────────────────────────────────────────────────────────
const Stats = () => (
  <section className="max-w-7xl mx-auto px-8">
    <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y divide-white/10 border border-white/10">
      {[
        { value: '1.2K+', label: 'Bài hát', sym: '✦' },
        { value: '4.8K+', label: 'Ảnh',    sym: '▲' },
        { value: '320+',  label: 'Thành viên', sym: '◉' },
        { value: '18K+',  label: 'Lượt nghe',  sym: '◈' },
      ].map((s, i) => (
        <motion.div key={i} {...fadeUp(i * 0.08)} className="p-8">
          <span className="text-[11px] text-white/20 tracking-widest">{s.sym}</span>
          <p className="text-4xl font-black text-white mt-2 tracking-tight">{s.value}</p>
          <p className="text-[10px] tracking-[0.2em] uppercase text-white/30 mt-1">{s.label}</p>
        </motion.div>
      ))}
    </div>
  </section>
);

// ─── Features ─────────────────────────────────────────────────────────────────
const Features = () => (
  <section id="features" className="max-w-7xl mx-auto px-8 py-24">
    <SectionLabel num="02" name="TÍNH NĂNG" />
    <div className="grid md:grid-cols-2 divide-x divide-y divide-white/10 border border-white/10">
      {[
        { sym: '✦', color: 'text-violet-400', title: 'Nghe nhạc',   desc: 'Upload và phát nhạc. Playlist cá nhân, chia sẻ với bạn bè. Player tích hợp — không rời trang.', icon: Music2 },
        { sym: '▲', color: 'text-rose-400',   title: 'Chia sẻ ảnh', desc: 'Gallery cá nhân, album theo chủ đề. Ảnh tối ưu tự động, đẹp trên mọi thiết bị.',             icon: ImageIcon },
        { sym: '◉', color: 'text-blue-400',   title: 'Kết nối',     desc: 'Follow nghệ sĩ, nhiếp ảnh gia. Like, comment, chia sẻ. Feed cá nhân theo sở thích.',           icon: ArrowRight },
        { sym: '◈', color: 'text-emerald-400',title: 'Khám phá',    desc: 'Trending hôm nay, ảnh nổi bật, người mới. Gợi ý dựa trên lịch sử nghe của bạn.',              icon: Play },
      ].map((f, i) => (
        <motion.div key={i} {...fadeUp(i * 0.08)}
          className="group p-10 hover:bg-white/[0.02] transition-colors duration-500 cursor-default">
          <div className="flex items-start justify-between mb-10">
            <span className={`text-xl ${f.color}`}>{f.sym}</span>
            <f.icon size={14} className="text-white/10 group-hover:text-white/20 transition-colors" />
          </div>
          <h3 className="text-2xl font-black uppercase tracking-tight text-white mb-3">{f.title}</h3>
          <p className="text-sm leading-relaxed text-white/35">{f.desc}</p>
        </motion.div>
      ))}
    </div>
  </section>
);

// ─── Track preview ────────────────────────────────────────────────────────────
const TrackPreview = () => (
  <section className="max-w-7xl mx-auto px-8 py-24">
    <SectionLabel num="03" name="ÂM NHẠC" />
    <div className="flex items-end justify-between mb-10">
      <h2 className="text-[clamp(2rem,5vw,4.5rem)] font-black uppercase leading-none tracking-tight text-white">
        Trending<br /><span className="text-white/25">hôm nay</span>
      </h2>
      <a href="#" className="text-[10px] tracking-[0.2em] uppercase text-white/30 hover:text-white transition-colors pb-px border-b border-white/10 self-end">
        Xem tất cả →
      </a>
    </div>
    <div className="border border-white/10 divide-y divide-white/10">
      {Array.from({ length: 5 }).map((_, i) => (
        <motion.div key={i} {...fadeUp(i * 0.06)}
          className="group flex items-center gap-5 px-5 py-4 hover:bg-white/[0.03] transition-colors cursor-pointer">
          <span className="text-[10px] font-mono text-white/20 w-5 text-right shrink-0">{String(i + 1).padStart(2, '0')}</span>
          <div className="w-9 h-9 bg-white/5 shrink-0 flex items-center justify-center group-hover:bg-violet-500/20 transition-colors">
            <Play size={11} className="text-white/20 group-hover:text-violet-400 ml-px transition-colors" fill="currentColor" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-white truncate">Track {i + 1}</p>
            <p className="text-xs text-white/30 truncate mt-0.5">Nghệ sĩ</p>
          </div>
          <div className="hidden md:flex items-center gap-8 shrink-0">
            <span className="text-[10px] font-mono text-white/20">{(1000 + i * 347).toLocaleString()} lượt</span>
            <span className="text-[10px] font-mono text-white/20">{3 + i}:{String(i * 13 + 12).padStart(2, '0')}</span>
          </div>
        </motion.div>
      ))}
    </div>
  </section>
);

// ─── Photo preview ────────────────────────────────────────────────────────────
const PhotoPreview = () => {
  const items = [{ h: 'h-72' }, { h: 'h-44' }, { h: 'h-56' }, { h: 'h-44' }, { h: 'h-60' }, { h: 'h-72' }];
  return (
    <section className="max-w-7xl mx-auto px-8 py-24">
      <SectionLabel num="04" name="KHOẢNH KHẮC" />
      <div className="flex items-end justify-between mb-10">
        <h2 className="text-[clamp(2rem,5vw,4.5rem)] font-black uppercase leading-none tracking-tight text-white">
          Ảnh nổi bật<br /><span className="text-white/25">cộng đồng</span>
        </h2>
        <a href="#" className="text-[10px] tracking-[0.2em] uppercase text-white/30 hover:text-white transition-colors pb-px border-b border-white/10 self-end">
          Xem tất cả →
        </a>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-[1px] bg-white/10">
        {items.map(({ h }, i) => (
          <motion.div key={i} {...fadeUp(i * 0.06)}
            className={`group relative ${h} bg-[#0f0f16] overflow-hidden cursor-pointer`}>
            <div className="absolute inset-0 flex items-center justify-center">
              <ImageIcon size={20} className="text-white/5" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-5">
              <div>
                <p className="text-xs font-semibold text-white">@username</p>
                <p className="text-[10px] text-white/50 mt-0.5">Caption ảnh</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

// ─── CTA ──────────────────────────────────────────────────────────────────────
const CTA = () => (
  <section className="max-w-7xl mx-auto px-8 py-24">
    <SectionLabel num="05" name="THAM GIA" />
    <motion.div {...fadeUp(0)} className="border border-white/10 p-16 md:p-24 text-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-violet-600/5 via-transparent to-rose-600/5 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-violet-500/5 blur-[80px] pointer-events-none" />
      <div className="relative z-10">
        <p className="text-[10px] tracking-[0.4em] uppercase text-white/25 mb-8">✦ Miễn phí hoàn toàn ✦</p>
        <h2 className="text-[clamp(3rem,8vw,7rem)] font-black uppercase leading-[0.88] tracking-tight text-white mb-12">
          Bắt đầu<br />ngay hôm nay
        </h2>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/register"
            className="px-10 py-4 text-[11px] font-bold tracking-[0.2em] uppercase bg-white text-[#0a0a0f] hover:bg-violet-400 hover:text-white transition-all duration-300">
            Tạo tài khoản →
          </Link>
          <Link href="/login"
            className="px-10 py-4 text-[11px] font-bold tracking-[0.2em] uppercase border border-white/15 text-white/40 hover:text-white hover:border-white/40 transition-all duration-300">
            Đăng nhập
          </Link>
        </div>
      </div>
    </motion.div>
  </section>
);

// ─── Nav ──────────────────────────────────────────────────────────────────────
const Nav = () => {
  const [scrolled, setScrolled] = useState(false);
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled ? 'bg-[#0a0a0f]/90 backdrop-blur-2xl border-b border-white/10' : ''
    }`}>
      <div className="max-w-7xl mx-auto px-8 h-16 flex items-center justify-between">
        <span className="text-sm font-black tracking-[0.2em] uppercase text-white">HIU</span>
        <nav className="hidden md:flex items-center gap-8">
          {['Khám phá', 'Âm nhạc', 'Ảnh', 'Cộng đồng'].map((item) => (
            <a key={item} href="#"
              className="text-[11px] tracking-[0.15em] uppercase text-white/40 hover:text-white transition-colors duration-300">
              {item}
            </a>
          ))}
        </nav>
        <Link href="/register"
          className="text-[11px] font-bold tracking-[0.15em] uppercase px-5 py-2.5 border border-white/20 text-white hover:bg-white hover:text-[#0a0a0f] transition-all duration-300">
          Tham gia →
        </Link>
      </div>
    </header>
  );
};

// ─── Footer ───────────────────────────────────────────────────────────────────
const Footer = () => (
  <footer className="border-t border-white/10 max-w-7xl mx-auto px-8 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
    <span className="text-[11px] font-black tracking-[0.3em] uppercase text-white/40">HIU</span>
    <p className="text-[10px] tracking-widest uppercase text-white/20">© 2026 Hiu Platform · Nghe nhạc ✦ Chia sẻ ảnh</p>
    <div className="flex gap-6">
      {['Điều khoản', 'Bảo mật'].map((item) => (
        <a key={item} href="#" className="text-[10px] tracking-widest uppercase text-white/20 hover:text-white/50 transition-colors">{item}</a>
      ))}
    </div>
  </footer>
);

// ─── Page ─────────────────────────────────────────────────────────────────────
const LandingPage = () => (
  <div className="bg-[#0a0a0f] min-h-screen">
    <Nav />
    <Hero />
    <Stats />
    <Features />
    <TrackPreview />
    <PhotoPreview />
    <CTA />
    <Footer />
  </div>
);

export default LandingPage;
