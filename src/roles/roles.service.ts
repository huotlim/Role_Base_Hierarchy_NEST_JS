import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './entity/role.entity';
import { RoleDto } from './dto/role.dto';
import { PermissionDto } from './dto/permission.dto';
import { AssignPermissionsDto } from './dto/assign-permissions.dto';
import { Permission } from './entity/permission.entity';
import { User } from 'src/users/entity/user.entity';


@Injectable()
export class RolesService {
    constructor( 
    @InjectRepository(Role) private roleRepo: Repository<Role>,
    @InjectRepository(Permission) private permRepo: Repository<Permission>,
) {}

    // async createRole(dto: RoleDto) {
    //     const role = this.roleRepo.create({ name: dto.name, description: dto.description });
    //     const savedRole = await this.roleRepo.save(role);
    //     return {
    //         role: savedRole,
    //         message: 'Role created successfully'
    //     };
    // }

    
    async createRole(dto: RoleDto , currentUser:User) {
        const parentRole = await this.roleRepo.findOne({ where: { id:dto.parentId } });
        if(!parentRole){
            throw new Error('Parent role not found');
        }
        if(parentRole.id !== currentUser.role.id){
            throw new Error('You can only create a role under your own role');
        }
        const role = this.roleRepo.create({ name: dto.name, description: dto.description, parent: parentRole });
        return this.roleRepo.save(role);

    }


    // Assign permissions to a role
    async assignPermissions(roleId: number, dto: AssignPermissionsDto) {
        const role = await this.roleRepo.findOne({ where: { id: roleId }, relations: ['permissions'] });
        
        if (!role) {
            throw new Error('Role not found');
        }
        
        const permissions = await this.permRepo.findByIds(dto.permissionIds);
        
        if (permissions.length !== dto.permissionIds.length) {
            throw new Error('Some permissions not found');
        }
        
        role.permissions = permissions;
        return this.roleRepo.save(role);
    }

    async updateRole(id: number, dto: RoleDto) {
        const role = await this.roleRepo.findOne({ where: { id } });
        if (!role) {
          throw new Error('Role not found');
        }
        return this.roleRepo.save({...role, ...dto});
      }

    async getAllRoles(currentUser: User) {
        // If the user is a super admin, return all roles
        // Otherwise, return only roles created under their role hierarchy
        const userRoleId = currentUser.role.id;
        
        // Find all roles where the parent is the current user's role or descendants
        return this.roleRepo.find({ 
            where: { parent: { id: userRoleId } },
            relations: ['permissions', 'parent'] 
        });
    }

    async getRoleById(id: number) {
        const role = await this.roleRepo.findOne({ where: { id }, relations: ['permissions'] }); 
        if (!role) {
            throw new Error('Role not found');
        }return role;
    }

    async deleteRole(id: number) {
        const role = await this.roleRepo.findOne({ where: { id } });
        if (!role) {
            throw new Error('Role not found');
        } this.roleRepo.remove(role);
        return {
            roleId: id,
            message: 'Role deleted successfully'
        };
    }


        

    

    

}
