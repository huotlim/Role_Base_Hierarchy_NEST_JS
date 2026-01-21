import { PartialType } from '@nestjs/mapped-types';
import { CreateBookBorrowDto } from './create-book-borrow.dto';

export class UpdateBookBorrowDto extends PartialType(CreateBookBorrowDto) {}
