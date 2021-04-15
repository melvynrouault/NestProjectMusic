import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateSongDto } from './dto/create-song.dto';
import { Song } from './song.entity';
import { SongRepository } from './song.repository';

@Injectable()
export class SongsService {
  constructor(
    @InjectRepository(SongRepository)
    private songRepository: SongRepository,
  ) {}

  async getSongById(id: number): Promise<Song> {
    const found = await this.songRepository.findOne(id);
    if (!found) {
      throw new NotFoundException(`Song with ID ${id} not found`);
    }

    return found;
  }
  async createSong(createSongDto: CreateSongDto) {
    const insert = await this.songRepository.createSong(createSongDto);
    if (!insert) {
      throw new Error('Song not inserted');
    }

    return insert;
  }

  async deleteSongById(id: number): Promise<void> {
    const deleted = await this.songRepository.delete(id);
    if (deleted.affected === 0) {
      throw new NotFoundException(`Song with ID "${id}" not found`);
    }
  }
}
