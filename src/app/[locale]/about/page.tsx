'use client';

import Image from 'next/image';

import { TeamMemberCard } from '@/components/cards/TeamMemberCard';
import { TEAM_MEMBERS } from '@/data/dummy-data';

export default function AboutPage() {
  return (
    <div className="bg-background min-h-screen">
      {/* Hero */}
      <section className="from-primary/10 to-primary/5 border-b bg-gradient-to-r py-16">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="mb-4 text-5xl font-bold md:text-6xl">About DRIPCODE</h1>
          <p className="text-muted-foreground mx-auto max-w-2xl text-xl">
            A premium streetwear brand for the bold and the brave. We create authentic, high-quality
            pieces that define modern street culture.
          </p>
        </div>
      </section>

      {/* Brand Story */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div className="relative h-96 overflow-hidden rounded-lg">
              <Image
                src="https://images.pexels.com/photos/3622622/pexels-photo-3622622.jpeg"
                alt="DRIPCODE Story"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h2 className="mb-4 text-3xl font-bold">Our Story</h2>
              <p className="text-muted-foreground mb-4">
                Founded in 2020, DRIPCODE started as a passion project between friends who loved
                streetwear culture. What began in a small garage in New York City has evolved into a
                global brand serving thousands of customers worldwide.
              </p>
              <p className="text-muted-foreground mb-4">
                We believe that streetwear is more than just clothing it is a form of
                self-expression. Every piece we create is designed to make you feel confident and
                authentic.
              </p>
              <p className="text-muted-foreground">
                Today, we are committed to sustainable practices, fair wages, and supporting
                emerging street artists. Our mission is to bring quality, authenticity, and style to
                everyone who wears DRIPCODE.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="bg-muted/50 border-t border-b py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-12 text-center text-3xl font-bold">Our Values</h2>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                title: 'Authenticity',
                description: 'We stay true to streetwear roots while constantly innovating.',
              },
              {
                title: 'Quality',
                description:
                  'Every piece is crafted with premium materials and attention to detail.',
              },
              {
                title: 'Sustainability',
                description:
                  'We care about the planet and our responsibility to future generations.',
              },
            ].map((value, idx) => (
              <div key={idx} className="bg-background rounded-lg border p-8">
                <h3 className="mb-3 text-xl font-bold">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-12 text-center text-3xl font-bold">Meet Our Team</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {TEAM_MEMBERS.map((member) => (
              <TeamMemberCard key={member.id} member={member} />
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-muted/50 border-t py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-12 text-center text-3xl font-bold">Our Journey</h2>
          <div className="space-y-8">
            {[
              {
                year: 2020,
                event: 'DRIPCODE founded by a group of passionate streetwear enthusiasts',
              },
              { year: 2021, event: 'First collection launched online. Reached 10,000 customers' },
              {
                year: 2022,
                event: 'Expanded to 5 international markets. Collaborated with 10+ street artists',
              },
              {
                year: 2023,
                event: 'Opened flagship store in New York. Launched sustainability program',
              },
              { year: 2024, event: 'Hit 100,000+ customers worldwide. Industry recognition' },
              { year: 2025, event: 'Premium collections and global expansion' },
            ].map((item, idx) => (
              <div key={idx} className="flex gap-6">
                <div className="flex flex-col items-center">
                  <div className="bg-primary text-primary-foreground flex h-12 w-12 items-center justify-center rounded-full font-bold">
                    {item.year.toString().slice(-2)}
                  </div>
                  {idx < 5 && <div className="bg-border h-12 w-0.5" />}
                </div>
                <div className="pt-2">
                  <p className="text-primary font-bold">{item.year}</p>
                  <p className="text-muted-foreground">{item.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
