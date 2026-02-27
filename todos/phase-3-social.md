# Phase 3 — Social Features UI

**Mục tiêu**: Like, comment, follow, feed cá nhân hóa hoạt động trên UI.

**Trạng thái**: ⏳ Pending

**Phụ thuộc API**: Phase 3 — Likes, Comments, Follows, Feed, Notifications

---

## 3.1 Cài thêm thư viện

- [ ] Cài React Bits components:
  ```bash
  npx shadcn@latest add https://reactbits.dev/r/ClickSpark-TS-TW
  npx shadcn@latest add https://reactbits.dev/r/AnimatedList-TS-TW
  npx shadcn@latest add https://reactbits.dev/r/ProfileCard-TS-TW
  npx shadcn@latest add https://reactbits.dev/r/Dock-TS-TW
  npx shadcn@latest add https://reactbits.dev/r/Threads-TS-TW
  npx shadcn@latest add https://reactbits.dev/r/FlyingPosters-TS-TW
  ```

## 3.2 RTK Query — Social API

- [ ] Tạo `src/lib/services/socialApi.ts`:
  - `likeTrack` mutation — `POST /api/tracks/:id/like`
  - `likePhoto` mutation — `POST /api/photos/:id/like`
  - `followUser` mutation — `POST /api/users/:username/follow`
  - `getFollowers` query — `GET /api/users/:username/followers`
  - `getFollowing` query — `GET /api/users/:username/following`
  - `getMyLikes` query — `GET /api/users/me/likes`
- [ ] Tạo `src/lib/services/feedApi.ts`:
  - `getFeed` query — `GET /api/feed` (tracks + photos từ following)
- [ ] Tạo `src/lib/services/notificationsApi.ts`:
  - `getNotifications` query — `GET /api/notifications`
  - `readAllNotifications` mutation — `PUT /api/notifications/read-all`
  - `deleteNotification` mutation — `DELETE /api/notifications/:id`
- [ ] Tạo `src/lib/services/commentsApi.ts`:
  - `deleteComment` mutation — `DELETE /api/comments/:id`

## 3.3 Like Button Component

- [ ] `src/common/components/LikeButton.tsx`:
  - Wrap bằng `ClickSpark` (màu `#f43f5e`)
  - Icon Heart: fill khi đã like
  - Optimistic update: toggle ngay trên UI trước khi API trả về
  - Hiển thị số lượt like
  - Variants: `sm` (card) / `lg` (detail page)

## 3.4 Comment Components

- [ ] `src/common/components/CommentSection.tsx`:
  - Danh sách comments dùng `AnimatedList`
  - Input + nút gửi comment mới
  - Skeleton khi loading
- [ ] `src/common/components/CommentItem.tsx`:
  - Avatar, username, nội dung, thời gian
  - Nút xóa nếu là owner
- [ ] Thêm `CommentSection` vào trang chi tiết Track và Photo

## 3.5 Follow Button Component

- [ ] `src/common/components/FollowButton.tsx`:
  - Text "Follow" / "Đang follow" khi toggle
  - Optimistic update
  - Không hiển thị khi xem profile bản thân

## 3.6 Feed Page

- [ ] `src/modules/Feed/page.tsx` — home feed:
  - Background `Threads` từ React Bits (subtle)
  - FeedItem: mixed tracks + photos theo thời gian
  - Infinite scroll dùng `react-intersection-observer`
  - Virtual scroll dùng `react-virtuoso` cho list dài
- [ ] `src/modules/Feed/components/FeedItem.tsx` — wrapper chọn render Track hay Photo
- [ ] `src/modules/Feed/components/TrackFeedPost.tsx`:
  - Header: avatar + username + thời gian đăng
  - Album art + thông tin bài
  - Nút Play inline → dispatch vào playerSlice
  - LikeButton + nút comment + nút share
- [ ] `src/modules/Feed/components/PhotoFeedPost.tsx`:
  - Header: avatar + username + thời gian
  - Ảnh full-width (click → lightbox)
  - Caption, LikeButton, nút comment
- [ ] `src/modules/Feed/components/StoryRow.tsx` — hàng stories user đang follow (avatar tròn)
- [ ] `src/app/(main)/page.tsx` — render `Feed` module

## 3.7 Profile Page

- [ ] `src/modules/Profile/page.tsx`:
  - Header: avatar lớn, displayName, bio, stats (tracks, followers, following)
  - `FollowButton` nếu không phải bản thân
  - Tab: Tracks / Photos / Albums / Playlists
  - Content theo tab tương ứng
- [ ] `src/modules/Profile/components/ProfileHeader.tsx` — dùng `ProfileCard` từ React Bits
- [ ] `src/modules/Profile/components/UserStats.tsx` — số tracks, followers, following (CountUp)
- [ ] `src/modules/Profile/components/UserTracks.tsx`
- [ ] `src/modules/Profile/components/UserPhotos.tsx` — Masonry grid
- [ ] `src/app/(main)/profile/[username]/page.tsx`

## 3.8 Edit Profile Page

- [ ] `src/modules/Profile/EditProfile/page.tsx`:
  - Upload avatar (preview + crop đơn giản)
  - Fields: displayName, bio
  - Submit → `updateMe` mutation
- [ ] `src/app/(main)/settings/page.tsx`

## 3.9 Notifications

- [ ] `src/modules/Notifications/page.tsx`:
  - Danh sách notifications (AnimatedList)
  - Icon theo loại: like ❤️, comment 💬, follow 👤
  - Đánh dấu đã đọc khi mở trang
  - Badge số chưa đọc trên icon notification ở Sidebar
- [ ] `src/app/(main)/notifications/page.tsx`

## 3.10 Navigation

- [ ] `src/common/components/Sidebar.tsx` — desktop left sidebar:
  - Logo Hiu
  - Links: Feed, Discover, Library, Profile, Notifications (badge)
  - Mini player info ở bottom sidebar
- [ ] `src/common/components/MobileNav.tsx` — mobile bottom nav dùng `Dock` từ React Bits:
  - Icons: Home, Search, Upload, Library, Profile
- [ ] Responsive: sidebar hiện trên `lg`, Dock hiện trên mobile

---

## Definition of Done
- [ ] Feed hiển thị mix tracks + photos từ following
- [ ] Like/unlike hoạt động với optimistic update
- [ ] Comment thêm/xóa hoạt động
- [ ] Follow/unfollow user hoạt động, số liệu cập nhật
- [ ] Profile page hiển thị đúng content theo tab
- [ ] Notifications hiển thị và đánh dấu đọc
