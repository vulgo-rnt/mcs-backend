import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { McVideo } from './entities/mcVideo.entity';

@Module({
  imports: [SequelizeModule.forFeature([McVideo])],
})
export class McVideoModule {}
