"use client";
import { useAuth } from '@/app/lib/contexts/AuhContext';
import { useRouter } from 'next/navigation';
import React from 'react'

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <header className='bg-white shadow-sm border-b border-gray-200'>
      <div className='flex justify-between items-center px-6 py-4'>
        <h1 className='text-xl font-semibold text-gray-800'>
          Sistema de Gerenciamento de Usuários
        </h1>
        <div className='flex items-center space-x-4'>
          <span className='text-sm text-gray-600'>
            Olá, {user?.name}
          </span>
          <button className='text-sm text-red-600 hover:text-red-800 font-medium' onClick={handleLogout}>
            Sair
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header