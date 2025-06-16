import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Request,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { SortOrder, UserRole } from './types';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@ApiTags('users')
@Controller('users')
@ApiBearerAuth()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Criar novo usuário (apenas admins)' })
  @ApiResponse({ status: 201, description: 'Usuário criado com sucesso' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar usuários (apenas admins)' })
  @ApiResponse({ status: 200, description: 'Lista de usuários' })
  findAll(
    @Query('role') role?: UserRole,
    @Query('sortBy') sortBy?: string,
    @Query('order') order?: SortOrder,
  ) {
    return this.usersService.findAll(role, sortBy, order);
  }

  @Get('inactive')
  @ApiOperation({ summary: 'Listar usuários inativos (apenas admins)' })
  @ApiQuery({ name: 'days', required: false, type: Number })
  findInactiveUsers(@Query('days') days?: number) {
    return this.usersService.findInactiveUsers(days);
  }

  @Get('profile')
  @ApiOperation({ summary: 'Obter perfil do usuário logado' })
  getProfile(@Request() req: { user: { id: string } }) {
    return this.usersService.findOne(req.user.id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obter usuário por ID' })
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Request() req: { user: User },
  ) {
    return this.usersService.update(id, updateUserDto, req.user);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletar usuário (apenas admins)' })
  remove(@Param('id') id: string, @Request() req: { user: User }) {
    return this.usersService.remove(id, req.user);
  }
}
