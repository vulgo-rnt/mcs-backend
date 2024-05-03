import {
  Table,
  Column,
  Model,
  Unique,
  PrimaryKey,
  DataType,
  BelongsToMany,
} from 'sequelize-typescript';
import { Video } from 'src/videos/entities/video.entity';
import { McVideo } from '../../ associative/entities/mcVideo.entity';

@Table
export class Mc extends Model<Mc> {
  @Unique
  @PrimaryKey
  @Column
  _mcId: string;

  @Column
  name: string;

  @Column
  regex: string;

  @Column(DataType.JSON)
  pictures: object;

  @Column(DataType.ARRAY(DataType.STRING))
  awards: Array<string>;

  @BelongsToMany(() => Video, () => McVideo)
  videos: Video[];
}
