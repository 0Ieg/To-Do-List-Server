import { UsersService } from './../users/users.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt'


@Injectable()
export class AuthService {
  constructor(private readonly usersService:UsersService){}
  async signIn(email:string, password:string) {
    const user = await this.usersService.findByEmail(email)
    if(user){
      const isMatch = await bcrypt.compare(password, user.password)
      if(isMatch){
        
      }else{
        throw new UnauthorizedException('Email or password entered incorrectly')
      }
    }else{
      throw new UnauthorizedException('The user with this email was not found')
    }
  }
}
