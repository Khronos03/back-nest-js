import { CreateUpdateUserDto } from './dto/create-update-user.dto';
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Not, Repository } from 'typeorm';
import { Role } from '../role/entities/role.entity';
import { Constantes } from '../utils/Contants';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  async createUser(userData: CreateUpdateUserDto): Promise<User> {
    await this.checkIfEmailExists(userData.email);

    const user = this.userRepository.create({
      full_name: userData.full_name,
      email: userData.email,
      password: userData.password,
      phone: userData.phone,
    });
    if (userData.role) {
      const role = await this.roleRepository.findOne({
        where: { id: userData.role },
      });
      if (role) {
        user.role = role;
      }
    }

    return this.userRepository.save(user);
  }

  async getUserById(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(Constantes.USUARIO_NO_ENCONTRADO);
    }
    return user;
  }

  async updateUser(id: number, userData: CreateUpdateUserDto): Promise<User> {
    await this.checkIfEmailExists(userData.email, id);

    const user = await this.getUserById(id);
    Object.assign(user, userData);
    return this.userRepository.save(user);
  }

  async deleteUser(id: number): Promise<void> {
    const user = await this.getUserById(id);
    user.is_delete = true;
    await this.userRepository.save(user);
  }

  async getAllUsers(): Promise<User[]> {
    return this.userRepository.find({ where: { is_delete: false } });
  }

  private async checkIfEmailExists(email: string, excludeUserId?: number) {
    const query = {
      email,
      ...(excludeUserId && { id: Not(excludeUserId) }),
    };
    const existingUser = await this.userRepository.findOne({ where: query });
    if (existingUser) {
      throw new ConflictException(Constantes.CORREO_EXISTENTE);
    }
  }
}
