import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { BattlesService } from './battles.service';
import { Battle } from './entities/battle.entity';
import { QueryPagination } from 'src/@types/query-pagination';

@Controller('battles')
export class BattlesController {
  constructor(private readonly battlesService: BattlesService) {}

  @Post()
  create(@Body() battle: Battle) {
    return this.battlesService.create(battle);
  }

  @Get()
  findAll(@Query() query: QueryPagination) {
    return this.battlesService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.battlesService.findOne(id);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.battlesService.delete(id);
  }
}
