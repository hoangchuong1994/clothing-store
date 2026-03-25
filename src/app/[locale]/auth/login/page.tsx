'use client';

import dynamic from 'next/dynamic';

const LoginForm = dynamic(() => import('./login-form'), {
  ssr: false,
  loading: () => <div>Loading...</div>,
});

export default function LoginPage() {
  return <LoginForm />;
}
