import { Injectable } from '@nestjs/common';
import { Video } from './entities/video.entity';
import { InjectModel } from '@nestjs/sequelize';
import { Mc } from 'src/mcs/entities/mc.entity';

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
  async findAll(): Promise<Video[]> {
    return this.videoModel.findAll({});
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
}
