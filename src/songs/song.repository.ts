import { EntityRepository, Repository } from 'typeorm';
import { CreateSongDto } from './dto/create-song.dto';
import { Song } from './song.entity';

@EntityRepository(Song)
export class SongRepository extends Repository<Song> {
  async createSong(createSongDto: CreateSongDto): Promise<Song> {
    const { title, duration } = createSongDto;

    const song = new Song();
    song.title = title;
    song.duration = duration;

    await song.save();
    return song;
  }
}
