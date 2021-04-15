import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { UsersModule } from './users/users.module';
import { AlbumsModule } from './albums/albums.module';
import { ArtistsModule } from './artists/artists.module';
import { SongsModule } from './songs/songs.module';

@Module({
  imports: [UserModule, UsersModule, AlbumsModule, ArtistsModule, SongsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
