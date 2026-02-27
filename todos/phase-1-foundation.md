# Phase 1 — Foundation: Setup & Auth UI

**Mục tiêu**: Dự án chạy được local, auth hoạt động end-to-end với UI.

**Trạng thái**: ⏳ Pending

**Phụ thuộc API**: Phase 1 — Auth endpoints hoạt động

---

## 1.1 Project Setup

- [ ] Cài dependencies: `pnpm add lucide-react framer-motion @radix-ui/react-dialog @radix-ui/react-tooltip`
- [ ] Cài i18n: `pnpm add next-intl`
- [ ] Thêm màu `hiu-*` vào `tailwind.config.ts` (dark theme)
- [ ] Tạo `src/common/utils/cn.ts` — helper `clsx + twMerge`
- [ ] Cấu hình `.env.local`: `NEXT_PUBLIC_API_URL`, `NEXT_PUBLIC_URL`
- [ ] Cấu hình `next.config.mjs`: `images.domains` cho R2 domain
- [ ] Chạy `pnpm dev` thành công

## 1.2 Đa ngôn ngữ (i18n) — vi / en

- [ ] Cấu hình `next-intl` trong `next.config.mjs`
- [ ] Tạo cấu trúc:
  ```
  src/i18n/
  ├── messages/
  │   ├── vi.json    # Tiếng Việt (mặc định)
  │   └── en.json    # Tiếng Anh
  ├── request.ts
  └── routing.ts     # defineRouting({ locales: ['vi', 'en'], defaultLocale: 'vi' })
  ```
- [ ] Cập nhật app router dùng locale prefix:
  ```
  src/app/[locale]/
  ├── layout.tsx       # NextIntlClientProvider
  ├── (main)/
  └── (auth)/
  ```
- [ ] Tạo `src/middleware.ts` — next-intl middleware xử lý locale redirect
- [ ] Điền strings vào `vi.json` + `en.json` theo nhóm:
  - `auth`: đăng nhập, đăng ký, tên tài khoản, mật khẩu...
  - `nav`: Trang chủ, Khám phá, Thư viện, Hồ sơ, Thông báo
  - `player`: Đang phát, Thêm vào playlist, Yêu thích...
  - `feed`: Đang tải, Không có nội dung, Theo dõi thêm người...
  - `errors`: Lỗi mạng, Không có quyền, Không tìm thấy...
  - `common`: Hủy, Lưu, Xóa, Xác nhận, Tải lên...
- [ ] Component `LanguageSwitcher.tsx` — toggle vi ↔ en:
  - Đặt trong Sidebar (desktop) và Settings page
  - Lưu lựa chọn vào cookie (next-intl tự xử lý qua middleware)
- [ ] Dùng `useTranslations` hook trong tất cả components — không dùng string cứng

## 1.3 Global Layout

- [ ] Cập nhật `src/app/layout.tsx` — font, dark background `bg-hiu-bg`
- [ ] Cập nhật `src/styles/globals.css` — CSS variables dark theme
- [ ] Tạo `src/app/(auth)/layout.tsx` — layout riêng cho trang auth (Aurora background)
- [ ] Tạo `src/app/(main)/layout.tsx` — layout với Sidebar + PlayerBar bottom
- [ ] Cài và tích hợp `Aurora` từ React Bits cho `(auth)/layout.tsx`

## 1.3 Auth — Redux & API

- [ ] Tạo `src/lib/features/authSlice.ts` — state: `user`, `accessToken`, `isAuthenticated`
- [ ] Tạo `src/lib/services/authApi.ts` (RTK Query):
  - `register` mutation — `POST /api/auth/register`
  - `login` mutation — `POST /api/auth/login`
  - `logout` mutation — `DELETE /api/auth/logout`
  - `refreshToken` mutation — `POST /api/auth/refresh`
- [ ] Đăng ký `authApi` vào `store.ts`
- [ ] Tạo `src/lib/services/types/auth.ts` — type `User`, `AuthResponse`, `LoginRequest`, `RegisterRequest`

## 1.4 Auth — Pages & Components

- [ ] Tạo `src/modules/Auth/` module:
  - `src/modules/Auth/LoginPage/page.tsx`
  - `src/modules/Auth/RegisterPage/page.tsx`
  - `src/modules/Auth/VerifyEmailPage/page.tsx`
  - `src/modules/Auth/ForgotPasswordPage/page.tsx`
  - `src/modules/Auth/ResetPasswordPage/page.tsx`
- [ ] Tạo các routes tương ứng trong `src/app/(auth)/`
- [ ] Component `LoginForm.tsx`:
  - Fields: username, password
  - Submit → `login` mutation → lưu token vào Redux + localStorage
  - Xử lý lỗi 403 `email_not_verified` → redirect sang `/verify-email`
- [ ] Component `RegisterForm.tsx`:
  - Fields: username, email, password, displayName
  - Submit → `register` mutation → redirect sang `/verify-email?email=...`
  - Validate client-side (required, email format, password min 8 ký tự)
- [ ] Shared component `AuthInput.tsx` — input có label, error message
- [ ] Shared component `AuthButton.tsx` — button với loading state

## 1.4b OTP — Xác thực email (sau đăng ký)

- [ ] Thêm mutations vào `authApi.ts`:
  - `verifyEmail` mutation — `POST /api/auth/verify-email`
  - `resendOtp` mutation — `POST /api/auth/resend-otp`
- [ ] Thêm vào `src/lib/services/types/auth.ts`: `OtpRequest`, `VerifyOtpRequest`
- [ ] Trang `VerifyEmailPage`:
  - Hiển thị email nhận OTP (lấy từ query param hoặc Redux)
  - Component `OtpInput.tsx` — 6 ô input số, tự động focus ô tiếp theo khi điền, paste tự điền hết
  - Đếm ngược 60s → hiện nút "Gửi lại mã"
  - Submit → `verifyEmail` → redirect vào `(main)` khi thành công
  - Nút "Gửi lại" → `resendOtp` → reset đếm ngược
  - Hiển thị lỗi: mã sai, mã hết hạn

## 1.4c OTP — Quên mật khẩu

- [ ] Thêm mutations vào `authApi.ts`:
  - `forgotPassword` mutation — `POST /api/auth/forgot-password`
  - `verifyResetOtp` mutation — `POST /api/auth/verify-reset-otp` → nhận `resetToken`
  - `resetPassword` mutation — `POST /api/auth/reset-password`
- [ ] Luồng 3 bước — dùng Redux state `forgotPasswordStep: 'email' | 'otp' | 'new-password'`:
  - **Bước 1** `ForgotPasswordPage` — nhập email → `forgotPassword` → chuyển sang bước 2
  - **Bước 2** — nhập OTP 6 số (dùng lại `OtpInput`) → `verifyResetOtp` → lưu `resetToken` vào state → bước 3
  - **Bước 3** — nhập mật khẩu mới + xác nhận → `resetPassword` → redirect `/login` kèm toast thành công
- [ ] Tạo `src/lib/features/forgotPasswordSlice.ts`:
  - State: `step`, `email`, `resetToken`
  - Reset khi hoàn thành hoặc hủy
- [ ] Component `StepIndicator.tsx` — hiển thị bước 1/2/3
- [ ] Nút "Quên mật khẩu?" trong `LoginForm` → link tới `/forgot-password`
- [ ] Xử lý các lỗi: email không tồn tại (API trả 200 chung → không cần xử lý), OTP sai/hết hạn, resetToken hết hạn

## 1.5 Auth — Session Management

- [ ] Tạo `src/lib/Provider/AuthProvider.tsx` — check token khi app load, auto refresh
- [ ] Wrap `(main)/layout.tsx` với `AuthProvider`
- [ ] Route guard: redirect về `/login` nếu chưa auth khi vào `(main)`
- [ ] Tự động attach `Authorization: Bearer <token>` vào RTK Query base query
- [ ] Tạo `src/common/hooks/useAuth.ts` — hook lấy `user`, `isAuthenticated`, `logout`

## 1.6 User Profile — API

- [ ] Tạo `src/lib/services/userApi.ts` (RTK Query):
  - `getMe` query — `GET /api/users/me`
  - `updateMe` mutation — `PUT /api/users/me`
  - `uploadAvatar` mutation — `POST /api/users/me/avatar`
  - `getUserByUsername` query — `GET /api/users/:username`

## 1.7 Shared UI Components

- [ ] `src/common/components/Avatar.tsx` — ảnh avatar + fallback chữ cái
- [ ] `src/common/components/Spinner.tsx` — loading spinner
- [ ] `src/common/components/PageTransition.tsx` — Framer Motion fade in/out
- [ ] `src/common/components/SkeletonCard.tsx` — skeleton loading
- [ ] `src/common/components/EmptyState.tsx` — khi không có dữ liệu

---

## Definition of Done
- [ ] Đăng ký → nhận OTP email → nhập OTP → vào trang chính thành công
- [ ] Đăng nhập khi chưa verify email → hiển thị thông báo + redirect sang verify
- [ ] Quên mật khẩu: nhập email → OTP → mật khẩu mới → đăng nhập được
- [ ] OtpInput: paste hoạt động, tự focus, backspace xóa và lùi ô
- [ ] Token được lưu và tự động refresh khi hết hạn
- [ ] Redirect đúng: chưa auth → `/login`, đã auth + vào `/login` → `/`
- [ ] Dark theme hiển thị đúng trên tất cả trang auth
- [ ] Tất cả strings dùng `useTranslations` (vi/en)
