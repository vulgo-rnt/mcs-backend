import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { McsModule } from './mcs/mcs.module';
import { VideosModule } from './videos/videos.module';
import { BattlesModule } from './battles/battles.module';
import sequelizeConfig from '../config/ormconfig';
import { McVideoModule } from './ associative/mcVideo.module';
import { ScheduleModule } from '@nestjs/schedule';
import { TasksModule } from './tasks-cron/tasks.module';

@Module({
  imports: [
    SequelizeModule.forRoot(sequelizeConfig),
    ScheduleModule.forRoot(),
    TasksModule,
    McsModule,
    VideosModule,
    BattlesModule,
    McVideoModule,
  ],
})
export class AppModule {}
