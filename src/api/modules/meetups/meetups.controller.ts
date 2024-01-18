import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  UseGuards,
  Query,
  Req,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';

import { MeetupsService } from './meetups.service';
import { CreateMeetupDto } from './dto/create-meetup.dto';
import { UpdateMeetupDto } from './dto/update-meetup.dto';
import { MeetupResponse } from './response/meetups.response';
import { JwtAuthGuard } from '../auth/guard/jwt.guard';
import { Roles } from '../../decorators/roles.decorator';
import { Role } from '@prisma/client';
import { RolesGuard } from '../auth/guard/roles.guard';
import { PaginatedResult } from '../../pagination/interface/paginator.interface';
import RequestWithUser from '../auth/interfaces/request-with-user.interface';
import { QueryMeetups } from './dto/query-meetups.dto';

@ApiTags('meetup')
@Controller('meetup')
export class MeetupsController {
  constructor(private readonly meetupsService: MeetupsService) {}

  @ApiCreatedResponse({
    type: MeetupResponse,
  })
  @Roles(Role.ORGANIZER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @HttpCode(HttpStatus.CREATED)
  @Post()
  create(
    @Body() createMeetupDto: CreateMeetupDto,
    @Req() req: RequestWithUser,
  ): Promise<MeetupResponse> {
    return this.meetupsService.create(createMeetupDto, req.user.id);
  }

  @Roles(Role.ORGANIZER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  findAll(
    @Query() query: QueryMeetups,
  ): Promise<PaginatedResult<MeetupResponse>> {
    return this.meetupsService.findAll(query);
  }

  @Roles(Role.ORGANIZER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':id')
  findOne(@Param('id') id: string): Promise<MeetupResponse> {
    return this.meetupsService.findOne(+id);
  }

  @Roles(Role.ORGANIZER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMeetupDto: UpdateMeetupDto,
  ): Promise<MeetupResponse> {
    return this.meetupsService.update(+id, updateMeetupDto);
  }

  @Roles(Role.ORGANIZER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  remove(@Param('id') id: string): Promise<MeetupResponse> {
    return this.meetupsService.remove(+id);
  }
}
