import { Test, TestingModule } from '@nestjs/testing';
import { IcardController } from './icard.controller';
import { IcardService } from './icard.service';

describe('IcardController', () => {
  let controller: IcardController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IcardController],
      providers: [IcardService],
    }).compile();

    controller = module.get<IcardController>(IcardController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
