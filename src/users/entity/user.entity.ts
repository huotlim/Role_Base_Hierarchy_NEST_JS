import { Book } from "src/book/entities/book.entity";
import { Role } from "src/roles/entity/role.entity";
import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column({ type: 'int', nullable: true })
    parentId: number | null;

    @ManyToOne(() => Role, role => role.users)
    role: Role;

    @OneToMany(() => Book, book => book.createdBy)
    books: Book[];
}