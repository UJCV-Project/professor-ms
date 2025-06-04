import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ProfessorService } from './professor.service';
import { CreateProfessorDto, GetProfessorDto, UpdateProfessorDto } from './dto';

@Controller()
export class ProfessorController {
  constructor(private readonly service: ProfessorService) {}

  @MessagePattern({ cmd: 'createProfessor' })
  async createProfessor(@Payload() dto: CreateProfessorDto) {
    return await this.service.createProfessor(dto);
  }

  @MessagePattern({ cmd: 'findAllProfessor' })
  async findAllProfessor(professorPagination: GetProfessorDto) {
    return await this.service.findAllProfessor(professorPagination);
  }

  @MessagePattern({ cmd: 'findProfessorByCode' })
  findProfessorByCode(@Payload() code: string) {
    return this.service.findProfessorByCode(code);
  }

  @MessagePattern({ cmd: 'updateProfessorByCode' })
  updateProfessorByCode(@Payload() payload: { code: string; data: UpdateProfessorDto }) {
    return this.service.updateProfessor(payload.code, payload.data);
  }
}
