import { Test, TestingModule } from '@nestjs/testing';
import { BoroughController } from './borough.controller';

describe('Borough Controller', () => {
  let controller: BoroughController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BoroughController],
    }).compile();

    controller = module.get<BoroughController>(BoroughController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
