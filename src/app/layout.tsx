import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/styles/globals.css';
import StoreProvider from '@/lib/Provider/StoreProvider';

const inter = Inter({ subsets: ['latin', 'vietnamese'] });

export const metadata: Metadata = {
  title: 'Hiu — Nghe nhạc & chia sẻ ảnh',
  description: 'Nền tảng nghe nhạc và chia sẻ ảnh đa người dùng',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <StoreProvider>
        <body className={`${inter.className} bg-hiu-bg text-hiu-primary antialiased`}>
          {children}
        </body>
      </StoreProvider>
    </html>
  );
}
