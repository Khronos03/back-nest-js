import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/user/user.module';
import { RoleModule } from './modules/role/role.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST', 'localhost'),
        port: configService.get('DB_PORT', 5432),
        username: configService.get('DB_USERNAME', 'admin'),
        password: configService.get('DB_PASSWORD', 'mypassword'),
        database: configService.get('DB_DATABASE', 'postgres'),
        autoLoadEntities: true,
        synchronize: configService.get('DB_SYNCHRONIZE', true),
      }),
      inject: [ConfigService],
    }),
    UserModule,
    RoleModule,
  ],
})
export class AppModule {}
