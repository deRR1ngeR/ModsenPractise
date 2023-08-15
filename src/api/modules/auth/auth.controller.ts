import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

import { UserRegistrationDto } from './dto/user-registration.dto';
import { UsersService } from '../users/users.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {

    constructor(private readonly userService: UsersService) {

    }

    @HttpCode(HttpStatus.CREATED)
    @Post('register')
    async register(@Body() dto: UserRegistrationDto) {
        return await this.userService.createUser(dto);
    }
}
