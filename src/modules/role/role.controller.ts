import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateUpdateRoleDto } from './dto/create-update-role.dto';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Role } from './entities/role.entity';
import { Constantes } from '../utils/Contants';

@ApiTags('Roles')
@Controller('role')
export class RoleController {
  constructor(private readonly rolesService: RoleService) {}

  @Post()
  @ApiResponse({ status: 201, description: Constantes.REGISTRO_CREADO_EXITOSAMENTE })
  @ApiBody({ type: CreateUpdateRoleDto })
  async create(@Body('name') name: string): Promise<Role> {
    return this.rolesService.createRole(name);
  }

  @Get(':id')
  async getRoleById(@Param('id') id: number): Promise<Role> {
    return this.rolesService.getRoleById(id);
  }

  @Get()
  async getAllRoles(): Promise<Role[]> {
    return this.rolesService.getAllRoles();
  }

  @Put(':id')
  @ApiResponse({ status: 201, description: Constantes.REGISTRO_EDITADO_EXITOSAMENTE })
  async updateRole(@Param('id') id: number, @Body() updateRoleDto: CreateUpdateRoleDto) {
    return this.rolesService.updateRole(id, updateRoleDto);
  }

  @Delete(':id')
  @ApiResponse({ status: 201, description: Constantes.REGISTRO_ELIMINADO_EXITOSAMENTE })
  remove(@Param('id') id: string) {
    return this.rolesService.deleteRole(+id);
  }
}
