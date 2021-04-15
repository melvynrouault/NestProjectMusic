import { IsNotEmpty } from "class-validator";


export class CreateUserDto {
  @IsNotEmpty()
  mail: string;

  @IsNotEmpty()
  password: number;
  
}