import {
  Table,
  Column,
  Model,
  Unique,
  PrimaryKey,
  DataType,
  ForeignKey,
} from 'sequelize-typescript';
import { Battle } from 'src/battles/entities/battle.entity';

@Table
export class Video extends Model<Video> {
  @PrimaryKey
  @Unique
  @Column
  _videoId: string;

  @ForeignKey(() => Battle)
  @Column
  battle: string;

  @Column
  link: string;

  @Column
  title: string;

  @Column(DataType.JSON)
  thumbnail: object;

  @Column
  date: string;
}
