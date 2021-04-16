import { EntityRepository, Repository } from 'typeorm';
import { Album } from './album.entity';
import { CreateAlbumDto } from './dto/create-album.dto';

@EntityRepository(Album)
export class AlbumRepository extends Repository<Album> {
  async createAlbum(createAlbumDto: CreateAlbumDto): Promise<Album> {
    const { title, year, cover } = createAlbumDto;

    const album = new Album();
    album.title = title;
    album.year = year;
    album.cover = cover;

    await album.save();
    return album;
  }
}
