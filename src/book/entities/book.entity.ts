import { BookBorrow } from "src/book-borrow/entities/book-borrow.entity";
import { Category } from "src/categories/entities/category.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Book {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column({unique: true})
    isbn: string; 
    
    @Column()
    author: string;

    @Column({ nullable: true })
    description?: string;

    @Column({ default: 1 })
    totalCopies: number;

    @Column()
    availableQuantity: number;

    @Column({ nullable: true })
    publishedDate?: Date;

    @Column({ nullable: true })
    publisher?: string;

    @ManyToOne(() => Category, category => category.books)
    category: Category;

    @OneToMany(() => BookBorrow, borrow => borrow.book)
    borrows: BookBorrow[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

}
