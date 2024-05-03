import { Module } from '@nestjs/common';

import { SequelizeModule } from '@nestjs/sequelize';
import { McsModule } from './mcs/mcs.module';
import { VideosModule } from './videos/videos.module';
import { BattlesModule } from './battles/battles.module';
import sequelizeConfig from '../config/ormconfig';
import { McVideoModule } from './ associative/mcVideo.module';

@Module({
  imports: [
    SequelizeModule.forRoot(sequelizeConfig),
    McsModule,
    VideosModule,
    BattlesModule,
    McVideoModule,
  ],
})
export class AppModule {}
