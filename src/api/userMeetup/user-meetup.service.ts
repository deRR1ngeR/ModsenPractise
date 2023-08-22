import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { UserMeetupDto } from './dto/user-meetup.dto';
import { UserMeetupRepository } from './user-meetup.repository';

@Injectable()
export class UserMeetupService {

    constructor(private readonly userMeetupRepository: UserMeetupRepository) { }

    async addUserToMeetup(dto: UserMeetupDto, userId: number) {
        const result = await this.userMeetupRepository.findUserAndMeetup(dto, userId);
        if (result) {
            throw new HttpException('User already in Meetup', HttpStatus.NOT_ACCEPTABLE)
        }
        return await this.userMeetupRepository.addUserToMeetup(dto, userId);
    }

    async removeUserFromMeetup(meetupId: number, userId: number) {
        const result = await this.userMeetupRepository.removeUserFromMeetup(meetupId, userId);
        if (!result) {
            throw new HttpException('Not Found', HttpStatus.NOT_FOUND)
        }
        return result;
    }
}