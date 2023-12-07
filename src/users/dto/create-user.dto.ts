import { IsEmail, IsNotEmpty, MinLength, IsString } from 'class-validator'
export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string
}