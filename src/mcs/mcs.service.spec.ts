import { Test, TestingModule } from '@nestjs/testing';
import { McsService } from './mcs.service';

describe('McsService', () => {
  let service: McsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [McsService],
    }).compile();

    service = module.get<McsService>(McsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
