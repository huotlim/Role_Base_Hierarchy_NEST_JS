import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { BookBorrowService } from './book-borrow.service';
import { CreateBookBorrowDto } from './dto/create-book-borrow.dto';
import { UpdateBookBorrowDto } from './dto/update-book-borrow.dto';
import { PermissionsGuard } from 'src/rbac/guards/permissions.guard';
import { AuthGuard } from '@nestjs/passport';
import { Permissions } from 'src/rbac/decorators/permissions.decorator';

@Controller('book-borrow')
export class BookBorrowController {
  constructor(private readonly bookBorrowService: BookBorrowService) {}

  @Permissions('CREATE_BOOK_BORROW')
  @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  @Post()
  create(@Body() createBookBorrowDto: CreateBookBorrowDto) {
    return this.bookBorrowService.create(createBookBorrowDto);
  }

  @Permissions('VIEW_BOOK_BORROW')
  @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  @Get()
  findAll() {
    return this.bookBorrowService.findAll();
  }

  @Permissions('VIEW_BOOK_BORROW_BY_ID')
  @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookBorrowService.findOne(+id);
  }

  @Permissions('UPDATE_BOOK_BORROW')
  @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookBorrowDto: UpdateBookBorrowDto) {
    return this.bookBorrowService.update(+id, updateBookBorrowDto);
  }

  @Permissions('DELETE_BOOK_BORROW')
  @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookBorrowService.remove(+id);
  }
}
