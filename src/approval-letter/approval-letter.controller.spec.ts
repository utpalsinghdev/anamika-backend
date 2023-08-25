import { Test, TestingModule } from '@nestjs/testing';
import { ApprovalLetterController } from './approval-letter.controller';
import { ApprovalLetterService } from './approval-letter.service';

describe('ApprovalLetterController', () => {
  let controller: ApprovalLetterController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ApprovalLetterController],
      providers: [ApprovalLetterService],
    }).compile();

    controller = module.get<ApprovalLetterController>(ApprovalLetterController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
