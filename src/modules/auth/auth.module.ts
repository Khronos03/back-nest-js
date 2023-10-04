import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { Constantes } from '../utils/Contants';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '../local.strategy/jwt.strategy';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: Constantes.SECRET,
      signOptions: {expiresIn: '1h'}
    })],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
