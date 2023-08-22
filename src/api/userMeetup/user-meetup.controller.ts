import { Body, Controller, Delete, Param, Post, Req, UseGuards } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { UserMeetupDto } from './dto/user-meetup.dto';
import RequestWithUser from '../modules/auth/interfaces/request-with-user.interface';
import { UserMeetupService } from './user-meetup.service';
import { JwtAuthGuard } from '../modules/auth/guard/jwt.guard';
import { RolesGuard } from '../modules/auth/guard/roles.guard';

@ApiTags('user-meetup')
@Controller('user-meetup')
export class UserMeetupsController {
    constructor(private readonly userMeetupService: UserMeetupService) { }
    @ApiOkResponse()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Post()
    async addUserToMeetup(@Body() dto: UserMeetupDto, @Req() req: RequestWithUser) {
        return await this.userMeetupService.addUserToMeetup(dto, req.user.id);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Delete(':id')
    async removeUserFromMeetup(@Param('id') meetupId: string, @Req() req: RequestWithUser) {
        return await this.userMeetupService.removeUserFromMeetup(+meetupId, req.user.id);
    }


}