import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUpdateUserDto } from './dto/create-update-user.dto';
import { User } from './entities/user.entity';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Constantes } from '../utils/Contants';
import { JwtAuthGuard } from '../auth/jwt-auth-guard';

@ApiTags('Usuarios')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: Constantes.REGISTRO_CREADO_EXITOSAMENTE,
  })
  @ApiBody({ type: CreateUpdateUserDto })
  async createUser(@Body() userData: CreateUpdateUserDto): Promise<User> {
    return this.userService.createUser(userData);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getUserById(@Param('id') id: number): Promise<User> {
    return this.userService.getUserById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllRoles(): Promise<User[]> {
    return this.userService.getAllUsers();
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  @ApiResponse({
    status: 201,
    description: Constantes.REGISTRO_EDITADO_EXITOSAMENTE,
  })
  async updateUser(
    @Param('id') id: number,
    @Body() userData: CreateUpdateUserDto,
  ): Promise<User> {
    return this.userService.updateUser(id, userData);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiResponse({
    status: 201,
    description: Constantes.REGISTRO_ELIMINADO_EXITOSAMENTE,
  })
  async deleteUser(@Param('id') id: number): Promise<void> {
    return this.userService.deleteUser(id);
  }
}
