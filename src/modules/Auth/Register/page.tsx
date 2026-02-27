'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useRegisterMutation } from '@/lib/services/authApi';

const RegisterPage = () => {
  const router = useRouter();
  const [register, { isLoading }] = useRegisterMutation();

  const [form, setForm] = useState({ username: '', displayName: '', email: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const result = await register(form).unwrap();
      // Redirect to verify-email with email param
      router.push(`/verify-email?email=${encodeURIComponent(result.email)}`);
    } catch (err: any) {
      setError(err?.data?.error ?? err?.message ?? 'Đăng ký thất bại');
    }
  };

  return (
    <>
      <div className="mb-8 text-center">
        <span className="text-[10px] font-mono tracking-[0.35em] uppercase text-hiu-muted">✦ HIU PLATFORM ✦</span>
        <h1 className="mt-3 text-2xl font-black uppercase tracking-tight text-hiu-primary">Tạo tài khoản</h1>
        <p className="mt-2 text-sm text-hiu-secondary">
          Đã có tài khoản?{' '}
          <Link href="/login" className="text-hiu-music hover:text-hiu-primary transition-colors">
            Đăng nhập
          </Link>
        </p>
      </div>

      {error && (
        <div className="mb-5 border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="mb-1.5 block text-[11px] tracking-[0.15em] uppercase font-mono text-hiu-muted">Username</label>
            <input
              required
              value={form.username}
              onChange={(e) => setForm((f) => ({ ...f, username: e.target.value }))}
              className="w-full border border-hiu-border bg-hiu-elevated px-4 py-3 text-sm text-hiu-primary placeholder-hiu-muted outline-none focus:border-hiu-music/50 focus:ring-1 focus:ring-hiu-music/30 transition-colors"
              placeholder="username"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-[11px] tracking-[0.15em] uppercase font-mono text-hiu-muted">Tên hiển thị</label>
            <input
              value={form.displayName}
              onChange={(e) => setForm((f) => ({ ...f, displayName: e.target.value }))}
              className="w-full border border-hiu-border bg-hiu-elevated px-4 py-3 text-sm text-hiu-primary placeholder-hiu-muted outline-none focus:border-hiu-music/50 focus:ring-1 focus:ring-hiu-music/30 transition-colors"
              placeholder="Tên của bạn"
            />
          </div>
        </div>

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
            minLength={8}
            value={form.password}
            onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
            className="w-full border border-hiu-border bg-hiu-elevated px-4 py-3 text-sm text-hiu-primary placeholder-hiu-muted outline-none focus:border-hiu-music/50 focus:ring-1 focus:ring-hiu-music/30 transition-colors"
            placeholder="Tối thiểu 8 ký tự"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-hiu-music py-3 text-[11px] font-bold tracking-[0.2em] uppercase text-white hover:bg-hiu-music-dim transition-colors disabled:opacity-40 disabled:cursor-not-allowed mt-2"
        >
          {isLoading ? 'Đang tạo tài khoản…' : 'Tạo tài khoản →'}
        </button>
      </form>
    </>
  );
};

export default RegisterPage;
