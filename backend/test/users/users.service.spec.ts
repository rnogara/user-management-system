import { ConflictException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { UserRole } from 'src/users/types';
import { UsersService } from 'src/users/users.service';

const mockUserRepository = {
  create: jest.fn(),
  save: jest.fn(),
  find: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
  createQueryBuilder: jest.fn(),
};

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  describe('createUser', () => {
    it('should create a new user', async () => {
      const createUserDto = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        password: '123456',
        role: UserRole.USER,
      };

      const savedUser = { id: '1', ...createUserDto };

      const result = await service.create(createUserDto);

      expect(result).toEqual(savedUser);
      expect(mockUserRepository.create).toHaveBeenCalledWith(createUserDto);
      expect(mockUserRepository.save).toHaveBeenCalledWith(savedUser);
    });

    it('should throw an error if email is already in use', async () => {
      const createUserDto = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        password: '123456',
        role: UserRole.USER,
      };

      mockUserRepository.findOne.mockResolvedValue({
        id: '1',
        email: 'john.doe@example.com',
      });

      await expect(service.create(createUserDto)).rejects.toThrow(
        ConflictException,
      );
    });
  });

  describe('findOne', () => {
    it('should return a user', async () => {
      const user = { id: '1', name: 'John Doe', email: 'john.doe@example.com' };
      mockUserRepository.findOne.mockResolvedValue(user);

      const result = await service.findOne('1');

      expect(result).toEqual(user);
      expect(mockUserRepository.findOne).toHaveBeenCalledWith({
        where: { id: '1' },
      });
    });

    it('should throw an error if user not found', async () => {
      mockUserRepository.findOne.mockResolvedValue(null);

      await expect(service.findOne('1')).rejects.toThrow(NotFoundException);
    });
  });
});
