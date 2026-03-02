'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useVerifyResetOtpMutation, useResetPasswordMutation } from '@/lib/services/authApi';
import DecryptedText from '@/components/ui/DecryptedText';

type Step = 'otp' | 'password';

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: EASE_OUT, delay },
});

const INPUT_CLS =
  'w-full border border-white/[0.08] bg-hiu-elevated px-4 py-3 text-sm text-white placeholder-white/20 outline-none focus:border-hiu-music/50 focus:ring-1 focus:ring-hiu-music/20 transition-all duration-300';

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
      {/* Eyebrow + heading */}
      <motion.div {...fadeUp(0)} className="mb-10">
        <div className="flex items-center gap-3 mb-6">
          <span className="block w-6 h-px bg-hiu-music/50" />
          <span className="text-[10px] font-mono tracking-[0.35em] uppercase text-white/30">
            <DecryptedText
              text="HIU PLATFORM"
              animateOn="view"
              sequential
              revealDirection="start"
              speed={40}
              characters="ABCDEFGHIJKLMNOPQRSTUVWXYZ"
              className="text-white/30"
              encryptedClassName="text-hiu-music/40"
            />
          </span>
          <span className="w-1 h-1 rounded-full bg-hiu-music animate-pulse" />
        </div>

        <h1
          className="font-black uppercase tracking-tight text-white"
          style={{ fontSize: 'clamp(1.75rem, 5vw, 2.5rem)', lineHeight: 1.05 }}
        >
          Đặt lại mật khẩu
        </h1>
        <p className="mt-3 text-[13px] text-white/35">
          {step === 'otp'
            ? <>Nhập mã OTP đã gửi tới <span className="text-white/70">{email || 'email của bạn'}</span></>
            : 'Tạo mật khẩu mới cho tài khoản'}
        </p>

        {/* Step indicator */}
        <div className="flex items-center gap-2 mt-5">
          {(['otp', 'password'] as Step[]).map((s, i) => (
            <React.Fragment key={s}>
              <span
                className={`text-[9px] font-mono tracking-[0.2em] uppercase transition-colors duration-300 ${
                  step === s ? 'text-hiu-music' : i < (['otp', 'password'].indexOf(step)) ? 'text-white/30' : 'text-white/15'
                }`}
              >
                {i === 0 ? '01 / OTP' : '02 / MẬT KHẨU'}
              </span>
              {i === 0 && <span className="flex-1 h-px bg-white/[0.06]" />}
            </React.Fragment>
          ))}
        </div>
      </motion.div>

      {/* Error */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 border border-red-500/20 bg-red-500/[0.07] px-4 py-3 text-[13px] text-red-400 font-mono"
        >
          ✕ {error}
        </motion.div>
      )}

      {/* OTP step */}
      <AnimatePresence mode="wait">
        {step === 'otp' ? (
          <motion.form
            key="otp"
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 16 }}
            transition={{ duration: 0.35, ease: EASE_OUT }}
            onSubmit={handleOtp}
            className="space-y-5"
          >
            <div>
              <label className="mb-2 block text-[11px] tracking-[0.2em] uppercase font-mono text-white/30">
                Mã OTP
              </label>
              <input
                required
                maxLength={6}
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
                className="w-full border border-white/[0.08] bg-hiu-elevated px-4 py-4 text-center text-2xl font-black tracking-[0.6em] text-white placeholder-white/15 outline-none focus:border-hiu-music/50 focus:ring-1 focus:ring-hiu-music/20 transition-all duration-300"
                placeholder="------"
              />
            </div>

            <button
              type="submit"
              disabled={isVerifying || code.length < 6}
              className="group w-full inline-flex items-center justify-center gap-2.5 bg-white text-[#0a0a0f] py-3.5 text-[11px] font-bold tracking-[0.2em] uppercase hover:bg-hiu-music hover:text-white transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {isVerifying ? 'Đang xác thực…' : (
                <>
                  Xác thực mã
                  <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
                </>
              )}
            </button>
          </motion.form>
        ) : (
          <motion.form
            key="password"
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.35, ease: EASE_OUT }}
            onSubmit={handleReset}
            className="space-y-5"
          >
            <div>
              <label className="mb-2 block text-[11px] tracking-[0.2em] uppercase font-mono text-white/30">
                Mật khẩu mới
              </label>
              <input
                type="password"
                required
                minLength={8}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className={INPUT_CLS}
                placeholder="Tối thiểu 8 ký tự"
              />
            </div>

            <div>
              <label className="mb-2 block text-[11px] tracking-[0.2em] uppercase font-mono text-white/30">
                Xác nhận mật khẩu
              </label>
              <input
                type="password"
                required
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                className={INPUT_CLS}
                placeholder="Nhập lại mật khẩu"
              />
            </div>

            <button
              type="submit"
              disabled={isResetting}
              className="group w-full inline-flex items-center justify-center gap-2.5 bg-white text-[#0a0a0f] py-3.5 text-[11px] font-bold tracking-[0.2em] uppercase hover:bg-hiu-music hover:text-white transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {isResetting ? 'Đang đặt lại…' : (
                <>
                  Đặt lại mật khẩu
                  <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
                </>
              )}
            </button>
          </motion.form>
        )}
      </AnimatePresence>

      {/* Footer */}
      <motion.div {...fadeUp(0.25)} className="mt-8 pt-8 border-t border-white/[0.06] flex justify-center">
        <Link
          href="/login"
          className="text-[10px] font-mono tracking-[0.25em] uppercase text-white/15 hover:text-white/40 transition-colors duration-300"
        >
          ← Quay lại đăng nhập
        </Link>
      </motion.div>
    </>
  );
};

export default ResetPasswordPage;
