import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiAcceptedResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UserEntity } from 'src/users/entities/user.entity';
import { CreateTaskDto, UpdateTaskDto } from './dto/task.dto';
import { TaskEntity } from './entitites/task.entity';
import { TasksService } from './tasks.service';

@Controller('tasks')
@ApiTags('Tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: TaskEntity })
  create(@Req() req: Request, @Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(createTaskDto, (req.user as UserEntity).id);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ isArray: true, type: TaskEntity })
  findAll(@Req() req: Request) {
    return this.tasksService.findAll((req.user as UserEntity).id);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: TaskEntity })
  findOne(@Req() req: Request, @Param('id', ParseIntPipe) id: number) {
    return this.tasksService.findOne(id, (req.user as UserEntity).id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiAcceptedResponse({ type: TaskEntity })
  update(
    @Req() req: Request,

    @Param('id', ParseIntPipe) id: number,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    return this.tasksService.update(
      id,
      updateTaskDto,
      (req.user as UserEntity).id,
    );
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: TaskEntity })
  remove(
    @Req() req: Request,

    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.tasksService.remove(id, (req.user as UserEntity).id);
  }
}
