import { PrismaService } from './../prisma/prisma.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodosService {
  constructor(private readonly prismaService:PrismaService){}
    findOne(idOrTitle: string) {
    return this.prismaService.todo.findFirst({where:{OR:[{id:idOrTitle}, {title:idOrTitle}]}})
  }

  findAll() {
    return this.prismaService.todo.findMany({orderBy:{created:'desc'}});
  }

  async create(createTodoDto: CreateTodoDto) {
    const isExists = await this.findOne(createTodoDto.title)
    if (isExists){
      throw new BadRequestException('This case is already on the list')
    }else{
      await this.prismaService.todo.create({data:{title:createTodoDto.title, userId:'1212'}})
      return this.findAll()
    }
  }
  async remove(id: string) {
    const isExists = this.findOne(id)
    if(isExists){
      await this.prismaService.todo.delete({where:{id:id}})
      return this.findAll()
    }else{
      throw new BadRequestException(`The element with the id '${id}' was not found`)
    }
  }

  async update(id: string, updateTodoDto: UpdateTodoDto) {
    const isExists = await this.findOne(id)
    if(isExists){
      await this.prismaService.todo.update({where:{id:id}, data:{title:updateTodoDto.title, completed:!isExists.completed}})
      return this.findAll()
    }else{
      throw new BadRequestException(`The element with the id '${id}' was not found`)
    }
  }
}
