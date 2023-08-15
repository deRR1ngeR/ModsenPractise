import { ApiProperty } from '@nestjs/swagger';

import { User } from '@prisma/client';

import { IsEmail, IsString } from 'class-validator';

type CreateUserType = Omit<User, 'id' | 'role'>;

export class CreateUserDto implements CreateUserType {
    @ApiProperty()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsString()
    password: string;
}

