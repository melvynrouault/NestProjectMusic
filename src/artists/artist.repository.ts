import { EntityRepository, Repository } from 'typeorm';
import { Artist } from './artist.entity';
import { CreateArtistDto } from './dto/create-artist.dto';

@EntityRepository(Artist)
export class ArtistRepository extends Repository<Artist> {
  async createArtist(createArtistDto: CreateArtistDto): Promise<Artist> {
    const { name, isBand } = createArtistDto;

    const artist = new Artist();
    artist.name = name;
    artist.isBand = isBand;

    await artist.save();
    return artist;
  }
}
