import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Role } from '../role/entities/role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User]), TypeOrmModule.forFeature([Role])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}