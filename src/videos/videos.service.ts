import { Injectable } from '@nestjs/common';
import { Video } from './entities/video.entity';
import { InjectModel } from '@nestjs/sequelize';
import { Mc } from 'src/mcs/entities/mc.entity';
import { QueryPagination } from 'src/@types/query-pagination';
import { FindOptions, OrderItem } from 'sequelize';

@Injectable()
export class VideosService {
  constructor(
    @InjectModel(Video)
    private readonly videoModel: typeof Video,
  ) {}

  async create(videoData): Promise<Video> {
    const video = new Video(videoData);
    return await video.save();
  }

  async findAll(query?: QueryPagination): Promise<Video[]> {
    if (!query.limit && !query.ord && !query.page) {
      return this.videoModel.findAll();
    }

    const order =
      query.ord && ([['date', query.ord.toUpperCase()]] as OrderItem[]);
    const limit = query.limit;
    const offset = query.page && (query.page - 1) * limit;

    return this.videoModel.findAll({
      limit,
      offset,
      order,
    });
  }

  async findOne(_videoId: string): Promise<Video> {
    return this.videoModel.findOne({
      where: { _videoId },
      include: [{ model: Mc }],
    });
  }

  async update(_videoId: string, videoData): Promise<[number, Video[]]> {
    const [affectedCount, affectedRows] = await this.videoModel.update(
      videoData,
      {
        where: { _videoId },
        returning: true,
      },
    );
    return [affectedCount, affectedRows as Video[]];
  }

  async delete(_videoId: string): Promise<number> {
    return this.videoModel.destroy({ where: { _videoId } });
  }

  async search(query: FindOptions<Video>): Promise<Video[]> {
    return this.videoModel.findAll(query);
  }
}
