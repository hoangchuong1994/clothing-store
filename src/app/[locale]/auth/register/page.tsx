'use client';

import dynamic from 'next/dynamic';

const RegisterForm = dynamic(() => import('./register-form'), {
  ssr: false,
  loading: () => <div>Loading...</div>,
});

export default function RegisterPage() {
  return <RegisterForm />;
}
