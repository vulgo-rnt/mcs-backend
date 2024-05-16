import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { ScrapingService } from './scraping.service';
import { VideosService } from 'src/videos/videos.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Video } from 'src/videos/entities/video.entity';
import { Battle } from 'src/battles/entities/battle.entity';
import { BattlesService } from 'src/battles/battles.service';
import { TaskController } from './tasks.controller';

@Module({
  imports: [SequelizeModule.forFeature([Video, Battle])],
  controllers: [TaskController],
  providers: [TasksService, ScrapingService, VideosService, BattlesService],
})
export class TasksModule {}
