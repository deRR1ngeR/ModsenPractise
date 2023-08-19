import { Module } from '@nestjs/common';
import { SessionService } from './sessions.service';
import { SessionRepository } from './sessions.repository';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
    imports: [PrismaModule],
    providers: [SessionService, SessionRepository],
    exports: [SessionService]
})
export class SessionsModule { }
