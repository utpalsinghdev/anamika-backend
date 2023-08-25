import { Test, TestingModule } from '@nestjs/testing';
import { AppointmentSalaryService } from './appointment-salary.service';

describe('AppointmentSalaryService', () => {
  let service: AppointmentSalaryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppointmentSalaryService],
    }).compile();

    service = module.get<AppointmentSalaryService>(AppointmentSalaryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
