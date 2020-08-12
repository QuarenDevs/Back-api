import { Test, TestingModule } from '@nestjs/testing';
import { CiiuGroupController } from './ciiu-group.controller';

describe('CiiuGroup Controller', () => {
  let controller: CiiuGroupController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CiiuGroupController],
    }).compile();

    controller = module.get<CiiuGroupController>(CiiuGroupController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
