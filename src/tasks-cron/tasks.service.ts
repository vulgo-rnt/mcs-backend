import { Injectable } from '@nestjs/common';
import { ScrapingService } from './scraping.service';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class TasksService {
  constructor(private readonly scrapingService: ScrapingService) {}

  @Cron(CronExpression.EVERY_DAY_AT_1PM)
  async uptadeDatabase() {
    this.scrapingService.scraping();
  }
}
