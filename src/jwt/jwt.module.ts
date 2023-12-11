import { Module, Global } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule  } from '@nestjs/jwt';

@Global()
@Module({
  imports:[
    JwtModule.registerAsync({
      imports:[ConfigModule],
      inject:[ConfigService],
      useFactory:(configService:ConfigService)=>({
        global:true,
        secret:configService.get('SECRET_FOR_JWT'),
        signOptions:{expiresIn:configService.get('EXPIRESIN')}
      })
    }),
  ],
  exports:[JwtModule]
})
export class MyGlobalJwtModule {}
