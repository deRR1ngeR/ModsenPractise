import { Body, Controller, HttpCode, HttpStatus, Post, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AuthDto } from './dto/user-registration.dto';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guard/local.guard';
import { RequestWithUser } from './interfaces/request-with-user.interface';
import { RefreshGuard } from './guard/refresh.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService) { }

    @UsePipes(new ValidationPipe())
    @HttpCode(HttpStatus.CREATED)
    @Post('register')
    async register(@Body() dto: AuthDto) {
        return await this.authService.registration(dto);
    }

    @UseGuards(LocalAuthGuard)
    @UsePipes(new ValidationPipe())
    @HttpCode(HttpStatus.ACCEPTED)
    @Post('login')
    async login(@Req() req: RequestWithUser) {
        return this.authService.login(req)
    }

    @UseGuards(RefreshGuard)
    @Post('refresh')
    async refresh(@Req() req: RequestWithUser) {
        return this.authService.refresh(req);
    }

}
