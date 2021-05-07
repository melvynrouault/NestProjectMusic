import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { Artist } from './artist.entity';
import { ArtistsService } from './artists.service';
import { CreateArtistDto } from './dto/create-artist.dto';

@Controller('artist')
export class ArtistsController {
  constructor(private artistService: ArtistsService) {}

  @Get('/all')
  async getAllAlbums(): Promise<Artist[]> {
    return this.artistService.getAllArtists();
  }

  @Get('/:id')
  async getArtistById(@Param('id', ParseIntPipe) id: number): Promise<Artist> {
    return this.artistService.getArtistById(id);
  }

  @Post('/createArtist')
  createArtist(@Body() createArtistDto: CreateArtistDto) {
    return this.artistService.createArtist(createArtistDto);
  }

  @Delete('/:id')
  async deleteArtistById(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.artistService.deleteArtistById(id);
  }
}
