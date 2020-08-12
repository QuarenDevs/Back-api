import { Test, TestingModule } from '@nestjs/testing';
import { CiiuSectionService } from './ciiu-section.service';

describe('CiiuSectionService', () => {
  let service: CiiuSectionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CiiuSectionService],
    }).compile();

    service = module.get<CiiuSectionService>(CiiuSectionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
