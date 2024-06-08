import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateTaskDto, UpdateTaskDto } from './dto/task.dto';

@Injectable()
export class TasksService {
  constructor(private readonly databaseService: DatabaseService) {}

  create(createTaskDto: CreateTaskDto, userId: number) {
    return this.databaseService.task.create({
      data: { ...createTaskDto, userId },
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

  update(id: number, updateTaskDto: UpdateTaskDto, userId: number) {
    return this.databaseService.task.update({
      where: { id, userId },
      data: updateTaskDto,
    });
  }

  remove(id: number, userId: number) {
    return this.databaseService.task.delete({ where: { id, userId } });
  }
}
