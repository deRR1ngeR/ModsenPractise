import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { CreateMeetupDto } from './dto/create-meetup.dto';
import { UpdateMeetupDto } from './dto/update-meetup.dto';
import { MeetupResponse } from './response/meetups.response';
import { MeetupsRepository } from './meetups.repository';
import { PaginationDto } from 'src/api/pagination/dto/pagination.dto';
import { PaginatedResult } from 'src/api/pagination/interface/paginator.interface';
import { QueryMeetups } from './dto/query-meetups.dto';

@Injectable()
export class MeetupsService {
  constructor(private readonly meetupsRepository: MeetupsRepository) {}

  async create(dto: CreateMeetupDto, creator: number): Promise<MeetupResponse> {
    return await this.meetupsRepository.create(dto, creator);
  }

  async findAll(query: QueryMeetups): Promise<PaginatedResult<MeetupResponse>> {
    const result = await this.meetupsRepository.findAll(query);
    if (!result)
      throw new HttpException(
        'Requested content not found',
        HttpStatus.NOT_FOUND,
      );
    return result;
  }

  async findOne(id: number): Promise<MeetupResponse> {
    const result = await this.meetupsRepository.findById(id);
    if (!result)
      throw new HttpException(
        'Requested content not found',
        HttpStatus.NOT_FOUND,
      );
    return result;
  }

  async update(
    id: number,
    updateMeetupDto: UpdateMeetupDto,
  ): Promise<MeetupResponse> {
    const result = await this.meetupsRepository.update(id, updateMeetupDto);
    if (!result)
      throw new HttpException(
        'Requested content not found',
        HttpStatus.NOT_FOUND,
      );
    return result;
  }

  async remove(id: number) {
    const result = await this.meetupsRepository.delete(id);
    if (!result)
      throw new HttpException(
        'Requested content not found',
        HttpStatus.NOT_FOUND,
      );
    return result;
  }
}
