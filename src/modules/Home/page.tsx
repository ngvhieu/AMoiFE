'use client';

import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, ArrowRight, Play, Music2, ImageIcon, Users, Headphones } from 'lucide-react';
import Link from 'next/link';
import { Spotlight } from '@/components/ui/Spotlight';
import Particles from '@/components/ui/Particles';
import BlurText from '@/components/ui/BlurText';
import DecryptedText from '@/components/ui/DecryptedText';
import CountUp from '@/components/ui/CountUp';

// ─── Ticker data ──────────────────────────────────────────────────────────────
const TICKER = [
  'Nghe nhạc', 'Chia sẻ ảnh', 'Kết nối bạn bè',
  'Upload track', 'Khám phá cộng đồng', 'Playlist cá nhân',
  'Nghe nhạc', 'Chia sẻ ảnh', 'Kết nối bạn bè',
  'Upload track', 'Khám phá cộng đồng', 'Playlist cá nhân',
];

// ─── Fade up helper ───────────────────────────────────────────────────────────
const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.7, ease: EASE_OUT, delay },
});

// ─── Section label ────────────────────────────────────────────────────────────
const SectionLabel = ({ num, name }: { num: string; name: string }) => (
  <div className="flex items-center gap-3 mb-12">
    <span className="block w-6 h-px bg-hiu-music/50" />
    <p className="text-[10px] font-mono tracking-[0.35em] uppercase text-white/25">
      {'< '}{num} / {name}{' >'}
    </p>
  </div>
);

// ─── Nav ──────────────────────────────────────────────────────────────────────
const Nav = () => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled ? 'bg-hiu-bg/90 backdrop-blur-2xl border-b border-white/[0.06]' : ''
    }`}>
      <div className="max-w-7xl mx-auto px-8 h-16 flex items-center justify-between">
        <span className="text-[11px] font-black font-mono tracking-[0.4em] uppercase text-white">
          <DecryptedText
            text="HIU"
            animateOn="view"
            sequential
            revealDirection="start"
            speed={60}
            characters="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
            className="text-white"
            encryptedClassName="text-hiu-music/60"
          />
        </span>
        <nav className="hidden md:flex items-center gap-8">
          {['Khám phá', 'Âm nhạc', 'Ảnh', 'Cộng đồng'].map((item) => (
            <a key={item} href="#"
              className="text-[10px] font-mono tracking-[0.3em] uppercase text-white/25 hover:text-white transition-colors duration-300">
              {item}
            </a>
          ))}
        </nav>
        <Link href="/register"
          className="text-[11px] font-bold tracking-[0.15em] uppercase px-5 py-2.5 border border-white/15 text-white/40 hover:text-white hover:border-white/30 transition-all duration-300">
          Tham gia →
        </Link>
      </div>
    </header>
  );
};

// ─── Hero ─────────────────────────────────────────────────────────────────────
const Hero = () => {
  const [tickerPaused, setTickerPaused] = useState(false);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, 80]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-hiu-bg">
      {/* Spotlight */}
      <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="#a855f7" />
      <Spotlight className="-top-40 right-0 md:right-40 md:-top-20" fill="#f43f5e" />

      {/* Particles */}
      <Particles
        className="absolute inset-0 z-0"
        quantity={80}
        color="#a855f7"
        size={0.5}
        staticity={50}
        ease={50}
      />

      {/* Grid bg */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#a855f7 1px, transparent 1px), linear-gradient(90deg, #a855f7 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Corner markers */}
      <div className="absolute top-24 left-6 md:left-12 text-[10px] tracking-[0.3em] uppercase text-white/15 font-mono z-10">
        &lt; 01 / HERO &gt;
      </div>
      <div className="absolute top-24 right-6 md:right-12 text-[10px] tracking-[0.3em] uppercase text-white/15 font-mono z-10">
        2026
      </div>

      {/* Main content */}
      <motion.div style={{ y, opacity }} className="relative z-10 max-w-7xl mx-auto px-8 pt-28 pb-24 w-full">
        <div className="flex flex-col lg:flex-row lg:items-center gap-16 lg:gap-12">

          {/* ── LEFT: Text col (55%) ── */}
          <div className="lg:w-[55%] shrink-0">

            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="flex items-center gap-3 mb-8"
            >
              <span className="block w-6 h-px bg-hiu-music/50" />
              <span className="text-[10px] tracking-[0.35em] uppercase font-mono text-white/40">
                <DecryptedText
                  text="Nghe nhạc · Chia sẻ ảnh · Kết nối"
                  animateOn="view"
                  sequential
                  revealDirection="start"
                  speed={30}
                  useOriginalCharsOnly
                  className="text-white/40"
                  encryptedClassName="text-hiu-music/40"
                />
              </span>
              <span className="w-1 h-1 rounded-full bg-hiu-music animate-pulse" />
            </motion.div>

            {/* Heading — 2 lines, vừa phải */}
            <div style={{ fontSize: 'clamp(2.4rem, 6vw, 5.5rem)', lineHeight: 1.05, letterSpacing: '-0.025em' }}>
              <div className="overflow-hidden">
                <motion.h1
                  initial={{ y: '105%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  className="font-black text-white uppercase"
                >
                  Nơi âm nhạc
                </motion.h1>
              </div>
              <div className="overflow-hidden">
                <motion.h1
                  initial={{ y: '105%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.9, delay: 0.36, ease: [0.16, 1, 0.3, 1] }}
                  className="font-black uppercase"
                  style={{
                    backgroundImage: 'linear-gradient(90deg, #c084fc 0%, #f472b6 50%, #c084fc 100%)',
                    backgroundSize: '200% 100%',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    animation: 'gradient-shift 4s ease-in-out infinite',
                    opacity: 0.75,
                  }}
                >
                  & khoảnh khắc
                </motion.h1>
              </div>
              <div className="overflow-hidden">
                <motion.h1
                  initial={{ y: '105%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.9, delay: 0.47, ease: [0.16, 1, 0.3, 1] }}
                  className="font-black uppercase text-hiu-music"
                  style={{ opacity: 0.6 }}
                >
                  gặp nhau.
                </motion.h1>
              </div>
            </div>

            {/* Description + CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.65 }}
              className="mt-10 space-y-7"
            >
              <p className="text-[13px] leading-[1.75] text-white/35 max-w-[340px]">
                Nền tảng nghe nhạc và chia sẻ ảnh đa người dùng.
                Upload, khám phá, kết nối với cộng đồng sáng tạo.
              </p>

              <div className="flex items-center gap-3">
                <Link
                  href="/register"
                  className="group inline-flex items-center gap-2.5 text-[11px] font-bold tracking-[0.12em] uppercase px-6 py-3 bg-white text-[#0a0a0f] hover:bg-hiu-music hover:text-white transition-all duration-300"
                >
                  Bắt đầu ngay
                  <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
                </Link>
                <Link
                  href="/login"
                  className="text-[11px] tracking-[0.12em] uppercase px-6 py-3 border border-white/[0.12] text-white/35 hover:text-white hover:border-white/25 transition-all duration-300"
                >
                  Đăng nhập
                </Link>
              </div>

              {/* Mini stats */}
              <div className="flex items-center gap-6 pt-1">
                {[
                  { n: '1.2K+', l: 'bài hát' },
                  { n: '4.8K+', l: 'ảnh' },
                  { n: '320+',  l: 'thành viên' },
                ].map((s) => (
                  <div key={s.l} className="flex flex-col gap-0.5">
                    <span className="text-sm font-black text-white tracking-tight">{s.n}</span>
                    <span className="text-[9px] font-mono tracking-[0.25em] uppercase text-white/25">{s.l}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* ── RIGHT: Visual col (45%) ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="lg:flex-1 flex flex-col gap-3"
          >
            {/* Card lớn — now playing mock */}
            <div className="relative border border-white/[0.08] bg-hiu-surface/60 backdrop-blur-sm p-5 overflow-hidden">
              <div
                className="absolute inset-0 opacity-40"
                style={{ background: 'radial-gradient(ellipse at 80% 20%, rgba(168,85,247,0.18) 0%, transparent 60%)' }}
              />
              <div className="relative flex items-center gap-4">
                {/* Artwork placeholder */}
                <div className="w-12 h-12 bg-hiu-elevated shrink-0 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0" style={{ background: 'radial-gradient(circle at 40% 60%, rgba(168,85,247,0.4), transparent)' }} />
                  <Music2 size={16} className="text-hiu-music relative z-10" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] font-mono tracking-[0.2em] uppercase text-white/25 mb-0.5">Đang phát</p>
                  <p className="text-sm font-bold text-white truncate">Nơi này có anh</p>
                  <p className="text-[10px] text-white/35 mt-0.5">Sơn Tùng M-TP</p>
                </div>
                <div className="shrink-0 w-7 h-7 rounded-full border border-white/10 flex items-center justify-center">
                  <Play size={9} fill="currentColor" className="text-hiu-music ml-px" />
                </div>
              </div>
              {/* Progress bar */}
              <div className="mt-4 h-px bg-white/[0.06]">
                <motion.div
                  className="h-full bg-hiu-music"
                  initial={{ width: '0%' }}
                  animate={{ width: '62%' }}
                  transition={{ duration: 1.5, delay: 1, ease: 'easeOut' }}
                />
              </div>
              <div className="flex justify-between mt-1.5">
                <span className="text-[9px] font-mono text-white/20">2:34</span>
                <span className="text-[9px] font-mono text-white/20">4:12</span>
              </div>
            </div>

            {/* 2 ảnh nhỏ */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Golden Hour', user: '@minhthu', accent: 'rgba(168,85,247,0.25)', pos: '30% 60%' },
                { label: 'Blue Hour',   user: '@linh',    accent: 'rgba(244,63,94,0.2)',   pos: '70% 30%' },
              ].map((p, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.7 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="group relative h-28 border border-white/[0.08] bg-hiu-elevated overflow-hidden cursor-pointer"
                >
                  <div
                    className="absolute inset-0 group-hover:opacity-70 transition-opacity duration-500"
                    style={{ background: `radial-gradient(ellipse at ${p.pos}, ${p.accent} 0%, transparent 70%)` }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <ImageIcon size={16} className="text-white/[0.06]" />
                  </div>
                  <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-black/60 to-transparent">
                    <p className="text-[11px] font-bold text-white leading-tight">{p.label}</p>
                    <p className="text-[9px] font-mono text-white/30 mt-0.5">{p.user}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Bottom tag row */}
            <div className="flex items-center gap-2">
              {['Trending', 'Mới nhất', 'Nổi bật'].map((t) => (
                <span key={t} className="text-[9px] font-mono tracking-[0.2em] uppercase text-white/20 border border-white/[0.06] px-2.5 py-1">
                  {t}
                </span>
              ))}
              <span className="ml-auto text-[9px] font-mono text-white/15">✦ Live</span>
            </div>
          </motion.div>

        </div>
      </motion.div>

      {/* Ticker */}
      <div
        className="absolute bottom-0 inset-x-0 border-t border-white/[0.06] overflow-hidden"
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
              className="inline-flex items-center gap-6 px-6 text-[10px] tracking-[0.3em] uppercase text-white/15 hover:text-white/45 font-mono transition-colors duration-300 cursor-default shrink-0"
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
        transition={{ delay: 1.8 }}
        className="absolute bottom-16 right-8 md:right-12 flex flex-col items-center gap-2 text-white/15 z-10"
      >
        <span className="text-[9px] tracking-[0.3em] uppercase font-mono">Scroll</span>
        <ArrowDown size={12} className="animate-bounce" />
      </motion.div>
    </section>
  );
};

// ─── Stats ────────────────────────────────────────────────────────────────────
const STATS = [
  { value: 1200, suffix: '+', label: 'Bài hát', sym: '✦', icon: Music2 },
  { value: 4800, suffix: '+', label: 'Ảnh',    sym: '▲', icon: ImageIcon },
  { value: 320,  suffix: '+', label: 'Thành viên', sym: '◉', icon: Users },
  { value: 18000, suffix: '+', label: 'Lượt nghe',  sym: '◈', icon: Headphones },
];

const Stats = () => (
  <section className="max-w-7xl mx-auto px-8 py-16">
    <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y divide-white/[0.06] border border-white/[0.06]">
      {STATS.map((s, i) => (
        <motion.div key={i} {...fadeUp(i * 0.08)} className="group p-8 hover:bg-white/[0.02] transition-colors duration-500">
          <span className="text-[11px] font-mono text-white/20 tracking-[0.3em]">{s.sym}</span>
          <div className="flex items-baseline gap-0.5 mt-3">
            <span className="text-4xl font-black text-white tracking-tight">
              <CountUp to={s.value} duration={2.2} separator="," />
            </span>
            <span className="text-xl font-black text-hiu-music">{s.suffix}</span>
          </div>
          <p className="text-[10px] font-mono tracking-[0.3em] uppercase text-white/25 mt-1.5">{s.label}</p>
        </motion.div>
      ))}
    </div>
  </section>
);

// ─── Features ─────────────────────────────────────────────────────────────────
const FEATURES = [
  {
    sym: '✦', color: 'text-hiu-music', num: '01',
    title: 'Nghe nhạc',
    desc: 'Upload và phát nhạc tức thì. Playlist cá nhân, chia sẻ với bạn bè. Player tích hợp — không rời trang.',
    icon: Music2,
    gradient: 'from-hiu-music/10 via-transparent',
  },
  {
    sym: '▲', color: 'text-hiu-photo', num: '02',
    title: 'Chia sẻ ảnh',
    desc: 'Gallery cá nhân, album theo chủ đề. Ảnh tối ưu tự động, hiển thị đẹp trên mọi thiết bị.',
    icon: ImageIcon,
    gradient: 'from-hiu-photo/10 via-transparent',
  },
  {
    sym: '◉', color: 'text-white/40', num: '03',
    title: 'Kết nối',
    desc: 'Follow nghệ sĩ, nhiếp ảnh gia. Like, comment, chia sẻ. Feed cá nhân theo sở thích.',
    icon: Users,
    gradient: 'from-white/5 via-transparent',
  },
  {
    sym: '◈', color: 'text-white/40', num: '04',
    title: 'Khám phá',
    desc: 'Trending hôm nay, ảnh nổi bật, người mới. Gợi ý thông minh dựa trên lịch sử nghe của bạn.',
    icon: Headphones,
    gradient: 'from-white/5 via-transparent',
  },
];

const Features = () => (
  <section id="features" className="max-w-7xl mx-auto px-8 py-24">
    <SectionLabel num="02" name="TÍNH NĂNG" />
    <div className="grid md:grid-cols-2 divide-x divide-y divide-white/[0.06] border border-white/[0.06]">
      {FEATURES.map((f, i) => (
        <motion.div key={i} {...fadeUp(i * 0.08)}
          className={`group relative p-10 overflow-hidden cursor-default transition-all duration-500 hover:bg-white/[0.02]`}>
          {/* hover glow bg */}
          <div className={`absolute inset-0 bg-gradient-to-br ${f.gradient} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`} />

          <div className="relative z-10">
            <div className="flex items-start justify-between mb-10">
              <span className={`text-[10px] font-mono tracking-[0.3em] ${f.color}`}>{f.sym} {f.num}</span>
              <f.icon size={14} className="text-white/8 group-hover:text-white/20 transition-colors duration-500" />
            </div>
            <h3 className="text-[clamp(1.25rem,2.5vw,1.75rem)] font-black uppercase tracking-tight text-white mb-3 group-hover:text-hiu-music transition-colors duration-500">
              <DecryptedText
                text={f.title}
                animateOn="hover"
                sequential
                speed={40}
                characters="ABCDEFGHIJKLMNOPQRSTUVWXYZ"
                className="text-inherit"
                encryptedClassName="text-white/20"
              />
            </h3>
            <p className="text-sm leading-relaxed text-white/30">{f.desc}</p>
          </div>
        </motion.div>
      ))}
    </div>
  </section>
);

// ─── Track preview ────────────────────────────────────────────────────────────
const TRACK_DATA = [
  { title: 'Nơi này có anh', artist: 'Sơn Tùng M-TP', plays: 24700, dur: '4:12' },
  { title: 'Chúng ta của hiện tại', artist: 'Sơn Tùng M-TP', plays: 18300, dur: '3:58' },
  { title: 'Waiting for you', artist: 'MONO', plays: 15200, dur: '3:44' },
  { title: 'Có chắc yêu là đây', artist: 'Sơn Tùng M-TP', plays: 12900, dur: '4:05' },
  { title: 'Hãy trao cho anh', artist: 'Sơn Tùng M-TP ft. Snoop Dogg', plays: 11400, dur: '3:30' },
];

const TrackPreview = () => (
  <section className="max-w-7xl mx-auto px-8 py-24">
    <SectionLabel num="03" name="ÂM NHẠC" />
    <div className="flex items-end justify-between mb-10">
      <BlurText
        text="Trending hôm nay"
        delay={60}
        animateBy="words"
        direction="bottom"
        className="font-black uppercase leading-[1.05] tracking-tight text-white"
        stepDuration={0.45}
      />
      <a href="#" className="inline-flex items-center gap-2 text-[10px] font-mono tracking-[0.3em] uppercase text-white/25 hover:text-white transition-colors pb-px border-b border-white/[0.06] self-end">
        Xem tất cả <ArrowRight size={10} />
      </a>
    </div>
    <div className="border border-white/[0.06] divide-y divide-white/[0.06]">
      {TRACK_DATA.map((t, i) => (
        <motion.div key={i} {...fadeUp(i * 0.06)}
          className="group flex items-center gap-5 px-5 py-4 hover:bg-white/[0.03] transition-colors cursor-pointer">
          <span className="text-[10px] font-mono text-white/15 w-5 text-right shrink-0">
            {String(i + 1).padStart(2, '0')}
          </span>
          <div className="w-9 h-9 bg-white/[0.04] shrink-0 flex items-center justify-center group-hover:bg-hiu-music/20 transition-colors">
            <Play size={11} className="text-white/15 group-hover:text-hiu-music ml-px transition-colors" fill="currentColor" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-white truncate group-hover:text-hiu-music transition-colors duration-300">
              {t.title}
            </p>
            <p className="text-[10px] font-mono tracking-[0.2em] text-white/25 truncate mt-0.5">{t.artist}</p>
          </div>

          {/* Waveform mock */}
          <div className="hidden md:flex items-end gap-[3px] h-5 shrink-0">
            {[3,5,7,4,8,6,4,7,5,3].map((h, idx) => (
              <motion.div
                key={idx}
                className="w-[3px] bg-white/10 group-hover:bg-hiu-music/40 transition-colors duration-300 rounded-full"
                style={{ height: `${h * 2}px` }}
                animate={undefined}
              />
            ))}
          </div>

          <div className="hidden md:flex items-center gap-8 shrink-0">
            <span className="text-[10px] font-mono text-white/20">
              {t.plays.toLocaleString()} lượt
            </span>
            <span className="text-[10px] font-mono text-white/20">{t.dur}</span>
          </div>
        </motion.div>
      ))}
    </div>
  </section>
);

// ─── Photo preview ────────────────────────────────────────────────────────────
type PhotoItem = {
  label: string;
  user: string;
  tag: string;
  accent: string;
  gradientPos: string;
};

const PHOTO_FEATURED: PhotoItem = {
  label: 'Golden Hour', user: '@minhthu', tag: 'Phong cảnh',
  accent: 'rgba(168,85,247,0.18)',
  gradientPos: '30% 60%',
};

const PHOTO_GRID: PhotoItem[] = [
  { label: 'Street Life',  user: '@anhquan',   tag: 'Đường phố', accent: 'rgba(244,63,94,0.15)',  gradientPos: '70% 30%' },
  { label: 'Blue Hour',    user: '@linh.photo', tag: 'Kiến trúc', accent: 'rgba(99,102,241,0.15)', gradientPos: '20% 80%' },
  { label: 'Portrait',     user: '@namhieu',   tag: 'Chân dung', accent: 'rgba(244,63,94,0.12)',  gradientPos: '60% 20%' },
  { label: 'Cityscape',    user: '@trungdung', tag: 'Đô thị',    accent: 'rgba(168,85,247,0.14)', gradientPos: '40% 70%' },
];

const PhotoCard = ({
  item, className, index,
}: { item: PhotoItem; className?: string; index: number }) => (
  <motion.div
    {...fadeUp(index * 0.07)}
    className={`group relative bg-hiu-elevated overflow-hidden cursor-pointer ${className ?? ''}`}
  >
    {/* Ambient gradient — giả lập màu ảnh */}
    <div
      className="absolute inset-0 transition-opacity duration-700 group-hover:opacity-80"
      style={{
        background: `radial-gradient(ellipse at ${item.gradientPos}, ${item.accent} 0%, transparent 65%)`,
      }}
    />
    {/* Subtle dot texture */}
    <div
      className="absolute inset-0 opacity-[0.025]"
      style={{
        backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)',
        backgroundSize: '18px 18px',
      }}
    />

    {/* Always-visible label bottom */}
    <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/70 via-black/20 to-transparent">
      <div className="flex items-end justify-between">
        <div>
          <p className="text-[10px] font-mono tracking-[0.25em] uppercase text-white/35 mb-1">{item.tag}</p>
          <p className="text-[13px] font-bold tracking-tight text-white leading-tight">{item.label}</p>
        </div>
        <p className="text-[10px] font-mono text-white/30 pb-px">{item.user}</p>
      </div>
    </div>

    {/* Hover: scale + brighten overlay */}
    <div className="absolute inset-0 bg-white/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
      <span className="text-[9px] font-mono tracking-[0.2em] uppercase text-white/40 border border-white/10 px-2 py-1">
        Xem
      </span>
    </div>
  </motion.div>
);

const PhotoPreview = () => (
  <section className="max-w-7xl mx-auto px-8 py-24">
    <SectionLabel num="04" name="KHOẢNH KHẮC" />

    {/* Header */}
    <div className="flex items-end justify-between mb-10">
      <BlurText
        text="Ảnh nổi bật cộng đồng"
        delay={60}
        animateBy="words"
        direction="bottom"
        className="font-black uppercase leading-[1.05] tracking-tight text-white"
        stepDuration={0.45}
      />
      <a
        href="#"
        className="inline-flex items-center gap-2 text-[10px] font-mono tracking-[0.3em] uppercase text-white/25 hover:text-white transition-colors pb-px border-b border-white/[0.06] self-end"
      >
        Xem tất cả <ArrowRight size={10} />
      </a>
    </div>

    {/* Layout: 1 ảnh lớn + 2×2 grid — tổng chiều cao bằng nhau */}
    <div className="border border-white/[0.06] flex flex-col md:flex-row" style={{ height: 480 }}>
      {/* Ảnh featured — chiều rộng 40% */}
      <PhotoCard
        item={PHOTO_FEATURED}
        index={0}
        className="md:w-[40%] shrink-0 border-b md:border-b-0 md:border-r border-white/[0.06] h-60 md:h-full"
      />

      {/* 2×2 grid bên phải — chiều rộng 60% */}
      <div className="flex-1 grid grid-cols-2 grid-rows-2 divide-x divide-y divide-white/[0.06]">
        {PHOTO_GRID.map((item, i) => (
          <PhotoCard key={i} item={item} index={i + 1} className="h-full" />
        ))}
      </div>
    </div>

    {/* Dòng meta phía dưới */}
    <motion.div {...fadeUp(0.3)} className="flex items-center justify-between mt-4">
      <p className="text-[10px] font-mono tracking-[0.25em] uppercase text-white/15">
        {'✦'} 4.8K+ ảnh từ cộng đồng
      </p>
      <div className="flex items-center gap-2">
        {['Phong cảnh', 'Đường phố', 'Chân dung', 'Đô thị'].map((tag) => (
          <span
            key={tag}
            className="text-[9px] font-mono tracking-[0.2em] uppercase text-white/20 border border-white/[0.06] px-2.5 py-1 hover:text-white/50 hover:border-white/15 transition-colors cursor-pointer"
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  </section>
);

// ─── CTA ──────────────────────────────────────────────────────────────────────
const CTA = () => (
  <section className="max-w-7xl mx-auto px-8 py-24">
    <SectionLabel num="05" name="THAM GIA" />
    <motion.div {...fadeUp(0)} className="border border-white/[0.08] p-16 md:p-24 text-center relative overflow-hidden">
      {/* Glows */}
      <div className="absolute inset-0 bg-gradient-to-br from-hiu-music/8 via-transparent to-hiu-photo/8 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-hiu-music/[0.06] blur-[100px] pointer-events-none" />

      <div className="relative z-10">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-[10px] font-mono tracking-[0.35em] uppercase text-white/20 mb-8"
        >
          ✦ Miễn phí hoàn toàn ✦
        </motion.p>

        <div className="overflow-hidden mb-12">
          <BlurText
            text="Bắt đầu ngay hôm nay"
            delay={70}
            animateBy="words"
            direction="bottom"
            className="font-black uppercase leading-[1.05] tracking-tight text-white"
            stepDuration={0.5}
          />
        </div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-sm text-white/30 max-w-sm mx-auto mb-10 leading-relaxed"
        >
          Tạo tài khoản miễn phí, upload nhạc và ảnh của bạn — kết nối với cộng đồng sáng tạo ngay hôm nay.
        </motion.p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/register"
            className="group inline-flex items-center gap-3 px-8 py-4 text-[11px] font-bold tracking-[0.15em] uppercase bg-white text-hiu-bg hover:bg-hiu-music hover:text-white transition-all duration-300">
            Tạo tài khoản <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link href="/login"
            className="px-8 py-4 text-[11px] tracking-[0.15em] uppercase border border-white/[0.12] text-white/35 hover:text-white hover:border-white/25 transition-all duration-300">
            Đăng nhập
          </Link>
        </div>
      </div>
    </motion.div>
  </section>
);

// ─── Footer ───────────────────────────────────────────────────────────────────
const Footer = () => (
  <footer className="border-t border-white/[0.06] max-w-7xl mx-auto px-8 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
    <span className="text-[11px] font-black font-mono tracking-[0.3em] uppercase text-white/30">HIU</span>
    <p className="text-[10px] font-mono tracking-[0.3em] uppercase text-white/15">
      © 2026 Hiu Platform · Nghe nhạc ✦ Chia sẻ ảnh
    </p>
    <div className="flex gap-6">
      {['Điều khoản', 'Bảo mật'].map((item) => (
        <a key={item} href="#"
          className="text-[10px] font-mono tracking-[0.3em] uppercase text-white/15 hover:text-white/40 transition-colors">
          {item}
        </a>
      ))}
    </div>
  </footer>
);

// ─── Page ─────────────────────────────────────────────────────────────────────
const LandingPage = () => (
  <div className="bg-hiu-bg min-h-screen">
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
