import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';
import { Role } from 'src/roles/entity/role.entity';
import * as bcrypt from 'bcrypt';


@Injectable()
export class UsersService {
    constructor(
    @InjectRepository(User)
    private repo: Repository<User>,
    @InjectRepository(Role)
    private roleRepo: Repository<Role>,
  ) {}

    async getAllUsers() {
    return this.repo.find({ relations: ['role', 'role.permissions'] });
    }

    async findByEmail(email: string, options?: any) {
    return await this.repo.findOne({ 
      where: { email },
      ...options
    });
  }

    async findById(id: number, options?: any) {
    return await this.repo.findOne({ 
      where: { id },
      ...options
    });
  }

    async create(email: string, password: string, currentUser?: User | null) {
    // Check if user already exists
    const existingUser = await this.findByEmail(email);
    if (existingUser) {
      throw new Error(`User with email ${email} already exists`);
    }
    
    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 12);
    
    const user = this.repo.create({ 
      email, 
      password: hashedPassword,
      parentId: currentUser ? currentUser.id : null
    });
    return this.repo.save(user);
    }
    
    async assignRole(userId: number, roleId: number, currentUser: User) {
        const user = await this.repo.findOne({ where: { id: userId } });
        const role = await this.roleRepo.findOne({ where: { id: roleId } });
        
        if (!user) {
            throw new Error('User not found');
        }
        
        if (!role) {
            throw new Error('Role not found');
        }
        
        // Check hierarchy constraint: prevent assigning roles to users with smaller parentIds
        if (user.parentId !== null && user.parentId < currentUser.id) {
            throw new Error('Cannot assign role to user with higher hierarchy level (smaller parentId)');
        }
        
        // Additional check: ensure current user can only assign roles to users they created or users in their hierarchy
        // if (user.parentId !== currentUser.id && user.id !== currentUser.id) {
        //     throw new Error('You can only assign roles to users you created or manage in your hierarchy');
        // }
        
        user.role = role;
        return this.repo.save(user);
    }
}
