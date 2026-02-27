import { Suspense } from 'react';
import ResetPasswordPage from '@/modules/Auth/ResetPassword/page';

export default function ResetPassword() {
  return (
    <Suspense>
      <ResetPasswordPage />
    </Suspense>
  );
}
