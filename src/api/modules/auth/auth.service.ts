import { HttpCode, HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';

import { User } from '@prisma/client';

import { UsersService } from '../users/users.service';
import { compareSync } from 'bcryptjs';


@Injectable()
export class AuthService {

    constructor(private readonly userService: UsersService) { }

    async validateUser(email: string, password: string): Promise<Pick<User, 'email'>> {
        const user = await this.userService.findUserByEmailWithPassword(email);

        if (!user)
            throw new HttpException('User with such email was not found', HttpStatus.NOT_FOUND);

        const isCorrectPassword = compareSync(password, user.password);

        if (!isCorrectPassword)
            throw new HttpException('Wrong password', HttpStatus.UNAUTHORIZED);

        return { email: user.email }
    }

}