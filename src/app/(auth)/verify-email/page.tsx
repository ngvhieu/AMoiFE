import { Suspense } from 'react';
import VerifyEmailPage from '@/modules/Auth/VerifyEmail/page';

export default function VerifyEmail() {
  return (
    <Suspense>
      <VerifyEmailPage />
    </Suspense>
  );
}
