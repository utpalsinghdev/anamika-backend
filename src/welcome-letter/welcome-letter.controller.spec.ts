import { Test, TestingModule } from '@nestjs/testing';
import { WelcomeLetterController } from './welcome-letter.controller';
import { WelcomeLetterService } from './welcome-letter.service';

describe('WelcomeLetterController', () => {
  let controller: WelcomeLetterController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WelcomeLetterController],
      providers: [WelcomeLetterService],
    }).compile();

    controller = module.get<WelcomeLetterController>(WelcomeLetterController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
