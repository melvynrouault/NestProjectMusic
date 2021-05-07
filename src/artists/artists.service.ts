import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Artist } from './artist.entity';
import { ArtistRepository } from './artist.repository';
import { CreateArtistDto } from './dto/create-artist.dto';

@Injectable()
export class ArtistsService {
  constructor(
    @InjectRepository(ArtistRepository)
    private artistRepository: ArtistRepository,
  ) {}

  async getAllArtists(): Promise<Artist[]> {
    const found: Artist[] = await this.artistRepository.find();
    if (!found) {
      throw new NotFoundException(`Artists not found`);
    }
    return found;
  }

  async getArtistById(id: number): Promise<Artist> {
    const found = await this.artistRepository.findOne(id);
    if (!found) {
      throw new NotFoundException(`Artist with ID ${id} not found`);
    }

    return found;
  }
  async createArtist(createArtistDto: CreateArtistDto) {
    const insert = await this.artistRepository.createArtist(createArtistDto);
    if (!insert) {
      throw new Error('Artist not inserted');
    }

    return insert;
  }

  async deleteArtistById(id: number): Promise<void> {
    const deleted = await this.artistRepository.delete(id);
    if (deleted.affected === 0) {
      throw new NotFoundException(`Artist with ID "${id}" not found`);
    }
  }
}
