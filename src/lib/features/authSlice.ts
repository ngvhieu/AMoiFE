'use client';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { AuthState, AuthUser, LoginResponse } from '@/common/types/auth';
import type { RootState } from '../store';

const COOKIE_NAME = 'hiu_access_token';

function setCookie(name: string, value: string, days = 1) {
  if (typeof document === 'undefined') return;
  const expires = new Date(Date.now() + days * 86_400_000).toUTCString();
  document.cookie = `${name}=${value}; path=/; expires=${expires}; SameSite=Lax`;
}

function clearCookie(name: string) {
  if (typeof document === 'undefined') return;
  document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
}

function loadFromStorage(): Partial<AuthState> {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem('hiu_auth');
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveToStorage(state: AuthState) {
  if (typeof window === 'undefined') return;
  localStorage.setItem('hiu_auth', JSON.stringify({
    user: state.user,
    accessToken: state.accessToken,
    refreshToken: state.refreshToken,
  }));
}

function clearStorage() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('hiu_auth');
}

const persisted = loadFromStorage();

const initialState: AuthState = {
  user: persisted.user ?? null,
  accessToken: persisted.accessToken ?? null,
  refreshToken: persisted.refreshToken ?? null,
  isAuthenticated: !!persisted.accessToken,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials(state, action: PayloadAction<LoginResponse>) {
      const { user, accessToken, refreshToken } = action.payload;
      state.user = user;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
      state.isAuthenticated = true;
      saveToStorage(state as AuthState);
      setCookie(COOKIE_NAME, accessToken);
    },
    updateAccessToken(state, action: PayloadAction<string>) {
      state.accessToken = action.payload;
      saveToStorage(state as AuthState);
      setCookie(COOKIE_NAME, action.payload);
    },
    updateUser(state, action: PayloadAction<AuthUser>) {
      state.user = action.payload;
      saveToStorage(state as AuthState);
    },
    logout(state) {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
      clearStorage();
      clearCookie(COOKIE_NAME);
    },
  },
});

export const { setCredentials, updateAccessToken, updateUser, logout } = authSlice.actions;
export default authSlice.reducer;

// ─── Selectors ────────────────────────────────────────────────────────────────
export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectAccessToken = (state: RootState) => state.auth.accessToken;
export const selectRefreshToken = (state: RootState) => state.auth.refreshToken;
export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;
