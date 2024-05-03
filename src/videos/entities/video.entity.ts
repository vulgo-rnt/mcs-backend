import {
  Table,
  Column,
  Model,
  Unique,
  PrimaryKey,
  DataType,
  ForeignKey,
  BelongsToMany,
} from 'sequelize-typescript';
import { McVideo } from 'src/ associative/entities/mcVideo.entity';
import { Battle } from 'src/battles/entities/battle.entity';
import { Mc } from 'src/mcs/entities/mc.entity';

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
  date: Date;

  @BelongsToMany(() => Mc, () => McVideo)
  mcs: Mc[];
}
