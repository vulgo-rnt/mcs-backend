import { Injectable } from '@nestjs/common';
import { Video } from './entities/video.entity';
import { InjectModel } from '@nestjs/sequelize';

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
    return this.videoModel.findAll();
  }

  async findOne(id: number): Promise<Video> {
    return this.videoModel.findOne({ where: { id } });
  }

  async update(id: number, videoData): Promise<[number, Video[]]> {
    const [affectedCount, affectedRows] = await this.videoModel.update(
      videoData,
      {
        where: { id },
        returning: true,
      },
    );
    return [affectedCount, affectedRows as Video[]];
  }

  async delete(_videoId: string): Promise<number> {
    console.log(_videoId);
    return this.videoModel.destroy({ where: { _videoId } });
  }
}
