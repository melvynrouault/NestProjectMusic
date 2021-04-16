import { Album } from 'src/albums/album.entity';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Song extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  title: string;
  @Column()
  duration: string;

  @ManyToOne(() => Album, (album: Album) => album.songs)
  public album: Album;
}
