import { NestFactory } from '@nestjs/core';
import { AppModule } from 'src/app.module';
import { readFile, readdir } from 'fs/promises';
import { resolve } from 'path';
import { Video } from 'src/videos/entities/video.entity';
import { Battle } from 'src/battles/entities/battle.entity';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  const battlesFilesName = await readdir('database/data/battles');

  for (const path of battlesFilesName) {
    const videosIds = [];

    const filePathBattle = resolve(`./database/data/battles/${path}`);
    const battleRaw = await readFile(filePathBattle, 'utf-8');
    const battleData = JSON.parse(battleRaw);

    const filePathVideos = resolve(`./database/data/videos/${path}`);
    const videosRaw = await readFile(filePathVideos, 'utf-8');
    const videosData = JSON.parse(videosRaw);

    for (const video of videosData) {
      videosIds.push(video._videoId);
      const data = new Video(video);
      await data.save();
      console.log('> insert video: ' + video._videoId);
    }

    battleData.videos = videosIds;
    const data = new Battle(battleData);
    await data.save();
    console.log('> insert battle: ' + battleData.name);
  }

  await app.close();
}
bootstrap();
