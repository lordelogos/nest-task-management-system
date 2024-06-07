import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { TasksService } from './tasks.service';

// TODO: get `id` from requests when I set up AuthGuards

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post(':userId')
  create(
    @Param('userId') userId: string,
    @Body() createTaskDto: Prisma.TaskCreateInput,
  ) {
    return this.tasksService.create(createTaskDto, +userId);
  }

  @Get(':userId')
  findAll(@Param('userId') userId: string) {
    return this.tasksService.findAll(+userId);
  }

  @Get(':userId/:id')
  findOne(@Param('userId') userId: string, @Param('id') id: string) {
    return this.tasksService.findOne(+id, +userId);
  }

  @Patch(':userId/:id')
  update(
    @Param('userId') userId: string,
    @Param('id') id: string,
    @Body() updateTaskDto: Prisma.TaskUpdateInput,
  ) {
    return this.tasksService.update(+id, updateTaskDto, +userId);
  }

  @Delete(':userId/:id')
  remove(@Param('userId') userId: string, @Param('id') id: string) {
    return this.tasksService.remove(+id, +userId);
  }
}
