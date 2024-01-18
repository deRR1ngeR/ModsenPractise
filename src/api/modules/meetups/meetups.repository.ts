import { Injectable } from '@nestjs/common';

import { CreateMeetupDto } from './dto/create-meetup.dto';
import { MeetupResponse } from './response/meetups.response';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateMeetupDto } from './dto/update-meetup.dto';
import {
  PaginateFunction,
  PaginatedResult,
  paginator,
} from '../../pagination/interface/paginator.interface';
import { QueryMeetups } from './dto/query-meetups.dto';

@Injectable()
export class MeetupsRepository {
  constructor(private readonly db: PrismaService) {}

  async create(dto: CreateMeetupDto, creator: number): Promise<MeetupResponse> {
    return await this.db.meetup.create({
      data: {
        ...dto,
        creator: creator,
      },
    });
  }

  async findAll(query: QueryMeetups): Promise<PaginatedResult<MeetupResponse>> {
    const where = {
      name: query?.name,
      date: query?.date,
      location: query?.location,
      tags: query?.tags,
    };

    const orderBy = {
      date: query?.sortByDate,
      id: query?.sortById,
    };

    const paginate: PaginateFunction = paginator({ perPage: query.size });
    return await paginate(
      this.db.meetup,
      {
        where,
        orderBy,
      },
      {
        page: query.page,
      },
    );
  }

  async findById(id: number): Promise<MeetupResponse> {
    return await this.db.meetup.findUnique({
      where: {
        id: id,
      },
    });
  }

  async update(id: number, dto: UpdateMeetupDto): Promise<MeetupResponse> {
    try {
      return await this.db.meetup.update({
        where: {
          id: id,
        },
        data: {
          ...dto,
        },
      });
    } catch (err) {
      return;
    }
  }

  async delete(id: number): Promise<MeetupResponse> {
    try {
      return await this.db.meetup.delete({
        where: {
          id: id,
        },
      });
    } catch (err) {
      return;
    }
  }
}
