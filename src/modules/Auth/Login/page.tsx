'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { useLoginMutation } from '@/lib/services/authApi';
import { setCredentials } from '@/lib/features/authSlice';
import type { AppDispatch } from '@/lib/store';

const LoginPage = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [login, { isLoading }] = useLoginMutation();

  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const result = await login(form).unwrap();
      dispatch(setCredentials(result));
      router.push('/');
    } catch (err: any) {
      setError(err?.data?.error ?? err?.message ?? 'Đăng nhập thất bại');
    }
  };

  return (
    <>
      <div className="mb-8 text-center">
        <span className="text-[10px] font-mono tracking-[0.35em] uppercase text-hiu-muted">✦ HIU PLATFORM ✦</span>
        <h1 className="mt-3 text-2xl font-black uppercase tracking-tight text-hiu-primary">Đăng nhập</h1>
        <p className="mt-2 text-sm text-hiu-secondary">
          Chưa có tài khoản?{' '}
          <Link href="/register" className="text-hiu-music hover:text-hiu-primary transition-colors">
            Đăng ký
          </Link>
        </p>
      </div>

      {error && (
        <div className="mb-5 border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-1.5 block text-[11px] tracking-[0.15em] uppercase font-mono text-hiu-muted">Email</label>
          <input
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            className="w-full border border-hiu-border bg-hiu-elevated px-4 py-3 text-sm text-hiu-primary placeholder-hiu-muted outline-none focus:border-hiu-music/50 focus:ring-1 focus:ring-hiu-music/30 transition-colors"
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-[11px] tracking-[0.15em] uppercase font-mono text-hiu-muted">Mật khẩu</label>
          <input
            type="password"
            required
            value={form.password}
            onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
            className="w-full border border-hiu-border bg-hiu-elevated px-4 py-3 text-sm text-hiu-primary placeholder-hiu-muted outline-none focus:border-hiu-music/50 focus:ring-1 focus:ring-hiu-music/30 transition-colors"
            placeholder="••••••••"
          />
        </div>

        <div className="text-right">
          <Link href="/forgot-password" className="text-[11px] tracking-widest uppercase text-hiu-muted hover:text-hiu-music transition-colors">
            Quên mật khẩu?
          </Link>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-hiu-music py-3 text-[11px] font-bold tracking-[0.2em] uppercase text-white hover:bg-hiu-music-dim transition-colors disabled:opacity-40 disabled:cursor-not-allowed mt-2"
        >
          {isLoading ? 'Đang đăng nhập…' : 'Đăng nhập →'}
        </button>
      </form>
    </>
  );
};

export default LoginPage;
