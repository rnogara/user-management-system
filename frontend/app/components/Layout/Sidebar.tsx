"use client";
import { useAuth } from '@/app/lib/contexts/AuhContext';
import { usePathname } from 'next/navigation';
import React from 'react';
import {
  HomeIcon,
  UserIcon,
  GroupIcon,
  AlertTriangleIcon,
} from 'lucide-react';
import Link from 'next/link';

const Sidebar: React.FC = () => {
  const { isAdmin } = useAuth();
  const pathname = usePathname();

  const navItems = [
    {
      label: "Dashboard",
      href: "/",
      icon: HomeIcon,
    },
    {
      label: "Meu Perfil",
      href: "/profile",
      icon: UserIcon,
    },
    ...(isAdmin()
      ? [
        {
          label: "Usuários",
          href: "/users",
          icon: GroupIcon,
        },
        {
          label: "Usuários Inativos",
          href: "/users/inactive",
          icon: AlertTriangleIcon,
        },
      ]
      : []),
  ];

  return (
    <div className='bg-white w-64 min-h-screen shadow-lg'>
      <div className='p-6'>
        <h2 className='text-lg font-bold text-gray-800'>
          Sistema de Gerenciamento de Usuários
        </h2>
      </div>
      <nav className='mt-8'>
        {navItems.map((item) => (
          <Link href={item.href} key={item.label}>
            <div className={`flex items-center px-6 py-3 hover:bg-gray-100 hover:text-primary-600 transition-colors ${
              pathname === item.href && 'bg-gray-100 text-primary-600'
            }`}>
              <item.icon className='w-5 h-5 text-gray-600' />
              <span className='ml-3 text-sm font-medium text-gray-800'>
                {item.label}
              </span>
            </div>
          </Link>
        ))}
      </nav>
    </div>
  )
}

export default Sidebar