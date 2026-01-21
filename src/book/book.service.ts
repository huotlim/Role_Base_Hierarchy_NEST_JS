import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { Repository } from 'typeorm';
import { Category } from 'src/categories/entities/category.entity';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';

@Injectable()
export class BookService {

    constructor(
    @InjectRepository(Book)
    private bookRepository: Repository<Book>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async create(createBookDto: CreateBookDto) {
    const category = await this.categoryRepository.findOne({ where: { id: createBookDto.categoryId } });
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    const book = this.bookRepository.create({ 
      title: createBookDto.title,
      author: createBookDto.author,
      isbn: createBookDto.isbn,
      description: createBookDto.description,
      totalCopies: createBookDto.totalCopies,
      availableQuantity: createBookDto.availableQuantity,
       // Default to totalCopies if not provided
      category: category,
      
    });
    
    return this.bookRepository.save(book);
   
  }

  async findAll() {
    const books = await this.bookRepository.find({ relations: ['category'] });
    return books;
   
  }

  async findOne(id: number) {
    const books = await this.bookRepository.findOne({ where: { id }, relations: ['category'] });
    if (!books) {
      throw new NotFoundException('Book not found');
    }
    return books;
  }

  update(id: number, updateBookDto: UpdateBookDto) {
    return `This action updates a #${id} book`;
  }

  async remove(id: number) {
    const book = await this.bookRepository.findOne({ where: { id } });
    if (!book) {
      throw new NotFoundException('Book not found');
    }
    await this.bookRepository.remove(book);
    return { message: 'Book deleted successfully' };
  }
}
