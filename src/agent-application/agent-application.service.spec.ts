import { Test, TestingModule } from '@nestjs/testing';
import { AgentApplicationService } from './agent-application.service';

describe('AgentApplicationService', () => {
  let service: AgentApplicationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AgentApplicationService],
    }).compile();

    service = module.get<AgentApplicationService>(AgentApplicationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
