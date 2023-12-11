import { JwtService } from '@nestjs/jwt';
import { PrismaService } from './../prisma/prisma.service';
import { Injectable, BadRequestException } from '@nestjs/common';
import * as bcrypt from 'bcrypt'
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly prismaService:PrismaService,
    private readonly jwtService:JwtService
    ){}

  private async hashingPassword(password:string) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
  }

  findById(id: string) {
    return this.prismaService.user.findFirst({where:{id}})
  }

  findByEmail(email: string) {
    return this.prismaService.user.findFirst({where:{email}})
  }

  async create(createUserDto: CreateUserDto) {
    const user = await this.findByEmail(createUserDto.email)
    if(user){
      throw new BadRequestException('Данный Email уже используется')
    }else{
      const hashedPassword = await this.hashingPassword(createUserDto.password)
      const user =  await this.prismaService.user.create({data:{email:createUserDto.email, password:hashedPassword}})
      const payload = {sub:user.id, email:user.email}
      return{access_token:this.jwtService.sign(payload), id:user.id, email:user.email}
    }
  }

  async remove(id: string) {
    const user = await this.findById(id)
    if(user){
      return this.prismaService.user.delete({where:{id}})
    }else{
      throw new BadRequestException('Пользователя с таким id не существует')
    }
  }

  findAll() {
    return this.prismaService.user.findMany()
  }

  async findOne(id:string) {
    const user = await this.prismaService.user.findFirst({where:{id}})
    if(user){
      return user
    }else{
      throw new BadRequestException('Пользователя с таким id не существует')
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.findById(id)
    if(user){
      return this.prismaService.user.update({where:{id}, data:{}})
    }else{
      throw new BadRequestException('Пользователя с таким id не существует')
    }
  }
}
