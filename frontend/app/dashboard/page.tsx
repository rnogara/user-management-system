'use client';
import React from 'react'
import { useAuth } from '../lib/contexts/AuhContext';
import ProtectedRoute from '../components/ProtectedRoute';
import Layout from '../components/Layout/Layout';
import {
  UserIcon,
  GroupIcon,
  AlertTriangleIcon,
} from 'lucide-react';

const Dashboard: React.FC = () => {
  const { user, isAdmin } = useAuth();

  return (
    <ProtectedRoute>
      <Layout>
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600">Bem-vindo, {user?.name}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className='card'>
              <div className="flex items-center">
                <UserIcon className="w-6 h-6 text-blue-500" />
                <div className="ml-4">
                  <h3 className="text-lg font-semibold">Meu Perfil</h3>
                  <p className="text-gray-600">Visualize e edite suas informações pessoais</p>
                </div>
              </div>
            </div>

            {isAdmin() && (
              <>
                <div className='card'>
                  <div className="flex items-center">
                    <GroupIcon className="w-6 h-6 text-green-500" />
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold">Gerenciar Usuários</h3>
                      <p className="text-gray-600">Visualize e gerencie todos os usuários</p>
                    </div>
                  </div>
                </div>

                <div className='card'>
                  <div className="flex items-center">
                    <AlertTriangleIcon className="w-6 h-6 text-yellow-500" />
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold">Usuários Inativos</h3>
                      <p className="text-gray-600">Visualize usuários que não fazem login</p>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          <div className='card'>
            <h2 className="text-xl font-semibold mb-4">Informações da Conta</h2>
            <div className='space-y-3'>
              <div>
                <span className="text-gray-600">Nome:</span>
                <span className="ml-2 font-medium">{user?.name}</span>
              </div>
              <div>
                <span className="text-gray-600">Email:</span>
                <span className="ml-2 font-medium">{user?.email}</span>
              </div>
              <div>
                <span className="text-gray-600">Papel:</span>
                <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${
                  user?.role === 'admin'
                  ? 'bg-purple-100 text-purple-800'
                  : 'bg-blue-100 text-blue-800'
                }`}>{user?.role === 'admin' ? 'Administrador' : 'Usuário'}</span>
              </div>
              <div>
                <span className="text-gray-600">Membro desde:</span>
                <span className="ml-2 font-medium">
                  {user?.createdAt ? new Date(user.createdAt).toLocaleDateString('pt-BR') : 'N/A'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </ProtectedRoute>
  )
}

export default Dashboard