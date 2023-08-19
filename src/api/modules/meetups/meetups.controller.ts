import {
  Controller, Get, Post, Body, Patch, Param,
  Delete, HttpCode, HttpStatus, UseGuards
} from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';

import { MeetupsService } from './meetups.service';
import { CreateMeetupDto } from './dto/create-meetup.dto';
import { UpdateMeetupDto } from './dto/update-meetup.dto';
import { MeetupResponse } from './response/meetups.response';
import { JwtAuthGuard } from '../auth/guard/jwt.guard';
import { Roles } from 'src/api/decorators/roles.decorator';
import { Role } from '@prisma/client';
import { RolesGuard } from '../auth/guard/roles.guard';

@ApiTags('meetups')
@Controller('meetups')
export class MeetupsController {
  constructor(private readonly meetupsService: MeetupsService) { }

  @ApiCreatedResponse({
    type: MeetupResponse
  })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  create(@Body() createMeetupDto: CreateMeetupDto): Promise<MeetupResponse> {
    return this.meetupsService.create(createMeetupDto);
  }

  @Roles(Role.ORGANIZER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  findAll() {
    return this.meetupsService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.meetupsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMeetupDto: UpdateMeetupDto) {
    return this.meetupsService.update(+id, updateMeetupDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.meetupsService.remove(+id);
  }
}
