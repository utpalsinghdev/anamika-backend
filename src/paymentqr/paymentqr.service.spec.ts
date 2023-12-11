import { Test, TestingModule } from '@nestjs/testing';
import { PaymentqrService } from './paymentqr.service';

describe('PaymentqrService', () => {
  let service: PaymentqrService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PaymentqrService],
    }).compile();

    service = module.get<PaymentqrService>(PaymentqrService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
