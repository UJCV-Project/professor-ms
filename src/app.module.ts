import { Module } from '@nestjs/common';
import { ProfessorModule } from './professor/professor.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [ProfessorModule, PrismaModule],
})
export class AppModule {}
