import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { Repository } from 'typeorm';
import { CreateUpdateRoleDto } from './dto/create-update-role.dto';
import { Constantes } from '../utils/Contants';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  async createRole(name: string): Promise<Role> {
    const role = this.roleRepository.create({ name });
    return this.roleRepository.save(role);
  }

  async getRoleById(id: number): Promise<Role> {
    const role = await this.roleRepository.findOne({ where: { id } });
    if (!role) {
      throw new NotFoundException(Constantes.ROL_NO_ENCONTRADO);
    }
    return role;
  }

  async updateRole(id: number, roleData: CreateUpdateRoleDto): Promise<Role> {
    const role = await this.getRoleById(id);
    Object.assign(role, roleData);
    return this.roleRepository.save(role);
  }

  async deleteRole(id: number): Promise<void> {
    const role = await this.getRoleById(id);
    role.is_delete = true;
    await this.roleRepository.save(role);
  }

  async getAllRoles(): Promise<Role[]> {
    return this.roleRepository.find({ where: { is_delete: false } });
  }
}
