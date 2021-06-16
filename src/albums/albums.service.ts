import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Album } from './album.entity';
import { AlbumRepository } from './album.repository';
import { CreateAlbumDto } from './dto/create-album.dto';

@Injectable()
export class AlbumsService {
  constructor(
    @InjectRepository(AlbumRepository)
    private albumRepository: AlbumRepository,
  ) {}

  async getAllAlbums(): Promise<Album[]> {
    const found: Album[] = await this.albumRepository.find();
    if (!found) {
      throw new NotFoundException(`Albums not found`);
    }
    return found;
  }
  async getAlbumById(id: number): Promise<Album> {
    const found = await this.albumRepository.findOne(id, {
      relations: ['artist'],
    });
    if (!found) {
      throw new NotFoundException(`Album with ID ${id} not found`);
    }

    return found;
  }
  async createAlbum(createAlbumDto: CreateAlbumDto) {
    const insert = await this.albumRepository.createAlbum(createAlbumDto);
    if (!insert) {
      throw new Error('Album not inserted');
    }

    return insert;
  }

  async updateOneAlbum(id: number, createAlbumDto: CreateAlbumDto) {
    const album = await this.getAlbumById(id);
    console.log(album);
    if (!album) {
      throw new NotFoundException(`Album with ID ${id} not found`);
    }
    album.title = createAlbumDto.title;
    album.year = createAlbumDto.year;
    album.cover = createAlbumDto.cover;
    album.artist = createAlbumDto.artist;

    album.save();

    return album;
  }

  async deleteAlbumById(id: number): Promise<void> {
    const deleted = await this.albumRepository.delete(id);
    if (deleted.affected === 0) {
      throw new NotFoundException(`Album with ID "${id}" not found`);
    }
  }
}
