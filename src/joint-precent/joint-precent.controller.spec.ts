import { Test, TestingModule } from '@nestjs/testing';
import { JointPrecentController } from './joint-precent.controller';
import { JointPrecentService } from './joint-precent.service';

describe('JointPrecentController', () => {
  let controller: JointPrecentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JointPrecentController],
      providers: [JointPrecentService],
    }).compile();

    controller = module.get<JointPrecentController>(JointPrecentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
