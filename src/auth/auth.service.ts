import { UsersService } from './../users/users.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config'
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
  async signIn ( id:string, email:string, username:string){
    const payload = {id, email}
    const access_token = await this.jwtService.signAsync(payload)
    return {id, email, username, access_token}
  }
}
