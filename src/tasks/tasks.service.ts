import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class TasksService {
  constructor(private readonly databaseService: DatabaseService) {}

  create(createTaskDto: Prisma.TaskCreateInput, userId: number) {
    return this.databaseService.task.create({
      data: { ...createTaskDto, userId } as Prisma.TaskCreateInput, // confirm this
    });
  }

  findAll(userId: number) {
    return this.databaseService.task.findMany({
      where: { userId },
    });
  }

  findOne(id: number, userId: number) {
    return this.databaseService.task.findFirst({
      where: { id, userId },
    });
  }

  update(id: number, updateTaskDto: Prisma.TaskUpdateInput, userId: number) {
    return this.databaseService.task.update({
      where: { id, userId },
      data: updateTaskDto,
    });
  }

  remove(id: number, userId: number) {
    return this.databaseService.task.delete({ where: { id, userId } });
  }
}
