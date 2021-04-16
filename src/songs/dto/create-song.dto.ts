/* eslint-disable prettier/prettier */
import { IsNotEmpty } from "class-validator";
import { Album } from "src/albums/album.entity";


export class CreateSongDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  duration: string;

  album: Album;
  
}