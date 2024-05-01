import {
  Column,
  DataType,
  HasMany,
  Model,
  PrimaryKey,
  Table,
  Unique,
} from 'sequelize-typescript';
import { Video } from 'src/videos/entities/video.entity';

@Table
export class Battle extends Model {
  @PrimaryKey
  @Unique
  @Column(DataType.UUID)
  _battleId: string;

  @Column
  name: string;

  @Column(DataType.TEXT('medium'))
  description: string;

  @Column(DataType.TEXT)
  banner: string;

  @Column
  logo: string;

  @Column(DataType.JSON)
  links: object;

  @HasMany(() => Video)
  videos: Video[];

  @Column
  date: string;

  @Column
  location: string;
}
