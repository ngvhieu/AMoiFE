'use client';

import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useVerifyEmailMutation, useResendOtpMutation } from '@/lib/services/authApi';

const VerifyEmailPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email') ?? '';

  const [verify, { isLoading }] = useVerifyEmailMutation();
  const [resend, { isLoading: isResending }] = useResendOtpMutation();

  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await verify({ email, code }).unwrap();
      router.push('/login?verified=1');
    } catch (err: any) {
      setError(err?.data?.error ?? err?.message ?? 'Mã xác thực không đúng');
    }
  };

  const handleResend = async () => {
    setError('');
    setSuccess('');
    try {
      await resend({ email, type: 'verify' }).unwrap();
      setSuccess('Đã gửi lại mã OTP. Kiểm tra email của bạn.');
    } catch (err: any) {
      setError(err?.data?.error ?? 'Không thể gửi lại mã');
    }
  };

  return (
    <>
      <h1 className="mb-2 text-center text-2xl font-bold text-white">Xác thực email</h1>
      <p className="mb-6 text-center text-sm text-default-neutral">
        Nhập mã 6 chữ số đã gửi tới{' '}
        <span className="font-medium text-white">{email || 'email của bạn'}</span>
      </p>

      {error && (
        <div className="mb-4 rounded-lg bg-default-error/10 px-4 py-3 text-sm text-default-error">
          {error}
        </div>
      )}
      {success && (
        <div className="mb-4 rounded-lg bg-default-success/10 px-4 py-3 text-sm text-default-success">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-1 block text-sm text-default-neutral">Mã xác thực</label>
          <input
            required
            maxLength={6}
            value={code}
            onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
            className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-center text-xl tracking-[0.5em] text-white placeholder-white/30 outline-none focus:border-default-primary focus:ring-1 focus:ring-default-primary"
            placeholder="──────"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading || code.length < 6}
          className="w-full rounded-lg bg-default-primary py-2.5 font-semibold text-white transition hover:bg-default-primary-60 disabled:opacity-50"
        >
          {isLoading ? 'Đang xác thực…' : 'Xác thực'}
        </button>
      </form>

      <p className="mt-4 text-center text-sm text-default-neutral">
        Không nhận được mã?{' '}
        <button
          onClick={handleResend}
          disabled={isResending}
          className="text-default-primary hover:underline disabled:opacity-50"
        >
          {isResending ? 'Đang gửi…' : 'Gửi lại'}
        </button>
      </p>
    </>
  );
};

export default VerifyEmailPage;
