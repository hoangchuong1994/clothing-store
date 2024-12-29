import { DefaultSession } from "next-auth";
import { UserRole } from "@prisma/client";

declare module "next-auth" {
  interface Session {
    user: {
      role: UserRole;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    /** Add role property to User */
    role?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role: UserRole;
  }
}
