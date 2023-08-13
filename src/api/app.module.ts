import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { MeetupsModule } from './modules/meetups/meetups.module';
import { PrismaModule } from './modules/prisma/prisma.module';

@Module({
    imports: [ConfigModule.forRoot(), MeetupsModule, PrismaModule]
})
export class AppModule { }
