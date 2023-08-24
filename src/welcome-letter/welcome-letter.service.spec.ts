import { Test, TestingModule } from '@nestjs/testing';
import { WelcomeLetterService } from './welcome-letter.service';

describe('WelcomeLetterService', () => {
  let service: WelcomeLetterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WelcomeLetterService],
    }).compile();

    service = module.get<WelcomeLetterService>(WelcomeLetterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
