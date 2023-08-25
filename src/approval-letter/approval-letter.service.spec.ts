import { Test, TestingModule } from '@nestjs/testing';
import { ApprovalLetterService } from './approval-letter.service';

describe('ApprovalLetterService', () => {
  let service: ApprovalLetterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApprovalLetterService],
    }).compile();

    service = module.get<ApprovalLetterService>(ApprovalLetterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
