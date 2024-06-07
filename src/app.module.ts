import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './users/users.module';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [DatabaseModule, UserModule, TasksModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
