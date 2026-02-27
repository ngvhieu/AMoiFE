# Phase 6 — Performance & Production

**Mục tiêu**: Tối ưu hiệu năng, SEO, accessibility, và deploy production ổn định.

**Trạng thái**: ⏳ Pending

**Phụ thuộc API**: Phase 6 — API production ổn định, R2 custom domain hoạt động

---

## 6.1 Image Optimization

- [ ] Cấu hình `next.config.mjs`:
  - `images.remotePatterns` cho domain R2 `media.hieumoi.online`
  - Dùng `next/image` cho tất cả ảnh track cover, avatar, photo
- [ ] Thay thế `<img>` bằng `<Image>` từ `next/image` trên toàn bộ project
- [ ] Thêm `blur` placeholder cho ảnh chính (blurDataURL từ server hoặc base64 tiny)
- [ ] Lazy load ảnh ngoài viewport (mặc định với `next/image`, kiểm tra `loading="lazy"`)

## 6.2 RTK Query — Caching & Optimization

- [ ] Cấu hình `keepUnusedDataFor` phù hợp cho từng endpoint:
  - `getTracks`, `getPhotos`: 60s
  - `getFeed`: 120s
  - `getTrendingTracks`, `getTrendingPhotos`: 1800s (30 phút)
  - `getAdminStats`: 300s
- [ ] Thêm `providesTags` / `invalidatesTags` cho tất cả mutations (cache invalidation đúng)
- [ ] Optimistic updates cho `likeTrack`, `likePhoto`, `followUser`
- [ ] Prefetch trending data trong `(main)/layout.tsx` (Server Component)

## 6.3 Performance

- [ ] `react-virtuoso` cho tất cả list dài: Feed, Search results, Playlist tracks, Queue
- [ ] Code splitting: mỗi module là lazy import (`dynamic(() => import(...), { ssr: false })`)
- [ ] `FullscreenPlayer` dùng dynamic import (nặng, ít dùng)
- [ ] GSAP và Three.js (nếu dùng React Bits WebGL) chỉ load khi component mount
- [ ] Kiểm tra bundle size: `pnpm build && pnpm analyze` (cài `@next/bundle-analyzer`)
- [ ] Loại bỏ unused React Bits components đã cài nhưng không dùng

## 6.4 i18n — Kiểm tra & hoàn thiện

- [ ] Rà soát toàn bộ codebase — không còn string cứng trong JSX (dùng `useTranslations`)
- [ ] SEO metadata theo locale: `generateMetadata` trả `alternates.languages` cho vi/en
- [ ] `hreflang` tag đúng trong `<head>` cho mỗi trang
- [ ] Kiểm tra date/time format theo locale: `vi` → `dd/MM/yyyy`, `en` → `MM/dd/yyyy`
- [ ] Số lượng (plays, likes, followers) format theo locale: `vi` → `1.000`, `en` → `1,000`
- [ ] `LanguageSwitcher` không reload trang, chuyển mượt qua next-intl `useRouter`
- [ ] Test: chuyển locale → tất cả text thay đổi, URL cập nhật đúng prefix

## 6.5 SEO & Metadata

- [ ] `src/app/(main)/discover/page.tsx` — `generateMetadata` với title, description, og:image
- [ ] `src/app/(main)/profile/[username]/page.tsx` — dynamic metadata theo user
- [ ] Track detail page — metadata với tên bài, nghệ sĩ, og:image là album art
- [ ] Photo detail page — metadata với caption, og:image là ảnh
- [ ] `src/app/sitemap.ts` — sitemap tự động cho public pages
- [ ] `src/app/robots.ts` — robots.txt

## 6.5 Accessibility (a11y)

- [ ] Tất cả button có `aria-label` rõ ràng (Play, Pause, Like, Follow...)
- [ ] `PlayerBar` có `role="region" aria-label="Music Player"`
- [ ] Keyboard navigation cho Player (Space = play/pause, Arrow = seek)
- [ ] Focus visible styles không bị ẩn (kiểm tra `outline`)
- [ ] Radix UI components đã có a11y tốt — kiểm tra Dialog, Slider, Tooltip đang dùng đúng
- [ ] Color contrast đủ 4.5:1 trên text chính so với background

## 6.6 Error Handling UI

- [ ] `src/app/error.tsx` — trang lỗi toàn app
- [ ] `src/app/not-found.tsx` — trang 404 đẹp
- [ ] `src/common/components/ErrorBoundary.tsx` — catch lỗi component
- [ ] Toast notifications cho lỗi API: dùng `@radix-ui/react-toast` hoặc thư viện nhỏ
  - Upload thất bại, network error, 401 → auto redirect login
- [ ] Retry logic trong RTK Query base query khi gặp 5xx

## 6.7 Auth — Token Refresh Robust

- [ ] RTK Query base query xử lý 401: tự động gọi `refreshToken` rồi retry request gốc
- [ ] Nếu refresh thất bại → logout + redirect `/login`
- [ ] Không để nhiều request cùng lúc trigger refresh (mutex/flag)

## 6.8 CI/CD & Deployment

- [ ] Tạo `.env.production` template (không commit giá trị thật)
- [ ] GitHub Actions workflow:
  - `pnpm lint` + `pnpm typecheck` trên mọi PR
  - `pnpm build` kiểm tra build thành công
- [ ] Deploy lên Vercel:
  - Connect repo, cấu hình env vars
  - Preview deployment cho mỗi PR
  - Production deployment khi merge `main`
- [ ] Cấu hình custom domain trên Vercel (nếu có)

## 6.9 Testing

- [ ] Setup Vitest + React Testing Library
- [ ] Unit test `authSlice`: login, logout, token refresh
- [ ] Unit test `playerSlice`: setTrack, play/pause, queue
- [ ] Test component `LikeButton`: render, click, optimistic update
- [ ] Test component `PlayerControls`: play/pause, skip
- [ ] E2E test (Playwright): login → upload track → play → like → logout

## 6.10 Monitoring

- [ ] Tích hợp Vercel Analytics (`@vercel/analytics`)
- [ ] Vercel Speed Insights (`@vercel/speed-insights`)
- [ ] Web Vitals tracking: LCP, CLS, FID
- [ ] Console.error tracking — không có lỗi unhandled trong production

---

## Definition of Done
- [ ] `pnpm build` thành công, không có TypeScript errors
- [ ] Lighthouse score: Performance ≥ 80, Accessibility ≥ 90
- [ ] Deploy Vercel thành công, tất cả env vars đúng
- [ ] GitHub Actions CI xanh trên mọi PR
- [ ] Không có lỗi console unhandled trong production
