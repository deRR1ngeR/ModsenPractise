import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { User } from '@prisma/client';

import { genSaltSync, hashSync } from 'bcryptjs';

import { UserResponse } from './response/user.response';
import { UserRepository } from './users.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';



@Injectable()
export class UsersService {

    constructor(
        private readonly userRepository: UserRepository,
        private readonly jwtService: JwtService) {

    }

    async createUser(dto: CreateUserDto): Promise<UserResponse> {

        const isUserExist = this.findUserByEmail(dto.email);
        console.log(isUserExist);
        if (isUserExist)
            throw new HttpException('User with such email already exists', HttpStatus.UNAUTHORIZED)

        const salt = genSaltSync(10);

        const newUser: CreateUserDto = {
            email: dto.email,
            password: hashSync(dto.password, salt)
        }

        return await this.userRepository.create(newUser);
    }

    async login(email: string) {
        const payload = { email };

        return {
            acces_token: await this.jwtService.signAsync(payload)

        };
    }

    async findUserByEmailWithPassword(email: string): Promise<User> {
        return await this.userRepository.findByEmailWithPassword(email);
    }

    async findUserByEmail(email: string): Promise<UserResponse> {
        return await this.userRepository.findByEmail(email);
    }
}