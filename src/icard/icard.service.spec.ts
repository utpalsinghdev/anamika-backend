import { Test, TestingModule } from '@nestjs/testing';
import { IcardService } from './icard.service';

describe('IcardService', () => {
  let service: IcardService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IcardService],
    }).compile();

    service = module.get<IcardService>(IcardService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
