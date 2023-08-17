import { Test, TestingModule } from '@nestjs/testing';
import { AgentApplicationController } from './agent-application.controller';
import { AgentApplicationService } from './agent-application.service';

describe('AgentApplicationController', () => {
  let controller: AgentApplicationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AgentApplicationController],
      providers: [AgentApplicationService],
    }).compile();

    controller = module.get<AgentApplicationController>(AgentApplicationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
