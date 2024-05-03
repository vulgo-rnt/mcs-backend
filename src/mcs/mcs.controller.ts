import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { McsService } from './mcs.service';
import { Mc } from './entities/mc.entity';

@Controller('mcs')
export class McsController {
  constructor(private readonly mcsService: McsService) {}

  @Get()
  findAll() {
    return this.mcsService.findAll();
  }

  @Post()
  create(@Body() mc: Mc) {
    return this.mcsService.create(mc);
  }

  @Delete(':_mcId')
  delete(@Param('_mcId') _mcId: string) {
    return this.mcsService.remove(_mcId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mcsService.findOne(id);
  }
}
