# Phase 4 — Discovery & Search UI

**Mục tiêu**: Người dùng khám phá nội dung qua search, trending, explore.

**Trạng thái**: ⏳ Pending

**Phụ thuộc API**: Phase 4 — Search, Trending, Explore, User content listing

---

## 4.1 Cài thêm thư viện

- [ ] Cài React Bits components:
  ```bash
  npx shadcn@latest add https://reactbits.dev/r/CircularGallery-TS-TW
  npx shadcn@latest add https://reactbits.dev/r/ScrollVelocity-TS-TW
  npx shadcn@latest add https://reactbits.dev/r/MagicBento-TS-TW
  npx shadcn@latest add https://reactbits.dev/r/BounceCards-TS-TW
  npx shadcn@latest add https://reactbits.dev/r/GradientText-TS-TW
  npx shadcn@latest add https://reactbits.dev/r/ShinyText-TS-TW
  npx shadcn@latest add https://reactbits.dev/r/BlurText-TS-TW
  npx shadcn@latest add https://reactbits.dev/r/Aurora-TS-TW
  ```
- [ ] `pnpm add gsap` — cho ScrollVelocity (marquee nghệ sĩ)

## 4.2 RTK Query — Search & Discover API

- [ ] Tạo `src/lib/services/searchApi.ts`:
  - `search` query — `GET /api/search?q=&type=all|tracks|photos|users`
  - `searchSuggestions` query — `GET /api/search/suggestions?q=`
- [ ] Tạo `src/lib/services/discoverApi.ts`:
  - `getTrendingTracks` query — `GET /api/trending/tracks`
  - `getTrendingPhotos` query — `GET /api/trending/photos`
  - `getTrendingUsers` query — `GET /api/trending/users`
  - `getExplore` query — `GET /api/explore`
  - `getGenres` query — `GET /api/explore/genres`
  - `getTracksByGenre` query — `GET /api/explore/tracks?genre=`
  - `getUserTracks` query — `GET /api/users/:username/tracks`
  - `getUserPhotos` query — `GET /api/users/:username/photos`
  - `getUserAlbums` query — `GET /api/users/:username/albums`
  - `getUserPlaylists` query — `GET /api/users/:username/playlists`

## 4.3 Search — Components

- [ ] `src/common/components/SearchBar.tsx`:
  - Input có icon kính lúp (Lucide)
  - Debounce 300ms trước khi gọi API
  - Dropdown suggestions khi gõ (top 5 tracks + users)
  - Clear button khi có giá trị
  - Keyboard: Enter → vào trang kết quả, Esc → đóng suggestions
- [ ] `src/common/components/SearchSuggestionItem.tsx`:
  - Variant track: icon nhạc + tên + nghệ sĩ
  - Variant user: avatar + username

## 4.4 Search Results Page

- [ ] `src/modules/Search/page.tsx`:
  - Tab filter: Tất cả / Nhạc / Ảnh / Người dùng
  - Section "Nhạc" — danh sách `TrackListItem`
  - Section "Ảnh" — grid 3 cột `PhotoCard`
  - Section "Người dùng" — danh sách `UserCard`
  - Khi không có kết quả → `EmptyState` với gợi ý
  - Loading skeleton theo từng tab
- [ ] `src/modules/Search/components/UserCard.tsx`:
  - Avatar + displayName + username + số followers
  - `FollowButton`
- [ ] `src/modules/Search/components/SearchResultSection.tsx` — wrapper cho từng nhóm kết quả
- [ ] `src/app/(main)/search/page.tsx`

## 4.5 Discover / Explore Page

- [ ] `src/modules/Discover/page.tsx`:
  - **Hero**: `FlyingPosters` với trending album arts hoặc `Aurora` background + `BlurText` title
  - **Trending Tracks**: `ScrollStack` horizontal + `ShinyText` section title
  - **Trending Photos**: `CircularGallery` (ảnh trending nổi bật)
  - **Genres**: grid pill buttons, click → filter tracks theo genre
  - **Trending Users**: `BounceCards` với avatar users
  - **Marquee nghệ sĩ**: `ScrollVelocity` với tên nghệ sĩ scroll ngang
- [ ] `src/modules/Discover/components/FeaturedBanner.tsx`:
  - Track nổi bật nhất + Aurora background lấy màu từ album art
  - Nút Play To + tên nghệ sĩ với `GradientText`
- [ ] `src/modules/Discover/components/TrendingTrackCard.tsx` — biến thể card có số rank (#1, #2...)
- [ ] `src/modules/Discover/components/GenrePills.tsx` — pills responsive, active state
- [ ] `src/modules/Discover/components/TrendingUserRow.tsx`
- [ ] `src/app/(main)/discover/page.tsx`

## 4.6 Genre Filter Page

- [ ] `src/modules/Discover/GenrePage/page.tsx`:
  - Header với tên genre + màu accent theo genre (Pop → tím, Jazz → vàng, ...)
  - Grid tracks theo genre
  - Pagination cursor-based
- [ ] `src/app/(main)/discover/genre/[genre]/page.tsx`

## 4.7 Pagination — Infinite Scroll chuẩn hóa

- [ ] Tạo `src/common/hooks/useInfiniteScroll.ts`:
  - Dùng `react-intersection-observer` detect sentinel element
  - Nhận `fetchNextPage`, `hasMore`, `isFetchingNextPage`
- [ ] Áp dụng cho: Feed, Search results, Genre page, User content listing
- [ ] `src/common/components/InfiniteScrollSentinel.tsx` — element đặt cuối list

## 4.8 Sidebar — Search tích hợp

- [ ] Thêm `SearchBar` vào đầu `Sidebar.tsx` (desktop)
- [ ] Trên mobile: icon kính lúp → mở `SearchBar` dạng modal overlay

---

## Definition of Done
- [ ] Search trả kết quả đúng, có suggestions dropdown
- [ ] Tab filter hoạt động, hiển thị đúng loại nội dung
- [ ] Discover page load trending data, genre pills lọc được
- [ ] Infinite scroll hoạt động mượt trên feed + search
- [ ] `CircularGallery` và `ScrollVelocity` render đúng
