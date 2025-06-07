import { Injectable } from '@nestjs/common';
import { AvailabilityDto } from './dto/availability.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AvailabilityService {
  constructor(private prisma: PrismaService) { }

  updateAvailabilitySchedule(availabilityDto: AvailabilityDto) {
    return 'This action adds a new availability';
  }

  findAvailabilitySchedule(id: string) {
    return this.prisma.ava
  }
}
