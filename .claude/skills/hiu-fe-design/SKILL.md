---
name: hiu-fe-design
description: UI/UX design skill cho Hiu platform - nền tảng nghe nhạc và chia sẻ ảnh multi-user. Dùng khi tạo component giao diện, trang player nhạc, gallery ảnh, feed, profile, dark theme, animations. Tích hợp React Bits, Lucide Icons, Framer Motion, và design system tối màu phong cách Spotify/Apple Music.
compatibility: Designed for Claude Code. Next.js 16, React 19, Tailwind CSS v3.
metadata:
  author: hiu-team
  version: "1.0"
---

# Hiu Frontend Design Skill

Platform nghe nhạc + chia sẻ ảnh multi-user. Phong cách: **dark, glassmorphism, immersive** — lấy cảm hứng từ Spotify, Apple Music, Instagram.

## Stack & Libraries

| Thư viện | Mục đích | Install |
|----------|----------|---------|
| `react-bits` | Animated UI components | `npx shadcn@latest add https://reactbits.dev/r/<Name>-TS-TW` |
| `lucide-react` | Icons | `pnpm add lucide-react` |
| `framer-motion` | Layout animations, transitions | `pnpm add framer-motion` |
| `gsap` | Timeline animations (waveform, player) | `pnpm add gsap` |
| `use-sound` | Audio playback hooks | `pnpm add use-sound` |
| `react-h5-audio-player` | Audio player UI base | `pnpm add react-h5-audio-player` |
| `@radix-ui/react-slider` | Volume / progress slider accessible | `pnpm add @radix-ui/react-slider` |
| `@radix-ui/react-dialog` | Modal / lightbox | `pnpm add @radix-ui/react-dialog` |
| `@radix-ui/react-tooltip` | Tooltips | `pnpm add @radix-ui/react-tooltip` |
| `react-intersection-observer` | Lazy load / scroll reveal | `pnpm add react-intersection-observer` |
| `react-virtuoso` | Virtual scroll cho feed dài | `pnpm add react-virtuoso` |
| `sharp` | Image optimization (server) | `pnpm add sharp` |

## React Bits — Components phù hợp cho platform này

### Dùng ngay — không cần deps nặng

```bash
# Backgrounds
npx shadcn@latest add https://reactbits.dev/r/Aurora-TS-TW        # Trang landing / hero
npx shadcn@latest add https://reactbits.dev/r/Silk-TS-TW           # Background player
npx shadcn@latest add https://reactbits.dev/r/Waves-TS-TW          # Visualizer đơn giản
npx shadcn@latest add https://reactbits.dev/r/Threads-TS-TW        # Background feed

# UI Components
npx shadcn@latest add https://reactbits.dev/r/Masonry-TS-TW        # Photo gallery grid
npx shadcn@latest add https://reactbits.dev/r/SpotlightCard-TS-TW  # Music card / Photo card
npx shadcn@latest add https://reactbits.dev/r/TiltedCard-TS-TW     # Album art card
npx shadcn@latest add https://reactbits.dev/r/ProfileCard-TS-TW    # User profile card
npx shadcn@latest add https://reactbits.dev/r/GlassSurface-TS-TW   # Player bar / Modal
npx shadcn@latest add https://reactbits.dev/r/Dock-TS-TW           # Mobile bottom nav
npx shadcn@latest add https://reactbits.dev/r/CircularGallery-TS-TW # Featured photos
npx shadcn@latest add https://reactbits.dev/r/AnimatedList-TS-TW   # Playlist / Queue
npx shadcn@latest add https://reactbits.dev/r/MagicBento-TS-TW     # Dashboard bento grid
npx shadcn@latest add https://reactbits.dev/r/ScrollStack-TS-TW    # Featured tracks scroll
npx shadcn@latest add https://reactbits.dev/r/FlyingPosters-TS-TW  # Album posters hero

# Text Animations
npx shadcn@latest add https://reactbits.dev/r/ShinyText-TS-TW      # Track title highlight
npx shadcn@latest add https://reactbits.dev/r/BlurText-TS-TW       # Page transitions
npx shadcn@latest add https://reactbits.dev/r/GradientText-TS-TW   # Logo / Headings

# Animations / Effects
npx shadcn@latest add https://reactbits.dev/r/FadeContent-TS-TW    # Page fade in
npx shadcn@latest add https://reactbits.dev/r/GlareHover-TS-TW     # Album art hover
npx shadcn@latest add https://reactbits.dev/r/ClickSpark-TS-TW     # Like button spark
npx shadcn@latest add https://reactbits.dev/r/Magnet-TS-TW         # Play button magnet
npx shadcn@latest add https://reactbits.dev/r/SplashCursor-TS-TW   # Custom cursor
```

### Cần deps (gsap, motion, ogl)

```bash
# Cần gsap
npx shadcn@latest add https://reactbits.dev/r/ScrollVelocity-TS-TW  # Artist name marquee
npx shadcn@latest add https://reactbits.dev/r/FlowingMenu-TS-TW      # Genre menu

# Cần three/ogl
npx shadcn@latest add https://reactbits.dev/r/Iridescence-TS-TW      # Album art effect
npx shadcn@latest add https://reactbits.dev/r/LiquidChrome-TS-TW     # Premium header bg
```

## Design Tokens — Dark Theme

Mở rộng `tailwind.config.ts`:

```ts
colors: {
  hiu: {
    // Base dark
    bg:        '#0a0a0f',
    surface:   '#111118',
    elevated:  '#1a1a24',
    border:    '#ffffff14',
    // Accent music (purple/violet)
    music:     '#a855f7',
    'music-dim': '#7c3aed',
    // Accent photo (rose/pink)
    photo:     '#f43f5e',
    'photo-dim': '#be123c',
    // Text
    primary:   '#f8fafc',
    secondary: '#94a3b8',
    muted:     '#475569',
    // States
    active:    '#a855f7',
    success:   '#22c55e',
    warning:   '#f59e0b',
  }
}
```

## Layout Architecture

```
src/modules/
├── Player/              # Mini player (bottom bar)
│   ├── page.tsx
│   └── components/
│       ├── PlayerBar.tsx       # Fixed bottom bar
│       ├── TrackInfo.tsx       # Ảnh + tên bài
│       ├── PlayerControls.tsx  # Play/Pause/Skip
│       ├── ProgressSlider.tsx  # Thanh tiến trình
│       ├── VolumeControl.tsx
│       └── FullscreenPlayer.tsx # Modal player toàn màn hình
├── Feed/                # Home feed (ảnh + nhạc mix)
│   ├── page.tsx
│   └── components/
│       ├── FeedItem.tsx
│       ├── PhotoPost.tsx
│       ├── MusicPost.tsx
│       └── StoryRow.tsx
├── Discover/            # Khám phá nhạc / ảnh
│   ├── page.tsx
│   └── components/
│       ├── FeaturedBanner.tsx
│       ├── TrackCard.tsx
│       ├── AlbumGrid.tsx
│       └── PhotoMasonry.tsx
├── Library/             # Thư viện cá nhân
│   ├── page.tsx
│   └── components/
│       ├── Playlist.tsx
│       ├── SavedPhotos.tsx
│       └── RecentlyPlayed.tsx
├── Profile/             # Trang người dùng
│   ├── page.tsx
│   └── components/
│       ├── ProfileHeader.tsx
│       ├── UserTracks.tsx
│       └── UserPhotos.tsx
└── Auth/                # Login / Register
    ├── page.tsx
    └── components/
        ├── LoginForm.tsx
        └── RegisterForm.tsx
```

## Component Patterns

### GlassSurface Card (dùng cho player bar, modal)

```tsx
// Dùng GlassSurface từ React Bits
import GlassSurface from '@/components/GlassSurface';

<GlassSurface
  className="fixed bottom-0 left-0 right-0 h-20 px-6 flex items-center gap-4"
  borderRadius={0}
>
  <TrackInfo />
  <PlayerControls />
  <VolumeControl />
</GlassSurface>
```

### SpotlightCard cho Track / Photo

```tsx
import SpotlightCard from '@/components/SpotlightCard';

<SpotlightCard
  className="bg-hiu-elevated border border-hiu-border rounded-xl p-4 cursor-pointer"
  spotlightColor="rgba(168, 85, 247, 0.15)"
>
  <img src={coverUrl} className="w-full aspect-square rounded-lg object-cover" />
  <div className="mt-3">
    <p className="text-hiu-primary font-medium truncate">{trackName}</p>
    <p className="text-hiu-secondary text-sm truncate">{artistName}</p>
  </div>
</SpotlightCard>
```

### Masonry Photo Grid

```tsx
import Masonry from '@/components/Masonry';

<Masonry
  items={photos.map(p => ({
    id: p.id,
    img: p.url,
    url: `/photo/${p.id}`,
    height: p.height, // random từ 200-400
  }))}
  ease="power3.out"
  duration={0.6}
  stagger={0.05}
  animateFrom="bottom"
  scaleOnHover={true}
  hoverScale={0.95}
/>
```

### Dock Navigation (mobile)

```tsx
import Dock from '@/components/Dock';
import { Home, Search, Library, User } from 'lucide-react';

<Dock
  items={[
    { icon: <Home />, label: 'Home',     onClick: () => router.push('/') },
    { icon: <Search />, label: 'Khám phá', onClick: () => router.push('/discover') },
    { icon: <Library />, label: 'Thư viện', onClick: () => router.push('/library') },
    { icon: <User />, label: 'Profile',  onClick: () => router.push('/profile') },
  ]}
  panelHeight={68}
  baseItemSize={50}
  magnification={70}
  className="fixed bottom-24 left-1/2 -translate-x-1/2"
/>
```

### Aurora Background (Landing)

```tsx
import Aurora from '@/components/Aurora';

<div className="relative min-h-screen bg-hiu-bg overflow-hidden">
  <Aurora
    colorStops={['#a855f7', '#3b82f6', '#f43f5e']}
    speed={0.5}
    amplitude={1.2}
    className="absolute inset-0 opacity-60"
  />
  <div className="relative z-10">
    {/* content */}
  </div>
</div>
```

### ClickSpark for Like Button

```tsx
import ClickSpark from '@/components/ClickSpark';

<ClickSpark sparkColor="#f43f5e" sparkSize={10} sparkCount={8}>
  <button
    onClick={handleLike}
    className="flex items-center gap-1.5 text-hiu-secondary hover:text-hiu-photo transition-colors"
  >
    <Heart className={liked ? 'fill-hiu-photo text-hiu-photo' : ''} size={20} />
    <span className="text-sm">{likeCount}</span>
  </button>
</ClickSpark>
```

## Audio Player Pattern

```tsx
'use client';
import { useState, useRef } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2 } from 'lucide-react';
import * as Slider from '@radix-ui/react-slider';

export const PlayerControls = () => {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState([0]);
  const [volume, setVolume] = useState([80]);

  return (
    <div className="flex flex-col items-center gap-2 flex-1">
      {/* Controls */}
      <div className="flex items-center gap-4">
        <SkipBack
          size={18}
          className="text-hiu-secondary hover:text-hiu-primary cursor-pointer transition-colors"
          onClick={skipPrev}
        />
        <button
          onClick={() => setPlaying(!playing)}
          className="w-10 h-10 rounded-full bg-hiu-music flex items-center justify-center hover:scale-105 transition-transform"
        >
          {playing ? <Pause size={18} className="text-white" /> : <Play size={18} className="text-white ml-0.5" />}
        </button>
        <SkipForward
          size={18}
          className="text-hiu-secondary hover:text-hiu-primary cursor-pointer transition-colors"
          onClick={skipNext}
        />
      </div>
      {/* Progress */}
      <div className="flex items-center gap-3 w-full max-w-sm">
        <span className="text-xs text-hiu-muted w-8 text-right">{formatTime(currentTime)}</span>
        <Slider.Root
          value={progress}
          onValueChange={setProgress}
          max={100} step={0.1}
          className="relative flex items-center flex-1 h-4 cursor-pointer group"
        >
          <Slider.Track className="relative h-1 flex-1 rounded-full bg-hiu-border">
            <Slider.Range className="absolute h-full rounded-full bg-hiu-music" />
          </Slider.Track>
          <Slider.Thumb className="block w-3 h-3 rounded-full bg-white shadow opacity-0 group-hover:opacity-100 transition-opacity" />
        </Slider.Root>
        <span className="text-xs text-hiu-muted w-8">{formatTime(duration)}</span>
      </div>
    </div>
  );
};
```

## Photo Gallery (Lightbox)

```tsx
'use client';
import * as Dialog from '@radix-ui/react-dialog';
import { motion, AnimatePresence } from 'framer-motion';

export const PhotoLightbox = ({ photo, open, onClose }) => (
  <Dialog.Root open={open} onOpenChange={onClose}>
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50" />
      <Dialog.Content className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25 }}
              className="relative max-w-4xl w-full"
            >
              <img
                src={photo.url}
                alt={photo.caption}
                className="w-full rounded-2xl object-contain max-h-[80vh]"
              />
              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img src={photo.user.avatar} className="w-8 h-8 rounded-full" />
                  <span className="text-hiu-primary font-medium">{photo.user.name}</span>
                </div>
                <p className="text-hiu-secondary text-sm">{photo.caption}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
);
```

## Framer Motion — Page Transitions

```tsx
// src/common/components/PageTransition.tsx
'use client';
import { motion } from 'framer-motion';

export const PageTransition = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -16 }}
    transition={{ duration: 0.3, ease: 'easeOut' }}
  >
    {children}
  </motion.div>
);
```

## Naming & File Conventions

- Tất cả React Bits components cài vào `src/components/<Name>.tsx` (do shadcn CLI tự đặt)
- Modules dùng `'use client'` — tất cả đều có interactivity
- Màu dark theme dùng prefix `hiu-` (ví dụ: `bg-hiu-bg`, `text-hiu-music`)
- Icon dùng `lucide-react` — size mặc định `20`, `className` cho màu
- Animation: ưu tiên Framer Motion cho layout/page, React Bits cho wow-effects, GSAP cho phức tạp (waveform)

## Routing Structure (App Router)

```
src/app/
├── (main)/               # Layout với PlayerBar + Sidebar
│   ├── layout.tsx        # GlassSurface sidebar + PlayerBar bottom
│   ├── page.tsx          # Feed
│   ├── discover/page.tsx
│   ├── library/page.tsx
│   └── profile/[id]/page.tsx
└── (auth)/               # Layout riêng, Aurora background
    ├── layout.tsx
    ├── login/page.tsx
    └── register/page.tsx
```

## Key UX Rules

1. **Dark only** — không cần light mode cho v1, `bg-hiu-bg` là nền chính
2. **Player bar** cố định bottom, cao 80px — các trang cần `pb-20` để không bị che
3. **Ảnh** luôn dùng `object-cover` + `aspect-square` hoặc `aspect-[4/3]` — không stretch
4. **Skeleton loading** cho tất cả card (`animate-pulse bg-hiu-elevated`)
5. **Infinite scroll** dùng `react-intersection-observer` + `react-virtuoso` cho feed
6. **Audio** chỉ play 1 track tại 1 thời điểm — quản lý bằng Redux slice `playerSlice`
