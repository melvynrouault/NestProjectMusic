import { Album } from 'src/albums/album.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ unique: true })
  mail: string;
  @Column()
  password: string;
  @ManyToMany(() => Album)
  @JoinTable()
  public albums: Album[];
}
