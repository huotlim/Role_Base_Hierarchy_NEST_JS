import { IsString, IsOptional, IsNumber, IsDateString, IsPositive, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateBookDto {
  @IsString()
  title: string;

  @IsString()
  author: string;

  @IsString()
  isbn: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  totalCopies: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  availableCopies?: number;

  @IsNumber()
  availableQuantity: number;

  @IsOptional()
  @IsDateString()
  publishedDate?: string;

  @IsOptional()
  @IsString()
  publisher?: string;

  @IsNumber()
  @Type(() => Number)
  categoryId: number;
}