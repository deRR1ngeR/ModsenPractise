import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtStrategy } from './strategy/jwt.strategy';
import { LocalStrategy } from './strategy/local.storage';

@Module({
    imports: [
        UsersModule,
        PassportModule,
        ConfigModule,
    ],
    providers: [AuthService, JwtStrategy, LocalStrategy],
    controllers: [AuthController]
})
export class AuthModule { }
