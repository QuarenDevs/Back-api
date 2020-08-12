import { Test, TestingModule } from '@nestjs/testing';
import { CiiuSectionController } from './ciiu-section.controller';

describe('CiiuSection Controller', () => {
  let controller: CiiuSectionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CiiuSectionController],
    }).compile();

    controller = module.get<CiiuSectionController>(CiiuSectionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
