import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
  PayloadTooLargeException,
  UnauthorizedException,
} from '@nestjs/common';

import { compareSync } from 'bcryptjs';

import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import { SessionService } from '../sessions/sessions.service';
import { ConfigService } from '@nestjs/config';
import ITokenPayload from './interfaces/token-payload.interface';
import { IRefreshTokenCookie } from './interfaces/refresh-token-cookie.interface';
import { serialize } from 'cookie';
import { UserResponse } from '../users/response/user.response';
import RequestWithUser from './interfaces/request-with-user.interface';
import { LoginResponse } from './response/login.response';
import { AccessTokenResponse } from './response/access-token.response';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
    private readonly sessionService: SessionService,
    private readonly configService: ConfigService,
  ) {}

  async validateUser(email: string, password: string): Promise<UserResponse> {
    const user = await this.userService.findUserByEmailWithPassword(email);

    if (!user)
      throw new HttpException(
        'User with such email was not found',
        HttpStatus.NOT_FOUND,
      );

    const isCorrectPassword = compareSync(password, user.password);

    if (!isCorrectPassword)
      throw new HttpException('Wrong password', HttpStatus.UNAUTHORIZED);

    return { id: user.id, email: user.email, role: user.role };
  }

  async registration(dto: CreateUserDto) {
    return await this.userService.createUser(dto);
  }

  async login(req: RequestWithUser): Promise<LoginResponse> {
    const payload: ITokenPayload = { email: req.user.email };
    const accessToken = this.getAccessToken(payload);
    const { refreshToken, refreshTokenCookie } =
      this.getCookieWithJwtRefreshToken(payload);
    await this.sessionService.createOrUpdateSession(req.user.id, refreshToken);
    req.res.setHeader('Set-Cookie', refreshTokenCookie);
    return {
      accessToken,
      user: req.user,
    };
  }

  private getAccessToken(payload: ITokenPayload) {
    return this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_ACCESS_TOKEN'),
      expiresIn: `${this.configService.get(
        'JWT_ACCESS_TOKEN_EXPIRATION_TIME',
      )}s`,
    });
  }

  private getCookieWithJwtRefreshToken(
    payload: ITokenPayload,
  ): IRefreshTokenCookie {
    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_REFRESH_TOKEN'),
      expiresIn: `${this.configService.get(
        'JWT_REFRESH_TOKEN_EXPIRATION_TIME',
      )}s`,
    });
    const refreshTokenCookie = serialize('refreshToken', refreshToken, {
      httpOnly: true,
      path: '/',
      maxAge: this.configService.get('JWT_REFRESH_TOKEN_EXPIRATION_TIME'),
    });

    return { refreshToken, refreshTokenCookie };
  }

  async refresh(req: RequestWithUser): Promise<AccessTokenResponse> {
    const payload: ITokenPayload = { email: req.user.email };

    const accessToken = this.getAccessToken(payload);

    const { refreshToken, refreshTokenCookie } =
      this.getCookieWithJwtRefreshToken(payload);

    await this.sessionService.createOrUpdateSession(req.user.id, refreshToken);

    req.res.setHeader('Set-Cookie', refreshTokenCookie);

    return { accessToken };
  }

  async getUserIfRefreshTokenMatches(email: string, refreshToken: string) {
    const user = await this.userService.findUserByEmail(email);

    const refreshTokenFromDB = await this.sessionService.getRefreshToken(
      user.id,
    );

    if (refreshToken !== refreshTokenFromDB) {
      throw new ForbiddenException('Invalid refresh token');
    }
    return user;
  }
}
