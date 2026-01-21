import { Test, TestingModule } from '@nestjs/testing';
import { BookBorrowController } from './book-borrow.controller';
import { BookBorrowService } from './book-borrow.service';

describe('BookBorrowController', () => {
  let controller: BookBorrowController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookBorrowController],
      providers: [BookBorrowService],
    }).compile();

    controller = module.get<BookBorrowController>(BookBorrowController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
