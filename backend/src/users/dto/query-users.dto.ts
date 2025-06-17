import { IsOptional, IsEnum, IsString, IsIn } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { SortOrder, UserRole } from '../types';

export class QueryUsersDto {
  @ApiPropertyOptional({ enum: UserRole, description: 'Filtro por role' })
  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;

  @ApiPropertyOptional({
    enum: ['name', 'createdAt'],
    description: 'Campo para ordenação',
  })
  @IsOptional()
  @IsIn(['name', 'createdAt'])
  orderBy?: 'name' | 'createdAt';

  @ApiPropertyOptional({ description: 'Ordenação', enum: SortOrder })
  @IsOptional()
  @IsEnum(SortOrder)
  order?: SortOrder;

  @ApiPropertyOptional({ description: 'Página', example: 1 })
  @IsOptional()
  @Transform(({ value }: { value: string }) => parseInt(value))
  page?: number = 1;

  @ApiPropertyOptional({
    description: 'Limite de usuários por página',
    example: 10,
  })
  @IsOptional()
  @Transform(({ value }: { value: string }) => parseInt(value))
  limit?: number = 10;

  @ApiPropertyOptional({ description: 'Busca por nome ou email' })
  @IsOptional()
  @IsString()
  search?: string;
}
