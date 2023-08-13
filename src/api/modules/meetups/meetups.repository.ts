import { Injectable } from '@nestjs/common';

import { CreateMeetupDto } from './dto/create-meetup.dto';
import { MeetupResponse } from './response/meetups.response';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateMeetupDto } from './dto/update-meetup.dto';

@Injectable()
export class MeetupsRepository {
    constructor(private readonly db: PrismaService) { }

    async create(dto: CreateMeetupDto): Promise<MeetupResponse> {
        return await this.db.meetup.create({
            data: {
                ...dto,
                creator: 1,

            }
        });
    }

    async findAll(): Promise<MeetupResponse[]> {
        return await this.db.meetup.findMany();
    }

    async findById(id: number): Promise<MeetupResponse> {
        return await this.db.meetup.findUnique({
            where: {
                id: id
            }
        }
        );
    }

    async update(id: number, dto: UpdateMeetupDto): Promise<MeetupResponse> {
        return await this.db.meetup.update({
            where: {
                id: id
            },
            data: {
                ...dto
            }
        })
    }

    async delete(id: number): Promise<MeetupResponse> {
        try {
            return await this.db.meetup.delete({
                where: {
                    id: id
                }
            })
        }
        catch (err) {
            return
        }

    }



}