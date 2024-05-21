import { Test, TestingModule } from '@nestjs/testing';
import { ShopsUsersService } from './shops-users.service';

describe('ShopsUsersService', () => {
  let service: ShopsUsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ShopsUsersService],
    }).compile();

    service = module.get<ShopsUsersService>(ShopsUsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
