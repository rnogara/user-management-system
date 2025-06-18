"use client";

import React, { useEffect } from 'react';
import { useAuth } from '../lib/contexts/AuhContext';
import { useRouter } from 'next/navigation';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requireAdmin = false }) => {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        router.push('/login');
        return;
      }
      if (requireAdmin && user?.role !== 'admin') {
        router.push('/dashboard');
        return;
      }
    }
  }, [isLoading, user, router, requireAdmin]);

  if (isLoading) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600'></div>
      </div>
    )
  }
  return <>{children}</>;
};

export default ProtectedRoute;