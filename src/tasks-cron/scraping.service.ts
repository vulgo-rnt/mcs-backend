import { Injectable, Logger } from '@nestjs/common';
import { Page } from 'puppeteer';
import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import { BattlesService } from 'src/battles/battles.service';
import { Battle } from 'src/battles/entities/battle.entity';
import { Video } from 'src/videos/entities/video.entity';
import { VideosService } from 'src/videos/videos.service';

@Injectable()
export class ScrapingService {
  private allBattlesId: Pick<Battle, '_battleId' | 'name'>[] = [];
  private mappedUpdateData: {
    name: string;
    battle: string;
    lastVideo: string;
  }[] = [];
  private newVideos: Video[] = [];
  private readonly logger = new Logger(ScrapingService.name);

  constructor(
    private readonly videosService: VideosService,
    private readonly battlesService: BattlesService,
  ) {}

  async scraping() {
    this.uptadeVariables();
    this.logger.log('Up Browser');
    const { page, browser } = await this.loadBrowser();

    for (const map of this.mappedUpdateData) {
      this.newVideos = [];
      this.logger.log(`Go To ${map.name} Channel`);
      await page.goto(`https://www.youtube.com/channel/${map.battle}/videos`);
      this.logger.log('Scraping Data...');
      await page.waitForSelector('ytd-browse');
      const initialData = await page.evaluate(`ytInitialData`);

      const videosFilted = this.filterData(initialData, map.battle);

      if (this.toCheckData(videosFilted, map.lastVideo)) {
        while (true) {
          const resp = await page.waitForResponse(async (res) => {
            await page.evaluate(
              `window.scroll({ top: document.querySelector("ytd-browse").scrollHeight })`,
            );
            return (
              res.url() ===
              'https://www.youtube.com/youtubei/v1/browse?prettyPrint=false'
            );
          });
          const resJson = await resp.json();
          const videosFilted = this.filterData(resJson, map.battle);

          if (!this.toCheckData(videosFilted, map.lastVideo)) break;
        }
      }

      await this.addDateInVideos(page);
      await this.saveVideos();
    }
    this.logger.log('Browser Close');
    browser.close();
  }

  async saveVideos() {
    for (const video of this.newVideos) {
      try {
        await this.videosService.create(video);
      } catch {
        this.logger.error(`Error in video :${video._videoId}`);
      }
    }
    this.logger.log('Updated Database');
  }

  async addDateInVideos(page: Page) {
    const videos = [];
    for (const dataVideo of this.newVideos) {
      await page.goto(`https://www.youtube.com/watch?v=${dataVideo._videoId}`);
      const date = await page.evaluate(
        `ytInitialPlayerResponse.microformat.playerMicroformatRenderer.publishDate`,
      );
      dataVideo.date = date as Date;
      videos.push(dataVideo);
    }
    this.newVideos = videos;
  }

  toCheckData(videos: Video[], stop: string) {
    for (const video of videos) {
      if (video._videoId === stop) return false;
      this.newVideos.push(video);
    }
    return true;
  }

  filterData(data, battleId: string): Video[] {
    const arrayVideos =
      data.onResponseReceivedActions?.[1]?.reloadContinuationItemsCommand
        .continuationItems ||
      data.onResponseReceivedActions?.[0]?.appendContinuationItemsAction
        .continuationItems ||
      data.contents.twoColumnBrowseResultsRenderer.tabs[1].tabRenderer.content
        .richGridRenderer.contents;

    return arrayVideos
      .filter((item) => !!item?.richItemRenderer?.content?.videoRenderer)
      .map((item) => {
        const video = item.richItemRenderer.content.videoRenderer;
        return {
          _videoId: video.videoId,
          battle: battleId,
          link: `https://www.youtube.com/watch?v=${video.videoId}`,
          title: video.title.runs[0].text,
          thumbnail: {
            small: video.thumbnail.thumbnails[1],
            medium: video.thumbnail.thumbnails[2],
            large: video.thumbnail.thumbnails[3],
          },
        };
      });
  }

  async uptadeVariables() {
    this.allBattlesId = await this.battlesService.findAllId();

    for (const battle of this.allBattlesId) {
      const mapped = {} as { name: string; battle: string; lastVideo: string };
      mapped.battle = battle._battleId;
      mapped.name = battle.name;

      const lastVideo = await this.videosService.search({
        where: { battle: battle._battleId },
        attributes: ['_videoId'],
        limit: 1,
        offset: 0,
        order: [['date', 'DESC']],
      });

      mapped.lastVideo = lastVideo[0]._videoId;

      this.mappedUpdateData.push(mapped);
      this.logger.debug(mapped);
    }
  }

  async loadBrowser() {
    const browser = await puppeteer.use(StealthPlugin()).launch({
      executablePath: '/usr/bin/google-chrome',
      ignoreHTTPSErrors: true,
      args: ['--no-sandbox', '--disable-gpu', '--unlimited-storage'],
    });
    const page = await browser.newPage();
    await page.setRequestInterception(true);

    page.on('request', (req) => {
      if (
        req.resourceType() === 'image' ||
        req.resourceType() === 'font' ||
        req.resourceType() === 'media'
      ) {
        req.abort();
      } else {
        req.continue();
      }
    });

    return { page, browser };
  }
}
