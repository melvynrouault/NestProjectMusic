import { IsNotEmpty } from 'class-validator';
import { Album } from 'src/albums/album.entity';

export class CreateUserDto {
  @IsNotEmpty()
  mail: string;

  @IsNotEmpty()
  password: string;

  albums: Album[];
}
