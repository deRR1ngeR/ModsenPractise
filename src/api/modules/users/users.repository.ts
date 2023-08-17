import { Injectable } from '@nestjs/common';

import { $Enums, User } from '@prisma/client';

import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserResponse } from './response/user.response';

@Injectable()
export class UserRepository {
    constructor(private readonly db: PrismaService) { }

    async create(dto: CreateUserDto): Promise<UserResponse> {
        return this.db.user.create({
            data: {
                ...dto,
                role: $Enums.Role.USER
            },
            select: {
                id: true,
                email: true,
                role: true
            }
        })
    }

    async findByEmailWithPassword(email: string): Promise<User> {
        return await this.db.user.findUnique({
            where: {
                email: email
            }
        })
    }

    async findByEmail(email: string): Promise<UserResponse> {
        return await this.db.user.findUnique({
            where: {
                email: email
            }
        });
    }
}