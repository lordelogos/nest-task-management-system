import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { hash } from 'bcrypt';

const SALT = Number(process.env.ROUNDS_OF_HASHING);

@Injectable()
export class UserService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createUserDto: CreateUserDto) {
    const hashedPassword = await hash(createUserDto.password, SALT);

    createUserDto.password = hashedPassword;
    return this.databaseService.user.create({
      data: createUserDto,
    });
  }

  async findAll() {
    return this.databaseService.user.findMany();
  }

  async findOne(id: number) {
    return this.databaseService.user.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const hashedPassword = await hash(updateUserDto.password, SALT);

    updateUserDto.password = hashedPassword;
    return this.databaseService.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  async remove(id: number) {
    return this.databaseService.user.delete({ where: { id } });
  }
}
