import { IsEmpty, IsString } from "class-validator";

export class UpdateTodoDto {
  @IsEmpty()
  @IsString()
  title:string
}
