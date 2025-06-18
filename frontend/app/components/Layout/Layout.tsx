"use client";
import { useAuth } from '@/app/lib/contexts/AuhContext';
import React from 'react'
import Header from './Header';
import { Sidebar } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user } = useAuth();

  if (!user) {
    return <div>{children}</div>;
  }

  return (
    <div className='flex h-screen w-screen bg-gray-100'>
      <Sidebar />
      <div className='flex-1 flex flex-col overflow-hidden'>
        <Header />
        <main className='flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6'>
          {children}
        </main>
      </div>
    </div>
  )
}

export default Layout;