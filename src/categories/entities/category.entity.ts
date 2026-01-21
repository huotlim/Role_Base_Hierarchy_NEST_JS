import { Book } from "src/book/entities/book.entity";
import { User } from "src/users/entity/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Category {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
    
    @Column({ nullable: true })
    description?: string;
    //Created by user relation
    @ManyToOne(() => User, { eager: true })
    createdBy: User;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @OneToMany(() => Book, book => book.category)
    books: Book[];

}
