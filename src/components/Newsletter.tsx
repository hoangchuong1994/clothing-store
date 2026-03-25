'use client';

import { Mail, Check } from 'lucide-react';
import React, { useState } from 'react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setIsSubscribed(true);
      setEmail('');
      // Reset message after 3 seconds
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  return (
    <section className="relative w-full overflow-hidden bg-linear-to-r from-cyan-950 to-purple-950 py-16 text-white md:py-24">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 h-96 w-96 animate-pulse rounded-full bg-cyan-500 opacity-10 mix-blend-screen blur-3xl filter" />
        <div className="absolute right-1/4 bottom-0 h-96 w-96 animate-pulse rounded-full bg-purple-600 opacity-10 mix-blend-screen blur-3xl filter" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 md:mb-10">
          <span className="text-sm font-bold tracking-widest text-cyan-400 uppercase">
            Stay Connected
          </span>
          <h2 className="mt-4 text-3xl font-black tracking-tight md:text-5xl">
            Join Our{' '}
            <span className="bg-linear-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Community
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-gray-300 md:text-lg">
            Get exclusive drops, early access to new collections, and special discount codes
            delivered to your inbox.
          </p>
        </div>

        {/* Subscription Form */}
        <form
          onSubmit={handleSubscribe}
          className="mx-auto flex max-w-md flex-col gap-3 sm:flex-row"
        >
          <div className="relative flex-1">
            <Mail className="pointer-events-none absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 transform text-gray-500" />
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-gray-700 bg-gray-900 py-3 pr-4 pl-12 text-white placeholder-gray-600 transition-all duration-300 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/30 focus:outline-none md:py-4"
              required
            />
          </div>
          <button
            type="submit"
            className="flex transform items-center justify-center gap-2 rounded-lg bg-linear-to-r from-cyan-500 to-purple-600 px-6 py-3 font-bold tracking-wide whitespace-nowrap text-black uppercase transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/50 md:px-8 md:py-4"
          >
            {isSubscribed ? (
              <>
                <Check className="h-5 w-5" />
                Subscribed!
              </>
            ) : (
              'Subscribe'
            )}
          </button>
        </form>

        {/* Terms */}
        <p className="mt-6 text-xs text-gray-500 md:text-sm">
          We respect your privacy. Unsubscribe at any time.
        </p>

        {/* Success Message */}
        {isSubscribed && (
          <div className="mt-6 animate-pulse rounded-lg border border-cyan-500/50 bg-cyan-500/20 p-4">
            <p className="font-medium text-cyan-300">
              ✨ Thanks for subscribing! Check your email for a welcome discount.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
