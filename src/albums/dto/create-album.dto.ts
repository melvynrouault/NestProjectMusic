import { IsNotEmpty } from 'class-validator';
import { Artist } from 'src/artists/artist.entity';

export class CreateAlbumDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  year: number;

  @IsNotEmpty()
  cover: string;

  artist: Artist;
}
