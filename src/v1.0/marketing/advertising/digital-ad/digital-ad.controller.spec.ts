import { Test, TestingModule } from '@nestjs/testing';
import { DigitalAdController } from './digital-ad.controller';

describe('DigitalAd Controller', () => {
  let controller: DigitalAdController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DigitalAdController],
    }).compile();

    controller = module.get<DigitalAdController>(DigitalAdController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
