import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';

import { Request } from 'express';

import { ExtractJwt, Strategy } from 'passport-jwt';

import { AuthService } from '../auth.service';
import ITokenPayload from '../interfaces/token-payload.interface';
import { UserResponse } from '../../users/response/user.response';

@Injectable()
export class RefreshStrategy extends PassportStrategy(Strategy, 'refresh') {

    constructor(private readonly configService: ConfigService,
        private readonly authService: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                (req: Request) => {
                    console.log(req?.cookies?.refreshToken)
                    return req?.cookies?.refreshToken;

                }
            ]),
            ignoreExpiration: true,
            secretOrKey: configService.get('JWT_REFRESH_TOKEN')
        });
    }

    async validate(req: Request, { email }: ITokenPayload): Promise<UserResponse> {
        const refreshToken = req?.cookies?.refreshToken;
        console.log(refreshToken, email)
        return this.authService.getUserIfRefreshTokenMatches(email, refreshToken)
    }
}