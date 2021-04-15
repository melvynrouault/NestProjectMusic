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
  constructor(private userService: SongsService) {}

  @Get('/:id')
  async getTaskById(@Param('id', ParseIntPipe) id: number): Promise<Song> {
    return this.userService.getSongById(id);
  }

  @Post('/createSong')
  createTask(@Body() createSongDto: CreateSongDto) {
    return this.userService.createSong(createSongDto);
  }

  @Delete('/:id')
  async deleteSongById(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.userService.deleteSongById(id);
  }
}
