import { Test, TestingModule } from '@nestjs/testing';
import { BoroughService } from './borough.service';

describe('BoroughService', () => {
  let service: BoroughService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BoroughService],
    }).compile();

    service = module.get<BoroughService>(BoroughService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
