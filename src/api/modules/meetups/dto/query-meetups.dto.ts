import { PaginationDto } from 'src/api/pagination/dto/pagination.dto';
import { CreateMeetupDto } from './create-meetup.dto';
import { ApiProperty } from '@nestjs/swagger';
import { SortType } from 'src/api/constants/sort';

export class QueryMeetups implements PaginationDto, CreateMeetupDto {
  @ApiProperty({ required: false })
  name: string;

  @ApiProperty({ required: false })
  tags: string[];

  @ApiProperty({ required: false })
  date: Date;

  @ApiProperty({ required: false })
  location: string;

  @ApiProperty({ required: true })
  page: string;

  @ApiProperty({ required: true })
  size: string;

  @ApiProperty({ required: false })
  sortById: SortType;

  @ApiProperty({ required: false })
  sortByDate: SortType;
}
