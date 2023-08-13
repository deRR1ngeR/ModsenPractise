import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';

import { MeetupsService } from './meetups.service';
import { CreateMeetupDto } from './dto/create-meetup.dto';
import { UpdateMeetupDto } from './dto/update-meetup.dto';
import { MeetupResponse } from './response/meetups.response';

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

  @Get()
  findAll() {
    return this.meetupsService.findAll();
  }

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
