import { Module } from '@nestjs/common';
import { McsService } from './mcs.service';
import { McsController } from './mcs.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Mc } from './entities/mc.entity';

@Module({
  imports: [SequelizeModule.forFeature([Mc])],
  controllers: [McsController],
  providers: [McsService],
})
export class McsModule {}
