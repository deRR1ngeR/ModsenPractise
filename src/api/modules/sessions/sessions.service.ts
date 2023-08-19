import { Injectable } from '@nestjs/common';

import { SessionRepository } from './sessions.repository';

@Injectable()
export class SessionService {
    constructor(private readonly sessionRepository: SessionRepository) { }

    async createOrUpdateSession(userId: number, refreshToken: string): Promise<void> {
        return await this.sessionRepository.createOrUpdateSession(userId, refreshToken);
    }

    async getRefreshToken(userId: number) {
        return (await this.sessionRepository.getRefreshToken(userId)).refreshToken;
    }

}