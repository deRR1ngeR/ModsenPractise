import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AuthDto } from './dto/user-registration.dto';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guard/local.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {

    constructor(
        private readonly userService: UsersService,
        private readonly authService: AuthService) { }

    @UsePipes(new ValidationPipe())
    @HttpCode(HttpStatus.CREATED)
    @Post('register')
    async register(@Body() dto: AuthDto) {
        return await this.userService.createUser(dto);
    }

    @UseGuards(LocalAuthGuard)
    @UsePipes(new ValidationPipe())
    @HttpCode(HttpStatus.ACCEPTED)
    @Post('login')
    async login(@Body() { email, password }: AuthDto) {
        const user = await this.authService.validateUser(email, password);
        return this.userService.login(user.email)
    }
}
