import { Test, TestingModule } from '@nestjs/testing';
import { ShopsUsersController } from './shops-users.controller';

describe('ShopsUsersController', () => {
  let controller: ShopsUsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShopsUsersController],
    }).compile();

    controller = module.get<ShopsUsersController>(ShopsUsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
