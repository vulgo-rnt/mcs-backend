import { ForeignKey, Model, Table } from 'sequelize-typescript';
import { Video } from 'src/videos/entities/video.entity';
import { Mc } from '../../mcs/entities/mc.entity';

@Table
export class McVideo extends Model {
  @ForeignKey(() => Mc)
  _mcId: string;

  @ForeignKey(() => Video)
  _videoId: string;
}
