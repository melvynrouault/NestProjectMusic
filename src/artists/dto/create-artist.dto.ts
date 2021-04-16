import { IsNotEmpty } from 'class-validator';
import { Album } from 'src/albums/album.entity';

export class CreateArtistDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  isBand: boolean;
}
