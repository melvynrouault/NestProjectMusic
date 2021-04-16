import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { Album } from './album.entity';
import { AlbumsService } from './albums.service';
import { CreateAlbumDto } from './dto/create-album.dto';

@Controller('album')
export class AlbumsController {
  constructor(private albumService: AlbumsService) {}

  @Get('/:id')
  async getAlbumById(@Param('id', ParseIntPipe) id: number): Promise<Album> {
    return this.albumService.getAlbumById(id);
  }

  @Post('/createAlbum')
  createAlbum(@Body() createAlbumDto: CreateAlbumDto) {
    return this.albumService.createAlbum(createAlbumDto);
  }

  @Delete('/:id')
  async deleteAlbumById(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.albumService.deleteAlbumById(id);
  }

  @Patch('/updateAlbum/:id')
  updateOneTask(
    @Param('id', ParseIntPipe) id: number,
    @Body() createAlbumDto: CreateAlbumDto,
  ) {
    return this.albumService.updateOneAlbum(id, createAlbumDto);
  }
}
