import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProfessorDto, GetProfessorDto, UpdateProfessorDto } from './dto';
import { RpcException } from '@nestjs/microservices';
import { NotFoundError } from 'rxjs';

@Injectable()
export class ProfessorService {
  constructor(private prisma: PrismaService) { }


  async createProfessor(data: CreateProfessorDto) {
    const result = await this.createProfessorEntry(data);
    return result;
  }

  async createProfessorEntry(data: CreateProfessorDto) {
    try {
      const result = await this.prisma.professor.create({ data });
      return result;
    } catch (error) {
      if (error.code === "P2002") {
        const response = {
          message: `El campo ${error.meta.target[0]} está duplicado`,
          error: 'Campos Duplicados',
          statusCode: HttpStatus.CONFLICT,
        }
        throw new RpcException({ response });
      }
    }
  }

  async findAllProfessor(professorPagination: GetProfessorDto) {
    const { page, limit, ...conditions } = professorPagination;

    const totalPages = await this.prisma.professor.count({ where: conditions });
    const lastPage = Math.ceil(totalPages / (limit ? limit : 10));

    return {
      data: await this.prisma.professor.findMany({
        skip: ((page ? page : 1) - 1) * (limit ? limit : 10),
        take: limit,
        where: conditions
      }),
      metadata: {
        total: totalPages,
        page: page,
        lastPage: lastPage,
      },
    };
  }

  async findProfessorByCode(code: string) {
    const data = await this.prisma.professor.findUnique({
      where: { code },
    });

    if (data === null) {
      const response = {
        message: `No se ha encontrado ningún profesor con el código ${code}`,
        error: 'No hay registro',
        statusCode: HttpStatus.NOT_FOUND,
      }
      throw new RpcException({response});
    }

    const result = { data };
    return result;
  }

  async updateProfessor(code: string, data: UpdateProfessorDto) {
    await this.findProfessorByCode(code);
    const result = await this.updateProfessorEntry(code, data);
    return result;
  }

  async updateProfessorEntry(code: string, data: UpdateProfessorDto) {
    try {
      const result = await this.prisma.professor.update({ where: { code }, data });
      return result;
    } catch (error) {
      if (error.code === "P2002") {
        const response = {
          message: `El campo ${error.meta.target[0]} está duplicado`,
          error: 'Campos Duplicados',
          statusCode: HttpStatus.CONFLICT,
        }
        throw new RpcException({ response });
      }
    }
  }

}
