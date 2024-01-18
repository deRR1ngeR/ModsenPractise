import { Injectable } from '@nestjs/common';
import { PrismaService } from '../modules/prisma/prisma.service';
import { UserMeetupDto } from './dto/user-meetup.dto';

@Injectable()
export class UserMeetupRepository {
  constructor(private readonly db: PrismaService) {}

  async addUserToMeetup(dto: UserMeetupDto, userId: number) {
    return this.db.userMeetup.create({
      data: {
        ...dto,
        userId,
      },
    });
  }

  async findUserAndMeetup(dto: UserMeetupDto, userId: number) {
    return await this.db.userMeetup.findUnique({
      where: {
        userId_meetupId: {
          userId,
          ...dto,
        },
      },
    });
  }

  async removeUserFromMeetup(meetupId: number, userId: number) {
    try {
      return await this.db.userMeetup.delete({
        where: {
          userId_meetupId: { userId, meetupId },
        },
      });
    } catch (err) {
      return;
    }
  }
}
