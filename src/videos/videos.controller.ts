import { Controller, Get, Post, Body, Delete, Param } from '@nestjs/common';
import { VideosService } from './videos.service';
import { Video } from './entities/video.entity';

@Controller('videos')
export class VideosController {
  constructor(private readonly videosService: VideosService) {}

  @Post()
  create(@Body() createVideoDto: Video) {
    return this.videosService.create(createVideoDto);
  }

  @Get()
  findAll() {
    return this.videosService.findAll();
  }
  @Delete(':_videoId')
  delete(@Param('_videoId') _videoId: string) {
    return this.videosService.delete(_videoId);
  }
}
