import { Module, Injectable } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'


@Module({
  imports:[
    UsersModule,
    ConfigModule,
    JwtModule.registerAsync({
      imports:[ConfigModule],
      inject:[ConfigService],
      useFactory:(configService:ConfigService)=>({
        global:true,
        secret:configService.get('SECRET_FOR_JWT'),
        signOptions:{expiresIn:configService.get('EXPIRESIN')}
      })
    })
  ],
  controllers: [AuthController],
  providers: [AuthService],
})

export class AuthModule {}
