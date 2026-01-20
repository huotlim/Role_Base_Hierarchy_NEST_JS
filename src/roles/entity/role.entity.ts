import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { User } from 'src/users/entity/user.entity';
import { Permission } from './permission.entity';

@Entity()
export class Role {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    name: string;

    @Column()
    description: string;    

    // @OneToMany(() => Role, role => role.parent)
    // children: Role[];
    @ManyToOne(() => Role, role => role.children, { nullable: true })
    parent: Role;

    @OneToMany(() => Role, role => role.parent)
    children: Role[];
    
    @ManyToMany(() => Permission)
    @JoinTable({ name: 'role_permissions' })
    permissions: Permission[];

    @OneToMany(() => User, user => user.role)
    users: User[]
}
