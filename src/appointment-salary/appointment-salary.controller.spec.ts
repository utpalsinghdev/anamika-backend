import { Test, TestingModule } from '@nestjs/testing';
import { AppointmentSalaryController } from './appointment-salary.controller';
import { AppointmentSalaryService } from './appointment-salary.service';

describe('AppointmentSalaryController', () => {
  let controller: AppointmentSalaryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppointmentSalaryController],
      providers: [AppointmentSalaryService],
    }).compile();

    controller = module.get<AppointmentSalaryController>(AppointmentSalaryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
