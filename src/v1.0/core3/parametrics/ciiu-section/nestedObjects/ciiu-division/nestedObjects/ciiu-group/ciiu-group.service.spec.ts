import { Test, TestingModule } from '@nestjs/testing';
import { CiiuGroupService } from './ciiu-group.service';

describe('CiiuGroupService', () => {
  let service: CiiuGroupService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CiiuGroupService],
    }).compile();

    service = module.get<CiiuGroupService>(CiiuGroupService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
