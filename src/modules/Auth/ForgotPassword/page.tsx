'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useForgotPasswordMutation } from '@/lib/services/authApi';
import DecryptedText from '@/components/ui/DecryptedText';

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: EASE_OUT, delay },
});

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
          Quên mật khẩu
        </h1>
        <p className="mt-3 text-[13px] text-white/35">
          Nhập email để nhận mã OTP đặt lại mật khẩu
        </p>
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

      {/* Form */}
      <motion.form {...fadeUp(0.1)} onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="mb-2 block text-[11px] tracking-[0.2em] uppercase font-mono text-white/30">
            Email
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-white/[0.08] bg-hiu-elevated px-4 py-3 text-sm text-white placeholder-white/20 outline-none focus:border-hiu-music/50 focus:ring-1 focus:ring-hiu-music/20 transition-all duration-300"
            placeholder="you@example.com"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="group w-full inline-flex items-center justify-center gap-2.5 bg-white text-[#0a0a0f] py-3.5 text-[11px] font-bold tracking-[0.2em] uppercase hover:bg-hiu-music hover:text-white transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Đang gửi…' : (
            <>
              Gửi mã OTP
              <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
            </>
          )}
        </button>
      </motion.form>

      {/* Footer */}
      <motion.div {...fadeUp(0.2)} className="mt-8 pt-8 border-t border-white/[0.06] flex justify-center">
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

export default ForgotPasswordPage;
