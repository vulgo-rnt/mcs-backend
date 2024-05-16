import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Param,
  Query,
} from '@nestjs/common';
import { VideosService } from './videos.service';
import { Video } from './entities/video.entity';
import { FindOptions } from 'sequelize';
import { QueryPagination } from 'src/@types/query-pagination';

@Controller('videos')
export class VideosController {
  constructor(private readonly videosService: VideosService) {}

  @Post()
  create(@Body() video: Video) {
    return this.videosService.create(video);
  }

  @Get()
  findAll(@Query() query: QueryPagination) {
    return this.videosService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.videosService.findOne(id);
  }

  @Delete(':_videoId')
  delete(@Param('_videoId') _videoId: string) {
    return this.videosService.delete(_videoId);
  }

  @Post('search')
  search(@Body() query: FindOptions<Video>) {
    return this.videosService.search(query);
  }
}
