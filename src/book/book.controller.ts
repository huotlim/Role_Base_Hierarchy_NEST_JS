import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { PermissionsGuard } from 'src/rbac/guards/permissions.guard';
import { AuthGuard } from '@nestjs/passport';
import { Permissions } from 'src/rbac/decorators/permissions.decorator';
import { Request } from 'express';
@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  
  @Permissions('CREATE_BOOK')
  @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  @Post()
  create(@Body() createBookDto: CreateBookDto, @Req() req: any) {
    const user = req.user;
    return this.bookService.create(createBookDto, user);
  }

  @Permissions('VIEW_BOOK')
  @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  @Get()
  findAll(@Req() req: any) {
    const user = req.user;
    return this.bookService.findAll(user);
  }

  @Permissions('VIEW_BOOK_BY_ID')
  @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookService.findOne(+id);
  }

  @Permissions('UPDATE_BOOK')
  @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.bookService.update(+id, updateBookDto);
  }

  @Permissions('DELETE_BOOK')
  @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookService.remove(+id);
  }
}
