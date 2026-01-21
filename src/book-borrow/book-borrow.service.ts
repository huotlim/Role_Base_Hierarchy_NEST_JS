import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookBorrowDto } from './dto/create-book-borrow.dto';
import { UpdateBookBorrowDto } from './dto/update-book-borrow.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BookBorrow, BorrowStatus } from './entities/book-borrow.entity';
import { Repository } from 'typeorm';
import { Book } from 'src/book/entities/book.entity';
import { User } from 'src/users/entity/user.entity';
import { BookService } from 'src/book/book.service';

@Injectable()
export class BookBorrowService {

    constructor(
    @InjectRepository(BookBorrow)
    private borrowRepository: Repository<BookBorrow>,
    @InjectRepository(Book)
    private bookRepository: Repository<Book>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
   
  ) {}

  // async create(createBookBorrowDto: CreateBookBorrowDto) {
  //  const book = await this.bookRepository.findOne({ where: { id: createBookBorrowDto.bookId } });
  //  if (!book) {
  //    throw new Error('Book not found');
  //  }
  //   const user = await this.userRepository.findOne({ where: { id: createBookBorrowDto.userId } });
  //   if (!user) {
  //     throw new Error('User not found');
  //   }
  //   const bookBorrow = await this.borrowRepository.findOne({ where: { book: {
  //      id: createBookBorrowDto.bookId },
  //       user: { id: createBookBorrowDto.userId},
  //       status: BorrowStatus.ACTIVE
  //    } });
  //   if (bookBorrow) {
  //     throw new BadRequestException('Book is already borrowed');
  //   }
  //   const borrow = this.borrowRepository.create({ 
  //     book: book,
  //     user: user,
  //     borrowDate: new Date(),
  //     status: BorrowStatus.ACTIVE
  //   });
  //   return this.borrowRepository.save(borrow);


  // }

  async create(createBookBorrowDto: CreateBookBorrowDto) {
  const book = await this.bookRepository.findOne({
    where: { id: createBookBorrowDto.bookId },
  });

  if (!book) {
    throw new NotFoundException('Book not found');
  }

  if (book.availableQuantity <= 0) {
    throw new BadRequestException('Book not available');
  }

  const user = await this.userRepository.findOne({
    where: { id: createBookBorrowDto.userId },
  });

  if (!user) {
    throw new NotFoundException('User not found');
  }

  const existingBorrow = await this.borrowRepository.findOne({
    where: {
      book: { id: createBookBorrowDto.bookId },
      user: { id: createBookBorrowDto.userId },
      status: BorrowStatus.ACTIVE,
    },
  });

  if (existingBorrow) {
    throw new BadRequestException('User already borrowed this book');
  }

  // decrease available quantity
  book.availableQuantity -= 1;
  await this.bookRepository.save(book);

  const borrow = this.borrowRepository.create({
    book,
    user,
    borrowDate: new Date(),
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
    status: BorrowStatus.ACTIVE,
    notes: createBookBorrowDto.notes,
  });

  return this.borrowRepository.save(borrow);
}

  findAll() {
    const borrows = this.borrowRepository.find({ relations: ['book', 'user'] });
    return borrows;
  }

  findOne(id: number) {
    const borrow = this.borrowRepository.findOne({ where: { id }, relations: ['book', 'user'] });
    return borrow;
  }

  async update(id: number, updateBookBorrowDto: UpdateBookBorrowDto) {

    const borrow = await this.borrowRepository.findOne({ where: { id } , relations: ['book'],});
    if (!borrow) {
      throw new NotFoundException('Borrow record not found');
    }
    if (updateBookBorrowDto.status === BorrowStatus.RETURNED) {
      borrow.status = BorrowStatus.RETURNED;
      borrow.returnDate = new Date();

      borrow.book.availableQuantity += 1;
      await this.bookRepository.save(borrow.book);
    }
    return await this.borrowRepository.save(borrow);
    
  }

  remove(id: number) {
    const borrow = this.borrowRepository.findOne({ where: { id } });
    if (!borrow) {
      throw new NotFoundException('Borrow record not found');
    }
    return this.borrowRepository.delete(id);
  }

  
}
