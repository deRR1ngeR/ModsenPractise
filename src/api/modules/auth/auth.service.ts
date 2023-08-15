import { Injectable } from '@nestjs/common';

import { UserRegistrationDto } from './dto/user-registration.dto';
import { UsersService } from '../users/users.service';


@Injectable()
export class AuthService {

    constructor(private readonly userService: UsersService) { }

    async registration(dto: UserRegistrationDto) {
    }

}