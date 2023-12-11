import { UsersService } from './../users/users.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt'


@Injectable()
export class AuthService {
  constructor(
    private readonly usersService:UsersService,
    private readonly jwtService:JwtService,
    ){}
  async validateUser(email:string, password:string) {
    const user = await this.usersService.findByEmail(email)
    if(user){
      const isMatch = await bcrypt.compare(password, user.password)
      if(isMatch){
        const {password, role, ...result} = user
        return result
      }else{
        throw new UnauthorizedException('Email or password entered incorrectly')
      }
    }else{
      throw new UnauthorizedException('The user with this email was not found')
    }
  }

  async login (user:any){
    const payload = {sub:user.id, email:user.email}
    return {access_token: this.jwtService.sign(payload)}
  }
}
