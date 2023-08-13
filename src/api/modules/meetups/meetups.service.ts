import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateMeetupDto } from './dto/create-meetup.dto';
import { UpdateMeetupDto } from './dto/update-meetup.dto';
import { MeetupResponse } from './response/meetups.response';
import { MeetupsRepository } from './meetups.repository';

@Injectable()
export class MeetupsService {
  constructor(private readonly meetupsRepository: MeetupsRepository) { }

  async create(dto: CreateMeetupDto): Promise<MeetupResponse> {
    return await this.meetupsRepository.create(dto);
  }

  async findAll(): Promise<MeetupResponse[]> {
    const result = await this.meetupsRepository.findAll();
    if (!result)
      throw new HttpException('Requested content not found', HttpStatus.NOT_FOUND)
    return result;
  }

  async findOne(id: number): Promise<MeetupResponse> {
    const result = await this.meetupsRepository.findById(id);
    if (!result)
      throw new HttpException('Requested content not found', HttpStatus.NOT_FOUND)
    return result;
  }

  async update(id: number, updateMeetupDto: UpdateMeetupDto): Promise<MeetupResponse> {
    const result = await this.meetupsRepository.update(id, updateMeetupDto);
    if (!result)
      throw new HttpException('Requested content not found', HttpStatus.NOT_FOUND)
    return result;

  }

  async remove(id: number) {
    const result = await this.meetupsRepository.delete(id)
    if (!result)
      throw new HttpException('Requested content not found', HttpStatus.NOT_FOUND)
    return result;

  }
}
