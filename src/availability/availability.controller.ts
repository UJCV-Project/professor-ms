import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AvailabilityService } from './availability.service';
import { AvailabilityDto } from './dto/availability.dto';

@Controller()
export class AvailabilityController {
  constructor(private readonly availabilityService: AvailabilityService) {}

  @MessagePattern('findAvailabilityById')
  findAvailabilitySchedule(@Payload() id: string) {
    return this.availabilityService.findAvailabilitySchedule(id);
  }

  @MessagePattern('updateAvailabilitySchedule')
  updateAvailabilitySchedule(@Payload() availabilitySlots: AvailabilityDto) {
    return this.availabilityService.updateAvailabilitySchedule(availabilitySlots);
  }


}
