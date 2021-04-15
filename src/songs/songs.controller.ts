import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { CreateSongDto } from './dto/create-song.dto';
import { Song } from './song.entity';
import { SongsService } from './songs.service';

@Controller('song')
export class SongsController {
  constructor(private songService: SongsService) {}

  @Get('/:id')
  async getSongById(@Param('id', ParseIntPipe) id: number): Promise<Song> {
    return this.songService.getSongById(id);
  }

  @Post('/createSong')
  createSong(@Body() createSongDto: CreateSongDto) {
    return this.songService.createSong(createSongDto);
  }

  @Delete('/:id')
  async deleteSongById(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.songService.deleteSongById(id);
  }
}
