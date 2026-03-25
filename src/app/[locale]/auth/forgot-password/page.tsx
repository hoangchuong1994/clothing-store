'use client';

import dynamic from 'next/dynamic';

const ForgotPasswordForm = dynamic(() => import('./forgot-password-form'), {
  ssr: false,
  loading: () => <div>Loading...</div>,
});

export default function ForgotPasswordPage() {
  return <ForgotPasswordForm />;
}
