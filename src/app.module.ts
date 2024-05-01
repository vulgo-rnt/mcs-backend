import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { McsModule } from './mcs/mcs.module';
import sequelizeConfig from './config/ormconfig';

@Module({
  imports: [SequelizeModule.forRoot(sequelizeConfig), McsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
