'use client';

import { Mail, Phone, MapPin } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export default function ContactPage() {
  const locale = useLocale();
  const t = useTranslations();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormData({ name: '', email: '', subject: '', message: '' });
    alert('Message sent successfully!');
  };

  return (
    <div className="bg-background min-h-screen">
      {/* Hero */}
      <section className="bg-muted border-b py-12">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold md:text-5xl">Get in Touch</h1>
          <p className="text-muted-foreground mt-2">
            We d love to hear from you. Send us a message!
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 md:grid-cols-3">
            {/* Contact Info */}
            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="bg-primary text-primary-foreground flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg">
                  <Mail className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold">{t('footer.email')}</h3>
                  <p className="text-muted-foreground text-sm">hello@dripcode.com</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="bg-primary text-primary-foreground flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg">
                  <Phone className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold">{t('footer.phone')}</h3>
                  <p className="text-muted-foreground text-sm">+1 (234) 567-890</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="bg-primary text-primary-foreground flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg">
                  <MapPin className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold">{t('footer.address')}</h3>
                  <p className="text-muted-foreground text-sm">New York, USA</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <form onSubmit={handleSubmit} className="space-y-6 md:col-span-2">
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label className="ml-3 block text-sm font-medium">Name</label>
                  <Input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your name"
                    required
                  />
                </div>
                <div>
                  <label className="ml-3 block text-sm font-medium">Email</label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="your@email.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="ml-3 block text-sm font-medium">Subject</label>
                <Input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="Message subject"
                  required
                />
              </div>

              <div>
                <label className="ml-3 block text-sm font-medium">Message</label>
                <Textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Your message"
                  rows={6}
                  required
                />
              </div>

              <Button type="submit" size="lg" className="w-full">
                {t('common.send') || 'Send Message'}
              </Button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
