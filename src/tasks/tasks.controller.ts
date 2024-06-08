import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiAcceptedResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateTaskDto, UpdateTaskDto } from './dto/task.dto';
import { TaskEntity } from './entitites/task.entity';
import { TasksService } from './tasks.service';

// TODO: get `id` from requests when I set up AuthGuards

@Controller('tasks')
@ApiTags('Tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post(':userId')
  @ApiCreatedResponse({ type: TaskEntity })
  create(
    @Param('userId') userId: string,
    @Body() createTaskDto: CreateTaskDto,
  ) {
    return this.tasksService.create(createTaskDto, +userId);
  }

  @Get(':userId')
  @ApiOkResponse({ isArray: true, type: TaskEntity })
  findAll(@Param('userId') userId: string) {
    return this.tasksService.findAll(+userId);
  }

  @Get(':userId/:id')
  @ApiOkResponse({ type: TaskEntity })
  findOne(
    @Param('userId') userId: string,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.tasksService.findOne(id, +userId);
  }

  @Patch(':userId/:id')
  @ApiAcceptedResponse({ type: TaskEntity })
  update(
    @Param('userId') userId: string,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    return this.tasksService.update(id, updateTaskDto, +userId);
  }

  @Delete(':userId/:id')
  @ApiOkResponse({ type: TaskEntity })
  remove(
    @Param('userId') userId: string,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.tasksService.remove(id, +userId);
  }
}
