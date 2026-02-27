'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useVerifyResetOtpMutation, useResetPasswordMutation } from '@/lib/services/authApi';

type Step = 'otp' | 'password';

const ResetPasswordPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email') ?? '';

  const [verifyOtp, { isLoading: isVerifying }] = useVerifyResetOtpMutation();
  const [resetPassword, { isLoading: isResetting }] = useResetPasswordMutation();

  const [step, setStep] = useState<Step>('otp');
  const [code, setCode] = useState('');
  const [resetToken, setResetToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');

  const handleOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const result = await verifyOtp({ email, code }).unwrap();
      setResetToken(result.resetToken);
      setStep('password');
    } catch (err: any) {
      setError(err?.data?.error ?? 'Mã OTP không đúng hoặc đã hết hạn');
    }
  };

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (newPassword !== confirm) {
      setError('Mật khẩu xác nhận không khớp');
      return;
    }
    try {
      await resetPassword({ resetToken, newPassword }).unwrap();
      router.push('/login?reset=1');
    } catch (err: any) {
      setError(err?.data?.error ?? 'Đặt lại mật khẩu thất bại');
    }
  };

  return (
    <>
      <h1 className="mb-2 text-center text-2xl font-bold text-white">Đặt lại mật khẩu</h1>
      <p className="mb-6 text-center text-sm text-default-neutral">
        {step === 'otp'
          ? `Nhập mã OTP đã gửi tới ${email || 'email của bạn'}`
          : 'Tạo mật khẩu mới cho tài khoản'}
      </p>

      {error && (
        <div className="mb-4 rounded-lg bg-default-error/10 px-4 py-3 text-sm text-default-error">
          {error}
        </div>
      )}

      {step === 'otp' ? (
        <form onSubmit={handleOtp} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm text-default-neutral">Mã OTP</label>
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
            disabled={isVerifying || code.length < 6}
            className="w-full rounded-lg bg-default-primary py-2.5 font-semibold text-white transition hover:bg-default-primary-60 disabled:opacity-50"
          >
            {isVerifying ? 'Đang xác thực…' : 'Xác thực mã'}
          </button>
        </form>
      ) : (
        <form onSubmit={handleReset} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm text-default-neutral">Mật khẩu mới</label>
            <input
              type="password"
              required
              minLength={8}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-white placeholder-white/30 outline-none focus:border-default-primary focus:ring-1 focus:ring-default-primary"
              placeholder="Tối thiểu 8 ký tự"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm text-default-neutral">Xác nhận mật khẩu</label>
            <input
              type="password"
              required
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-white placeholder-white/30 outline-none focus:border-default-primary focus:ring-1 focus:ring-default-primary"
              placeholder="Nhập lại mật khẩu"
            />
          </div>
          <button
            type="submit"
            disabled={isResetting}
            className="w-full rounded-lg bg-default-primary py-2.5 font-semibold text-white transition hover:bg-default-primary-60 disabled:opacity-50"
          >
            {isResetting ? 'Đang đặt lại…' : 'Đặt lại mật khẩu'}
          </button>
        </form>
      )}

      <p className="mt-4 text-center text-sm text-default-neutral">
        <Link href="/login" className="text-default-primary hover:underline">
          ← Quay lại đăng nhập
        </Link>
      </p>
    </>
  );
};

export default ResetPasswordPage;
