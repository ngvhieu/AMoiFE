'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForgotPasswordMutation } from '@/lib/services/authApi';

const ForgotPasswordPage = () => {
  const router = useRouter();
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await forgotPassword({ email }).unwrap();
      router.push(`/reset-password?email=${encodeURIComponent(email)}`);
    } catch (err: any) {
      setError(err?.data?.error ?? err?.message ?? 'Không tìm thấy email');
    }
  };

  return (
    <>
      <h1 className="mb-2 text-center text-2xl font-bold text-white">Quên mật khẩu</h1>
      <p className="mb-6 text-center text-sm text-default-neutral">
        Nhập email để nhận mã OTP đặt lại mật khẩu
      </p>

      {error && (
        <div className="mb-4 rounded-lg bg-default-error/10 px-4 py-3 text-sm text-default-error">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-1 block text-sm text-default-neutral">Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-white placeholder-white/30 outline-none focus:border-default-primary focus:ring-1 focus:ring-default-primary"
            placeholder="you@example.com"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full rounded-lg bg-default-primary py-2.5 font-semibold text-white transition hover:bg-default-primary-60 disabled:opacity-50"
        >
          {isLoading ? 'Đang gửi…' : 'Gửi mã OTP'}
        </button>
      </form>

      <p className="mt-4 text-center text-sm text-default-neutral">
        <Link href="/login" className="text-default-primary hover:underline">
          ← Quay lại đăng nhập
        </Link>
      </p>
    </>
  );
};

export default ForgotPasswordPage;
