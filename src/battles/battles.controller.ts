import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { BattlesService } from './battles.service';
import { Battle } from './entities/battle.entity';

@Controller('battles')
export class BattlesController {
  constructor(private readonly battlesService: BattlesService) {}

  @Post()
  create(@Body() createBattleDto: Battle) {
    return this.battlesService.create(createBattleDto);
  }

  @Get()
  findAll() {
    return this.battlesService.findAll();
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
