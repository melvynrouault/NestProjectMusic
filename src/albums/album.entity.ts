import { Artist } from 'src/artists/artist.entity';
import { Song } from 'src/songs/song.entity';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Album extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  title: string;
  @Column()
  year: number;
  @Column()
  cover: string;
  @ManyToOne(() => Artist, (artist: Artist) => artist.albums)
  public artist: Artist;

  @OneToMany(() => Song, (song: Song) => song.id)
  public songs: Song[];
}
