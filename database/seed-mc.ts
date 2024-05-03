import { NestFactory } from '@nestjs/core';
import { AppModule } from 'src/app.module';
import { readFile, readdir } from 'fs/promises';
import { resolve } from 'path';
import { VideosService } from 'src/videos/videos.service';
import { Mc } from 'src/mcs/entities/mc.entity';
import { randomUUID } from 'crypto';
import { McVideo } from 'src/ associative/entities/mcVideo.entity';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const videosService = app.get(VideosService);

  const mcsFilesName = await readdir('database/data/mcs');
  const videosAll = await videosService.findAll();

  for (const path of mcsFilesName) {
    const filePath = resolve(`./database/data/mcs/${path}`);
    const dataRaw = await readFile(filePath, 'utf-8');
    const mc = JSON.parse(dataRaw);
    mc._mcId = randomUUID();

    const listVideosByMc = [];

    for (const video of videosAll) {
      const reg = new RegExp(mc.regex);
      const itIs = reg.test(video.title);
      if (itIs) {
        listVideosByMc.push(video._videoId);
        videosService.update(video._videoId, { ...video, mcs: [mc._mcId] });
        const associative = new McVideo({
          _videoId: video._videoId,
          _mcId: mc._mcId,
        });
        associative.save();
      }
    }
    mc.videos = listVideosByMc;
    const newMc = new Mc(mc);
    newMc.save();
  }
  await app.close();
}
bootstrap();
