import { Test, TestingModule } from '@nestjs/testing';
import { DigitalAdService } from './digital-ad.service';

describe('DigitalAdService', () => {
  let service: DigitalAdService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DigitalAdService],
    }).compile();

    service = module.get<DigitalAdService>(DigitalAdService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
