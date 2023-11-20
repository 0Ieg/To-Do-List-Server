import { Injectable } from '@nestjs/common';
import { TodoDto } from './dto/dto';
import { db } from './db';

@Injectable()
export class AppService {
  async getTodos(): Promise<TodoDto[]> {
    const todos = (await db.query('select * from todos')).rows
    return todos
  }
  async addTodo(todo:TodoDto):Promise<TodoDto[]>{
    const {todo_id, todo_title, todo_completed} = todo
    await db.query('insert into todos values ($1, $2, $3)',[todo_id, todo_title, todo_completed])
    return this.getTodos()
  }
  async deleteTodo(id:string):Promise<TodoDto[]>{
    await db.query('delete from todos where todo_id=$1',[id])
    return this.getTodos()
  }
  async completeTodo(id:string): Promise<TodoDto[]>{
    await db.query('update todos set todo_completed = not todo_completed where todo_id=$1',[id])
    return this.getTodos()
  }
  async retitleTodo(id:string, title:string):Promise<TodoDto[]>{
    await db.query('update todos set todo_title = $1 where todo_id=$2',[title, id])
    return this.getTodos()
  }
}
