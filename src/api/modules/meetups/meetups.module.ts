import { Module } from '@nestjs/common';

import { MeetupsService } from './meetups.service';
import { MeetupsController } from './meetups.controller';
import { MeetupsRepository } from './meetups.repository';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [MeetupsController],
  providers: [MeetupsService, MeetupsRepository],
  exports: [MeetupsService]
})
export class MeetupsModule { }
