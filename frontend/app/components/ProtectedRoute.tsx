"use client";

import React, { useEffect } from 'react';
import { useAuth } from '../lib/contexts/AuhContext';
import { useRouter } from 'next/navigation';
import LoadingSpinner from './Layout/LoadingSpinner';

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
      <LoadingSpinner />
    )
  }
  return <>{children}</>;
};

export default ProtectedRoute;