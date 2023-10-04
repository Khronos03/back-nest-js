import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Constantes } from '../utils/Contants';
import { User } from '../user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(private usersService: UserService, private jwtTokenService: JwtService) { }

  async login(email: string, password: string): Promise<{ access_token: string }> {
    const user = await this.usersService.findOneEmail(email);
  
    if (!user || !(await this.isPasswordValid(password, user.password))) {
      throw new UnauthorizedException(Constantes.ERROR_ACCESO);
    }
    const accessToken = this.generateAccessToken(user);
    return { access_token: accessToken };
  }
  
  private async isPasswordValid(inputPassword: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(inputPassword, hashedPassword);
  }
  
  private generateAccessToken(user: User): string {
    const payload = { sub: user.id, email: user.email };
    return this.jwtTokenService.sign(payload);
  }
  
}
