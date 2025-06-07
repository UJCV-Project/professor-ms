import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AvailabilityService } from './availability.service';
import { AvailabilityDto } from './dto/availability.dto';

@Controller()
export class AvailabilityController {
  constructor(private readonly availabilityService: AvailabilityService) { }


  @MessagePattern({ cmd: 'findAvailabilityById' })
  findAvailabilitySchedule(@Payload() professorId: string) {
    return this.availabilityService.findAvailabilitySchedule(professorId);
  }

  @MessagePattern({ cmd: 'saveAvailabilitySchedule' })
  saveAvailabilitySchedule(@Payload() availabilitySlots: AvailabilityDto) {
    return this.availabilityService.saveAvailabilitySchedule(availabilitySlots);
  }
}
