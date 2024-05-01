import { Test, TestingModule } from '@nestjs/testing';
import { McsController } from './mcs.controller';
import { McsService } from './mcs.service';

describe('McsController', () => {
  let controller: McsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [McsController],
      providers: [McsService],
    }).compile();

    controller = module.get<McsController>(McsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
