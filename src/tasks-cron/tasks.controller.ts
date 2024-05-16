import { Controller, Get } from '@nestjs/common';
import { ScrapingService } from './scraping.service';

@Controller('task')
export class TaskController {
  constructor(private readonly scrapingTask: ScrapingService) {}

  @Get()
  scraping() {
    return this.scrapingTask.scraping();
  }
}
