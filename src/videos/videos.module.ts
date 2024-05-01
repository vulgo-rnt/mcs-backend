import { Module } from '@nestjs/common';
import { VideosService } from './videos.service';
import { VideosController } from './videos.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Video } from './entities/video.entity';

@Module({
  imports: [SequelizeModule.forFeature([Video])],
  controllers: [VideosController],
  providers: [VideosService],
})
export class VideosModule {}
