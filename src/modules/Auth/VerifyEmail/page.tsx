'use client';

import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useVerifyEmailMutation, useResendOtpMutation } from '@/lib/services/authApi';
import DecryptedText from '@/components/ui/DecryptedText';

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: EASE_OUT, delay },
});

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
          Xác thực email
        </h1>
        <p className="mt-3 text-[13px] text-white/35">
          Nhập mã 6 chữ số đã gửi tới{' '}
          <span className="text-white/70">{email || 'email của bạn'}</span>
        </p>
      </motion.div>

      {/* Alerts */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 border border-red-500/20 bg-red-500/[0.07] px-4 py-3 text-[13px] text-red-400 font-mono"
        >
          ✕ {error}
        </motion.div>
      )}
      {success && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 border border-hiu-success/20 bg-hiu-success/[0.07] px-4 py-3 text-[13px] text-hiu-success font-mono"
        >
          ✓ {success}
        </motion.div>
      )}

      {/* OTP form */}
      <motion.form {...fadeUp(0.1)} onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="mb-2 block text-[11px] tracking-[0.2em] uppercase font-mono text-white/30">
            Mã xác thực
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
          disabled={isLoading || code.length < 6}
          className="group w-full inline-flex items-center justify-center gap-2.5 bg-white text-[#0a0a0f] py-3.5 text-[11px] font-bold tracking-[0.2em] uppercase hover:bg-hiu-music hover:text-white transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Đang xác thực…' : (
            <>
              Xác thực
              <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
            </>
          )}
        </button>
      </motion.form>

      {/* Resend */}
      <motion.div {...fadeUp(0.2)} className="mt-8 pt-8 border-t border-white/[0.06] text-center">
        <p className="text-[13px] text-white/25">
          Không nhận được mã?{' '}
          <button
            onClick={handleResend}
            disabled={isResending}
            className="text-hiu-music hover:text-white transition-colors duration-300 disabled:opacity-40"
          >
            {isResending ? 'Đang gửi…' : 'Gửi lại'}
          </button>
        </p>
      </motion.div>
    </>
  );
};

export default VerifyEmailPage;
