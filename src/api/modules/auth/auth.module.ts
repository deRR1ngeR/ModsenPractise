import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtStrategy } from './strategy/jwt.strategy';
import { LocalStrategy } from './strategy/local.storage';
import { SessionsModule } from '../sessions/sessions.module';
import { RefreshStrategy } from './strategy/refresh.strategy';

@Module({
    imports: [
        UsersModule,
        PassportModule,
        ConfigModule,
        JwtModule.register({}),
        SessionsModule
    ],
    providers: [AuthService, JwtStrategy, LocalStrategy, RefreshStrategy],
    controllers: [AuthController]
})
export class AuthModule { }
