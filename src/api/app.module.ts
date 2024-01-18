import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { MeetupsModule } from './modules/meetups/meetups.module';
import { PrismaModule } from './modules/prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { SessionsModule } from './modules/sessions/sessions.module';
import { UserMeetupModule } from './userMeetup/user-meetup.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MeetupsModule,
    PrismaModule,
    AuthModule,
    UsersModule,
    SessionsModule,
    UserMeetupModule,
  ],
})
export class AppModule {}
