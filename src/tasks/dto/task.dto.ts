import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  title: string;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({ required: false, default: false })
  isComplete?: boolean;
}

export class UpdateTaskDto extends PartialType(CreateTaskDto) {}
