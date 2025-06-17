import {
  Injectable,
  NotFoundException,
  ConflictException,
  ForbiddenException,
} from '@nestjs/common';
import { User } from './entities/user.entity';
import { IsNull, LessThanOrEqual, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { SortOrder, UserRole } from './types';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    // Verifica se o email já existe
    const existingUser = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });

    if (existingUser) {
      throw new ConflictException('Email já está em uso');
    }

    // Cria o usuário
    const user = this.userRepository.create(createUserDto);
    return this.userRepository.save(user);
  }

  async findAll(
    role?: UserRole,
    sortBy?: string,
    order?: SortOrder,
  ): Promise<User[]> {
    const queryBuilder = this.userRepository.createQueryBuilder('user');

    if (role) {
      queryBuilder.andWhere('user.role = :role', { role });
    }

    if (sortBy && ['name', 'createdAt'].includes(sortBy)) {
      queryBuilder.orderBy(`user.${sortBy}`, order || 'ASC');
    } else {
      queryBuilder.orderBy('user.createdAt', 'DESC');
    }

    return queryBuilder.getMany();
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }
    return user;
  }
  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { email } });
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
    currentUser: User,
  ): Promise<User> {
    await this.findOne(id);

    //Verificar permissões
    if (currentUser.role !== UserRole.ADMIN && currentUser.id !== id) {
      throw new ForbiddenException(
        'Você não tem permissão para atualizar este usuário',
      );
    }

    //Apenas admin pode alterar a role
    if (updateUserDto.role && currentUser.role !== UserRole.ADMIN) {
      throw new ForbiddenException(
        'Você não tem permissão para alterar a role deste usuário',
      );
    }

    //Atualizar usuário
    await this.userRepository.update(id, updateUserDto);
    return this.findOne(id);
  }

  async remove(id: string, currentUser: User): Promise<void> {
    if (currentUser.role !== UserRole.ADMIN) {
      throw new ForbiddenException(
        'Você não tem permissão para deletar este usuário',
      );
    }

    if (currentUser.id === id) {
      throw new ForbiddenException('Você não pode deletar seu próprio usuário');
    }

    const user = await this.findOne(id);
    await this.userRepository.remove(user);
  }

  async updateLastLogin(id: string): Promise<void> {
    await this.userRepository.update(id, { lastLoginAt: new Date() });
  }

  async findInactiveUsers(days: number = 30): Promise<User[]> {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);

    return this.userRepository.find({
      where: [
        { lastLoginAt: IsNull() },
        { lastLoginAt: LessThanOrEqual(cutoffDate) },
      ],
    });
  }
}
