import { Test, TestingModule } from '@nestjs/testing';
import { CiiuDivisionService } from './ciiu-division.service';

describe('CiiuDivisionService', () => {
  let service: CiiuDivisionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CiiuDivisionService],
    }).compile();

    service = module.get<CiiuDivisionService>(CiiuDivisionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
