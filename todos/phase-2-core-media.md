# Phase 2 — Core Media: Player & Gallery UI

**Mục tiêu**: Nghe nhạc, xem ảnh, upload media hoạt động đầy đủ trên UI.

**Trạng thái**: ⏳ Pending

**Phụ thuộc API**: Phase 2 — Tracks, Photos, Albums, Playlists endpoints

---

## 2.1 Cài thêm thư viện

- [ ] `pnpm add @radix-ui/react-slider @radix-ui/react-progress use-sound`
- [ ] `pnpm add react-intersection-observer react-virtuoso`
- [ ] `pnpm add @radix-ui/react-select @radix-ui/react-dropdown-menu`
- [ ] Cài React Bits components:
  ```bash
  npx shadcn@latest add https://reactbits.dev/r/GlassSurface-TS-TW
  npx shadcn@latest add https://reactbits.dev/r/SpotlightCard-TS-TW
  npx shadcn@latest add https://reactbits.dev/r/Masonry-TS-TW
  npx shadcn@latest add https://reactbits.dev/r/TiltedCard-TS-TW
  npx shadcn@latest add https://reactbits.dev/r/FadeContent-TS-TW
  npx shadcn@latest add https://reactbits.dev/r/AnimatedList-TS-TW
  npx shadcn@latest add https://reactbits.dev/r/ScrollStack-TS-TW
  npx shadcn@latest add https://reactbits.dev/r/ClickSpark-TS-TW
  npx shadcn@latest add https://reactbits.dev/r/GlareHover-TS-TW
  ```

## 2.2 RTK Query — Tracks API

- [ ] Tạo `src/lib/services/tracksApi.ts`:
  - `getTracks` query — `GET /api/tracks` (pagination, sort)
  - `getTrack` query — `GET /api/tracks/:id`
  - `uploadTrack` mutation — `POST /api/tracks` (FormData)
  - `updateTrack` mutation — `PUT /api/tracks/:id`
  - `deleteTrack` mutation — `DELETE /api/tracks/:id`
  - `getTrackComments` query — `GET /api/tracks/:id/comments`
  - `addTrackComment` mutation — `POST /api/tracks/:id/comments`
- [ ] Tạo `src/lib/services/types/track.ts` — type `Track`, `TrackComment`

## 2.3 RTK Query — Photos API

- [ ] Tạo `src/lib/services/photosApi.ts`:
  - `getPhotos` query — `GET /api/photos`
  - `getPhoto` query — `GET /api/photos/:id`
  - `uploadPhoto` mutation — `POST /api/photos` (FormData)
  - `updatePhoto` mutation — `PUT /api/photos/:id`
  - `deletePhoto` mutation — `DELETE /api/photos/:id`
  - `getPhotoComments` query — `GET /api/photos/:id/comments`
  - `addPhotoComment` mutation — `POST /api/photos/:id/comments`
- [ ] Tạo `src/lib/services/types/photo.ts` — type `Photo`, `PhotoComment`

## 2.4 RTK Query — Albums & Playlists API

- [ ] Tạo `src/lib/services/albumsApi.ts`:
  - `getAlbums`, `getAlbum`, `createAlbum`, `updateAlbum`, `deleteAlbum`
  - `addTrackToAlbum`, `uploadAlbumCover`
- [ ] Tạo `src/lib/services/playlistsApi.ts`:
  - `getPlaylists`, `getPlaylist`, `createPlaylist`, `updatePlaylist`, `deletePlaylist`
  - `addTrackToPlaylist`, `removeTrackFromPlaylist`

## 2.5 Global Audio Player — Redux

- [ ] Tạo `src/lib/features/playerSlice.ts`:
  - State: `currentTrack`, `queue`, `isPlaying`, `currentTime`, `duration`, `volume`, `isMuted`, `isFullscreen`
  - Actions: `setTrack`, `play`, `pause`, `toggle`, `setVolume`, `seek`, `nextTrack`, `prevTrack`, `addToQueue`, `clearQueue`
- [ ] Tạo `src/common/hooks/usePlayer.ts` — hook dùng playerSlice

## 2.6 Player UI Components

- [ ] `src/modules/Player/components/PlayerBar.tsx` — fixed bottom bar (GlassSurface):
  - Hiển thị ảnh bìa, tên bài, tên nghệ sĩ
  - Nút Play/Pause, Previous, Next
  - Progress slider (Radix)
  - Volume slider
  - Nút mở fullscreen player
- [ ] `src/modules/Player/components/FullscreenPlayer.tsx` — Modal toàn màn hình:
  - Album art lớn với `GlareHover`
  - Controls đầy đủ + lyrics placeholder
  - Background blur từ màu album art
- [ ] `src/modules/Player/components/TrackInfo.tsx`
- [ ] `src/modules/Player/components/PlayerControls.tsx`
- [ ] `src/modules/Player/components/ProgressSlider.tsx`
- [ ] `src/modules/Player/components/VolumeControl.tsx`
- [ ] `src/modules/Player/components/QueuePanel.tsx` — danh sách queue (AnimatedList)
- [ ] Đặt `PlayerBar` trong `(main)/layout.tsx`, thêm `pb-20` cho content

## 2.7 Track Components

- [ ] `src/common/components/TrackCard.tsx` — SpotlightCard:
  - Ảnh bìa, tên bài, nghệ sĩ, thời lượng, số plays
  - Nút Play → dispatch `setTrack` vào playerSlice
  - Menu dropdown: thêm vào playlist, xóa (nếu owner)
- [ ] `src/common/components/TrackListItem.tsx` — dạng list row
- [ ] `src/common/components/TrackUploadForm.tsx`:
  - Upload file audio (drag & drop)
  - Fields: title, artist, genre, isPublic
  - Progress bar upload
- [ ] `src/modules/Discover/components/TrackGrid.tsx` — grid 4 cột responsive

## 2.8 Photo Components

- [ ] `src/common/components/PhotoCard.tsx` — card trong grid
- [ ] `src/common/components/PhotoLightbox.tsx` — Dialog lightbox:
  - Ảnh full + caption + user info
  - Framer Motion scale animation
  - Điều hướng previous/next
- [ ] `src/common/components/PhotoUploadForm.tsx`:
  - Preview ảnh trước upload
  - Fields: caption, location, isPublic
- [ ] `src/modules/Discover/components/PhotoMasonry.tsx` — `Masonry` từ React Bits

## 2.9 Album & Playlist Components

- [ ] `src/common/components/AlbumCard.tsx` — TiltedCard với ảnh bìa
- [ ] `src/modules/Library/components/AlbumDetail.tsx` — danh sách tracks trong album
- [ ] `src/common/components/PlaylistCard.tsx`
- [ ] `src/modules/Library/components/PlaylistDetail.tsx` — danh sách tracks trong playlist

## 2.10 Pages

- [ ] `src/modules/Discover/page.tsx` — trang khám phá:
  - Tracks mới nhất (ScrollStack)
  - Photos mới nhất (Masonry)
- [ ] `src/app/(main)/page.tsx` — redirect hoặc home feed tạm
- [ ] `src/app/(main)/discover/page.tsx`
- [ ] `src/modules/Library/page.tsx` — thư viện cá nhân:
  - Tab: Playlists / Albums / Liked
- [ ] `src/app/(main)/library/page.tsx`

---

## Definition of Done
- [ ] Upload nhạc → hiển thị trong danh sách → click Play → nghe được
- [ ] Upload ảnh → hiển thị trong Masonry grid → click → mở lightbox
- [ ] Player bar cố định bottom, điều khiển hoạt động đầy đủ
- [ ] Tạo và xem album, playlist hoạt động
