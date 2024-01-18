import { Module } from '@nestjs/common';
import { UserMeetupsController } from './user-meetup.controller';
import { UserMeetupService } from './user-meetup.service';
import { UserMeetupRepository } from './user-meetup.repository';
import { PrismaModule } from '../modules/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [UserMeetupsController],
  providers: [UserMeetupService, UserMeetupRepository],
})
export class UserMeetupModule {}
