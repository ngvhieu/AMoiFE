# Phase 5 — Admin Dashboard UI

**Mục tiêu**: Giao diện quản lý nội dung, user, và hệ thống cho admin.

**Trạng thái**: ⏳ Pending

**Phụ thuộc API**: Phase 5 — Admin endpoints, Reports, Stats

---

## 5.1 Cài thêm thư viện

- [ ] `pnpm add @radix-ui/react-tabs @radix-ui/react-alert-dialog`
- [ ] Cài React Bits components:
  ```bash
  npx shadcn@latest add https://reactbits.dev/r/MagicBento-TS-TW
  npx shadcn@latest add https://reactbits.dev/r/CountUp-TS-TW
  npx shadcn@latest add https://reactbits.dev/r/AnimatedList-TS-TW
  ```

## 5.2 RTK Query — Admin API

- [ ] Tạo `src/lib/services/adminApi.ts`:
  - `getAdminUsers` query — `GET /api/admin/users`
  - `getAdminUser` query — `GET /api/admin/users/:id`
  - `updateAdminUser` mutation — `PUT /api/admin/users/:id`
  - `deleteAdminUser` mutation — `DELETE /api/admin/users/:id`
  - `getAdminTracks` query — `GET /api/admin/tracks`
  - `deleteAdminTrack` mutation — `DELETE /api/admin/tracks/:id`
  - `getAdminPhotos` query — `GET /api/admin/photos`
  - `deleteAdminPhoto` mutation — `DELETE /api/admin/photos/:id`
  - `getAdminComments` query — `GET /api/admin/comments`
  - `deleteAdminComment` mutation — `DELETE /api/admin/comments/:id`
  - `getAdminReports` query — `GET /api/admin/reports`
  - `updateAdminReport` mutation — `PUT /api/admin/reports/:id`
  - `getAdminStats` query — `GET /api/admin/stats`

## 5.3 Admin Layout

- [ ] `src/app/(admin)/layout.tsx` — layout riêng:
  - Sidebar admin: Dashboard, Users, Tracks, Photos, Comments, Reports
  - Chỉ render nếu `user.isAdmin === true`, ngược lại redirect `/`
  - Background tối hơn, accent màu đỏ/cam thay vì tím
- [ ] `src/app/(admin)/page.tsx` — redirect sang `/admin/dashboard`

## 5.4 Dashboard Stats

- [ ] `src/modules/Admin/Dashboard/page.tsx`:
  - **Bento grid** (`MagicBento`) với các stat cards:
    - Tổng users (CountUp animation)
    - Users mới hôm nay / 7 ngày
    - Tổng tracks, tổng photos
    - Tổng comments, tổng likes
    - Storage đã dùng (R2)
  - **Top 10 tracks** — bảng với plays count
  - **Top 10 users** — bảng với followers count
- [ ] `src/modules/Admin/Dashboard/components/StatCard.tsx` — card với icon + số + label
- [ ] `src/modules/Admin/Dashboard/components/TopContentTable.tsx`
- [ ] `src/app/(admin)/dashboard/page.tsx`

## 5.5 User Management

- [ ] `src/modules/Admin/Users/page.tsx`:
  - Bảng users: avatar, username, email, ngày tạo, số tracks/photos, isAdmin
  - Filter: search theo username/email
  - Nút: Suspend / Cấp admin / Xóa (với confirm dialog)
- [ ] `src/modules/Admin/Users/components/UserTable.tsx`
- [ ] `src/modules/Admin/Users/components/UserActions.tsx` — dropdown actions
- [ ] `src/modules/Admin/Users/UserDetail/page.tsx` — chi tiết user + content của họ
- [ ] `src/app/(admin)/users/page.tsx`
- [ ] `src/app/(admin)/users/[id]/page.tsx`

## 5.6 Content Moderation

- [ ] `src/modules/Admin/Tracks/page.tsx`:
  - Bảng tracks: title, artist, uploader, ngày upload, plays, isPublic
  - Filter: theo user, genre, isPublic
  - Nút xóa với confirm dialog
- [ ] `src/modules/Admin/Photos/page.tsx`:
  - Grid ảnh với overlay thông tin
  - Nút xóa từng ảnh
- [ ] `src/modules/Admin/Comments/page.tsx`:
  - Danh sách comments với nội dung, tác giả, target (track/photo)
  - Nút xóa comment vi phạm
- [ ] `src/app/(admin)/tracks/page.tsx`
- [ ] `src/app/(admin)/photos/page.tsx`
- [ ] `src/app/(admin)/comments/page.tsx`

## 5.7 Reports

- [ ] `src/modules/Admin/Reports/page.tsx`:
  - Tab: Pending / Reviewed / Dismissed
  - Mỗi report: loại (track/photo/comment), người báo cáo, lý do, ngày
  - Nút: Dismiss (bỏ qua) / Remove Content (xóa nội dung vi phạm)
  - Badge số pending reports trên sidebar
- [ ] `src/modules/Admin/Reports/components/ReportItem.tsx`
- [ ] `src/app/(admin)/reports/page.tsx`

## 5.8 Shared Admin Components

- [ ] `src/common/components/ConfirmDialog.tsx` — Radix AlertDialog xác nhận trước khi xóa
- [ ] `src/common/components/DataTable.tsx` — bảng có sort, filter, pagination
- [ ] `src/common/components/Badge.tsx` — badge status (pending, active, suspended)
- [ ] `src/common/components/AdminSidebar.tsx`

---

## Definition of Done
- [ ] Chỉ admin (`isAdmin: true`) mới vào được `/admin/*`
- [ ] Stats dashboard hiển thị đúng số liệu
- [ ] Xóa user/track/photo từ admin hoạt động
- [ ] Report flow: xem → dismiss hoặc remove content hoạt động
