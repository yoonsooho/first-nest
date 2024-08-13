import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from '@prisma/client';
import { PrismaService } from 'src/prisma.client';

@Injectable()
export class TodosService {
  constructor(private prismaService: PrismaService) {}
  async create(createTodoDto: CreateTodoDto): Promise<Todo> {
    return this.prismaService.todo.create({
      data: {
        title: createTodoDto.todo,
        isDone: createTodoDto.is_done,
      },
    });
  }

  findAll(): Promise<Todo[]> {
    return this.prismaService.todo.findMany();
  }

  findOne(id: number): Promise<Todo> {
    return this.prismaService.todo.findUnique({
      where: {
        id: id,
      },
    });
  }

  update(id: number, updateTodoDto: UpdateTodoDto) {
    return this.prismaService.todo.update({
      where: {
        id: id,
      },
      data: {
        title: updateTodoDto.todo,
        isDone: updateTodoDto.is_done,
        updatedAt: new Date(),
      },
    });
  }

  remove(id: number) {
    return this.prismaService.todo.delete({
      where: {
        id: id,
      },
    });
  }
}
