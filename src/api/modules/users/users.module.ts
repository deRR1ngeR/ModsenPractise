import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { UsersService } from './users.service';
import { UserRepository } from './users.repository';
import { PrismaModule } from '../prisma/prisma.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getJWTConfig } from 'src/api/configs/jwt.config';

@Module({
  imports: [PrismaModule, JwtModule.registerAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: getJWTConfig
  })],
  providers: [UsersService, UserRepository],
  exports: [UsersService]
})
export class UsersModule { }
