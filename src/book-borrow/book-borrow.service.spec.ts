import { Test, TestingModule } from '@nestjs/testing';
import { BookBorrowService } from './book-borrow.service';

describe('BookBorrowService', () => {
  let service: BookBorrowService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BookBorrowService],
    }).compile();

    service = module.get<BookBorrowService>(BookBorrowService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
