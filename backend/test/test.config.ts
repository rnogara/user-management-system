import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { DynamicModule } from '@nestjs/common';

export const createTestingModule = async (modules: DynamicModule[]) => {
  const module: TestingModule = await Test.createTestingModule({
    imports: [
      ConfigModule.forRoot({
        isGlobal: true,
        envFilePath: '.env.test',
      }),
      TypeOrmModule.forRoot({
        type: 'sqlite',
        database: ':memory:',
        entities: [User],
        synchronize: true,
        logging: false,
      }),
      TypeOrmModule.forFeature([User]),
      ...modules,
    ],
  }).compile();

  return module;
};

export const mockUser = {
  id: '1',
  name: 'John Doe',
  email: 'john.doe@example.com',
  password: '$2b$10$hashedPassword',
  role: 'user',
  createdAt: new Date(),
  updatedAt: new Date(),
  lastLoginAt: new Date(),
};

export const mockAdmin = {
  id: '2',
  name: 'Admin User',
  email: 'admin@example.com',
  password: '$2b$10$hashedPassword',
  role: 'admin',
  createdAt: new Date(),
  updatedAt: new Date(),
  lastLoginAt: new Date(),
};
