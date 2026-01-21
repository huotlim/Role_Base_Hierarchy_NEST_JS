import { Type } from "class-transformer";
import { IsDateString, IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
import { BorrowStatus } from "../entities/book-borrow.entity";

export class CreateBookBorrowDto {

    @IsOptional()
    @IsEnum(BorrowStatus)
    status?: BorrowStatus;
    
    @IsNumber()
    @Type(() => Number)
    bookId: number;

    @IsNumber()
    @Type(() => Number)
    userId: number;

    @IsOptional()
    @IsDateString()
    dueDate?: string;

    @IsOptional()
    @IsString()
    notes?: string;

    @IsOptional()
    @IsDateString()
    returnDate?: string;

    
}
