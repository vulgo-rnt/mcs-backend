import { Body, Controller, Get, Post } from '@nestjs/common';
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
}
