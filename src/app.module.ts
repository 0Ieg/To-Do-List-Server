import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { TodosModule } from './todos/todos.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [PrismaModule, TodosModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
