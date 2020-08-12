import { Test, TestingModule } from '@nestjs/testing';
import { CiiuDivisionController } from './ciiu-division.controller';

describe('CiiuDivision Controller', () => {
  let controller: CiiuDivisionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CiiuDivisionController],
    }).compile();

    controller = module.get<CiiuDivisionController>(CiiuDivisionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
