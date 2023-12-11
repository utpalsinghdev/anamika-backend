import { Test, TestingModule } from '@nestjs/testing';
import { PaymentqrController } from './paymentqr.controller';
import { PaymentqrService } from './paymentqr.service';

describe('PaymentqrController', () => {
  let controller: PaymentqrController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymentqrController],
      providers: [PaymentqrService],
    }).compile();

    controller = module.get<PaymentqrController>(PaymentqrController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
