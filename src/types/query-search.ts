import { WhereOptions } from 'sequelize';
import { Video } from 'src/videos/entities/video.entity';

export interface QuerySearch {
  where: WhereOptions<Video>;
  limit: number;
  offset: number;
}
