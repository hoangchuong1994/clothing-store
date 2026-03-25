'use client';

import Image from 'next/image';
import React from 'react';

import { Card } from '@/components/ui/card';
import type { TeamMember } from '@/data/dummy-data';

interface TeamMemberCardProps {
  member: TeamMember;
}

export function TeamMemberCard({ member }: TeamMemberCardProps) {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
      <div className="bg-muted relative h-64 w-full overflow-hidden">
        <Image
          src={member.image}
          alt={member.name}
          fill
          className="object-cover transition-transform duration-500 hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      <div className="p-6">
        <h3 className="text-lg font-bold">{member.name}</h3>
        <p className="text-primary mb-3 text-sm font-semibold">{member.role}</p>
        <p className="text-muted-foreground text-sm">{member.bio}</p>
      </div>
    </Card>
  );
}
