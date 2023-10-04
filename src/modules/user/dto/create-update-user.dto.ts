import { IsString, IsEmail, IsOptional, IsNumber } from 'class-validator';
import { Column } from 'typeorm';

export class CreateUpdateUserDto {
  @IsString()
  full_name: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  phone: string;

  @IsNumber()
  @IsOptional()
  role: number;

  @Column({ default: false })
  @IsOptional()
  is_delete: Boolean;
}
