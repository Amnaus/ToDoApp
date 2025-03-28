import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTodoInput } from './dto/create-todo.input';
import { UpdateTodoInput } from './dto/update-todo.input';

@Injectable()
export class TodoService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createTodoInput: CreateTodoInput) {
    console.log('Creating new todo with:', createTodoInput); // Debugging input

    const newTodo = await this.prisma.todo.create({
      data: {
        title: createTodoInput.title,
      },
    });

    console.log('Prisma created todo:', newTodo); // Debugging output
    return newTodo; // Ensure we're returning the created object
  }

  async findAll() {
    return this.prisma.todo.findMany();
  }

  async findOne(id: number) {
    return this.prisma.todo.findUnique({ where: { id } });
  }

  async update(id: number, updateTodoInput: UpdateTodoInput) {
    return this.prisma.todo.update({
      where: { id },
      data: updateTodoInput,
    });
  }

  async remove(id: number) {
    return this.prisma.todo.delete({ where: { id } });
  }
}
