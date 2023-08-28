import { Test, TestingModule } from '@nestjs/testing';
import { JointPrecentService } from './joint-precent.service';

describe('JointPrecentService', () => {
  let service: JointPrecentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JointPrecentService],
    }).compile();

    service = module.get<JointPrecentService>(JointPrecentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
