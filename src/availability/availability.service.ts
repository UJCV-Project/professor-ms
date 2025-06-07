import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { AvailabilityDto, AvailableSlot } from './dto/availability.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class AvailabilityService {
  constructor(private prisma: PrismaService) { }
  logger = new Logger('Available Service');

  async saveAvailabilitySchedule(availabilityDto: AvailabilityDto) {
    this.logger.warn(availabilityDto);
    const { professorId, slots } = availabilityDto;
    const mergedSlots = this.mergeSlots(slots);

    await this.prisma.availability.deleteMany({
      where: { professorId },
    });

    const newAvailableSchedule = await this.prisma.availability.createMany({
      data: mergedSlots.map(slot => ({
        professorId,
        dayOfWeek: slot.dayOfWeek,
        startTime: slot.startTime,
        endTime: slot.endTime,
      })),
    });

    return newAvailableSchedule;
  }

  mergeSlots(slots: AvailableSlot[]): AvailableSlot[] {
    const merged: AvailableSlot[] = [];

    const groupedByDay = new Map<number, AvailableSlot[]>();

    for (const slot of slots) {
      if (!groupedByDay.has(slot.dayOfWeek)) {
        groupedByDay.set(slot.dayOfWeek, []);
      }
      groupedByDay.get(slot.dayOfWeek)!.push(slot);
    }

    for (const [day, daySlots] of groupedByDay.entries()) {
      const sorted = daySlots.sort((a, b) => a.startTime - b.startTime);
      const reduced: AvailableSlot[] = [sorted[0]];

      for (let i = 1; i < sorted.length; i++) {
        const prev = reduced[reduced.length - 1];
        const current = sorted[i];

        if (current.startTime <= prev.endTime) {
          prev.endTime = Math.max(prev.endTime, current.endTime);
        } else {
          reduced.push(current);
        }
      }
      merged.push(...reduced);
    }
    return merged;
  }


  async findAvailabilitySchedule(professorId: string) {
    const availableSchedule = await this.prisma.availability.findMany({
      where: { professorId },
      orderBy: { dayOfWeek: 'asc' },
    });

    if (availableSchedule.length === 0) {
      const response = {
        message: `El catedrático no tiene información sobre su horario disponible`,
        error: 'No se ha encontrado información',
        statusCode: HttpStatus.NOT_FOUND,
      }
      throw new RpcException({ response });
    }
    return availableSchedule;
  }
}
