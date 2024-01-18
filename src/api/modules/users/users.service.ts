import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { User } from '@prisma/client';

import { genSaltSync, hashSync } from 'bcryptjs';

import { UserResponse } from './response/user.response';
import { UserRepository } from './users.repository';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(dto: CreateUserDto): Promise<UserResponse> {
    const isUserExist = await this.findUserByEmail(dto.email);
    if (isUserExist)
      throw new HttpException(
        'User with such email already exists',
        HttpStatus.UNAUTHORIZED,
      );

    const salt = genSaltSync(10);

    const newUser: CreateUserDto = {
      email: dto.email,
      password: hashSync(dto.password, salt),
    };

    return await this.userRepository.create(newUser);
  }

  async findUserByEmailWithPassword(email: string): Promise<User> {
    return await this.userRepository.findByEmailWithPassword(email);
  }

  async findUserByEmail(email: string): Promise<UserResponse> {
    return await this.userRepository.findByEmail(email);
  }
}
