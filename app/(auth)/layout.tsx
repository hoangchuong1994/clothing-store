import { Suspense } from 'react';
import Image from 'next/image';
import type { Metadata } from 'next';

import Loading from './loading';
import background from '@/public/static/background-auth-page.jpg';

export const metadata: Metadata = {
    title: 'Create Next App',
    description: 'Generated by create next app',
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="bg-slate-300">
            <div className="container m-auto">
                <div className="flex min-h-screen items-center justify-center">
                    <div className="w-full p-4 max-xl:max-w-md xl:mx-10 xl:grid xl:grid-cols-2">
                        <div className="relative hidden bg-gradient-to-r from-emerald-300 to-violet-300 xl:block xl:overflow-hidden xl:rounded-l-3xl">
                            <div className="absolute inset-0 rounded-lg">
                                <Image
                                    alt="background auth"
                                    src={background}
                                    fill
                                    priority
                                    className="object-cover"
                                    sizes="(max-width: 1200px) 100vw, 50vw"
                                    quality={100}
                                />
                            </div>
                        </div>
                        <div className="xl:overflow-hidden xl:rounded-r-3xl">
                            <Suspense fallback={<Loading />}>{children}</Suspense>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}