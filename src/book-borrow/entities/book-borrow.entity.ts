import { Book } from "src/book/entities/book.entity";
import { User } from "src/users/entity/user.entity";
import {  Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export enum BorrowStatus {
    ACTIVE = 'ACTIVE',
    RETURNED = 'RETURNED',
    OVERDUE = 'OVERDUE',
}
@Entity()
export class BookBorrow {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Book, book => book.borrows)
    book: Book;

    @ManyToOne(() => User)
    user: User;

    @Column()
    borrowDate: Date;

    @Column()
    dueDate: Date;

    @Column({ nullable: true })
    returnDate?: Date;

    @Column({
    type: 'enum',
    enum: BorrowStatus,
    default: BorrowStatus.ACTIVE
  })
    status: BorrowStatus;

    @Column({ nullable: true })
    notes?: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;


}
