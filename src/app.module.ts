import { Module } from '@nestjs/common';
import { ProfessorModule } from './professor/professor.module';
import { PrismaModule } from './prisma/prisma.module';
import { AvailabilityModule } from './availability/availability.module';

@Module({
  imports: [ProfessorModule, PrismaModule, AvailabilityModule],
})
export class AppModule {}
