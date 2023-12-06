import { IsEmpty, IsString } from "class-validator";

export class CreateTodoDto {
  @IsEmpty()
  @IsString()
  title: string
}
