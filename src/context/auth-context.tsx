'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

import type { UserData } from '@/data/dummy-data';
import { DUMMY_USERS } from '@/data/dummy-data';

export type { UserData };

export interface AuthContextType {
  user: UserData | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('dripcode_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Failed to parse stored user:', error);
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      const foundUser = DUMMY_USERS.find((u) => u.email === email && u.password === password);

      if (!foundUser) {
        throw new Error('Invalid email or password');
      }

      const userData: UserData = {
        id: foundUser.id,
        name: foundUser.name,
        email: foundUser.email,
        ...(foundUser.avatar && { avatar: foundUser.avatar }),
        joinDate: foundUser.joinDate,
        role: foundUser.role,
      };

      setUser(userData);
      localStorage.setItem('dripcode_user', JSON.stringify(userData));
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Check if email already exists
      if (DUMMY_USERS.some((u) => u.email === email)) {
        throw new Error('Email already registered');
      }

      // Create new user (in real app, this would be sent to backend)
      const newUser: UserData = {
        id: DUMMY_USERS.length + 1,
        name,
        email,
        joinDate: new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }),
        role: 'user',
      };

      setUser(newUser);
      localStorage.setItem('dripcode_user', JSON.stringify(newUser));
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('dripcode_user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        register,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
