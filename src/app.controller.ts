import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { TodoDto } from './dto/dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Get()
  getTodos(): Promise<TodoDto[]> {
    return this.appService.getTodos();
  }
  @Post()
  addTodo(@Body() todo:TodoDto):Promise<TodoDto[]>{
    return this.appService.addTodo(todo)
  }
  @Delete(':id')
  deleteTodo(@Param('id') id:string): Promise<TodoDto[]>{
    return this.appService.deleteTodo(id)
  }
  @Patch(':id')
  completeTodo(@Param('id') id:string):Promise<TodoDto[]>{
    return this.appService.completeTodo(id)
  }
  @Patch()
  retitleTodo(@Body() payload:{id:string, title:string}):Promise<TodoDto[]>{
    return this.appService.retitleTodo(payload.id, payload.title)
  }
}
