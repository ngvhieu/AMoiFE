// ─── Entities ────────────────────────────────────────────────────────────────

export interface AuthUser {
  id: number;
  username: string;
  displayName: string;
  email: string;
  avatarUrl?: string;
  isVerified: boolean;
  role: string;
}

// ─── Redux State ─────────────────────────────────────────────────────────────

export interface AuthState {
  user: AuthUser | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
}

// ─── Request Types ────────────────────────────────────────────────────────────

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  displayName?: string;
}

export interface VerifyEmailRequest {
  email: string;
  code: string;
}

export interface ResendOtpRequest {
  email: string;
  type: 'verify' | 'reset';
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface VerifyResetOtpRequest {
  email: string;
  code: string;
}

export interface ResetPasswordRequest {
  resetToken: string;
  newPassword: string;
}

export interface RefreshRequest {
  refreshToken: string;
}

// ─── Response Types ───────────────────────────────────────────────────────────

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: AuthUser;
}

export interface RegisterResponse {
  message: string;
  email: string;
}

export interface MessageResponse {
  message: string;
}

export interface VerifyResetOtpResponse {
  resetToken: string;
}
