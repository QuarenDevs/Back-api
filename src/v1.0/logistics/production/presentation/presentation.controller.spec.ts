import { Test, TestingModule } from '@nestjs/testing';
import { PresentationController } from './presentation.controller';

describe('Presentation Controller', () => {
  let controller: PresentationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PresentationController],
    }).compile();

    controller = module.get<PresentationController>(PresentationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
