'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from './lib/contexts/AuhContext';
import { useEffect } from 'react';
import LoadingSpinner from './components/Layout/LoadingSpinner';

export default function Home() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (user) {
        router.push('/dashboard');
      } else {
        router.push('/login');
      }
    }
  }, [isLoading, user, router]);

  if (isLoading) {
    return <LoadingSpinner />;
  }
  return null;
}
