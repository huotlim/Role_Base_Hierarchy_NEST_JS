import { Module } from '@nestjs/common';
import { BookBorrowService } from './book-borrow.service';
import { BookBorrowController } from './book-borrow.controller';
import { Book } from 'src/book/entities/book.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookBorrow } from './entities/book-borrow.entity';
import { User } from 'src/users/entity/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Book,BookBorrow,User])],
  controllers: [BookBorrowController],
  providers: [BookBorrowService],
})
export class BookBorrowModule {}
