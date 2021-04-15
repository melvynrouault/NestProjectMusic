import { IsNotEmpty } from "class-validator";


export class CreateSongDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  Duration: string;
  
}