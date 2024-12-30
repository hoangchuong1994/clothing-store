import { DefaultSession } from 'next-auth';
import { UserRole, User as UserPrisma } from '@prisma/client';

declare module 'next-auth' {
    interface Session {
        user: UserPrisma & DefaultSession['user'];
    }

    interface User {
        role?: UserRole;
    }
}

declare module 'next-auth/jwt' {
    interface JWT {
        role?: UserRole;
    }
}
