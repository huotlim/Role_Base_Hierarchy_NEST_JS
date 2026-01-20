import { InjectRepository } from "@nestjs/typeorm";
import { Permission } from "./entity/permission.entity";

import { PermissionDto } from "./dto/permission.dto";
import { Repository } from "typeorm";
import { User } from "src/users/entity/user.entity";
import { Role } from "./entity/role.entity";

export class PermissionsService {
    constructor(@InjectRepository(Permission) private permRepo: Repository<Permission>,
   @InjectRepository(Role) private roleRepo: Repository<Role>) {}

    async createPermission(dto: PermissionDto) {
        const permission = this.permRepo.create({ name: dto.name, description: dto.description });
        return this.permRepo.save(permission);
    }

  //   async getAllPermissions() {
  //   return this.permRepo.find();
  // }
     async getAllPermissions(currentUser: User) {
        // Get all roles that are children of the current user's role
        const childRoles = await this.roleRepo.find({
            where: { parent: { id: currentUser.role.id } },
            relations: ['permissions']
        });
        
        // Also include the current user's role permissions
        const currentRole = await this.roleRepo.findOne({
            where: { id: currentUser.role.id },
            relations: ['permissions']
        });
        
        // Collect all unique permissions from user's role and child roles
        const allPermissions = new Set<number>();
        
        // Add permissions from current user's role
        if (currentRole?.permissions) {
            currentRole.permissions.forEach(perm => allPermissions.add(perm.id));
        }
        
        // Add permissions from child roles
        childRoles.forEach(role => {
            role.permissions?.forEach(perm => allPermissions.add(perm.id));
        });
        
        // Return only the permissions that are within the user's scope
        if (allPermissions.size === 0) {
            return [];
        }
        
        return this.permRepo.findByIds(Array.from(allPermissions));
    }

    async updatePermission(id: number, dto: PermissionDto) {
    const permission = await this.permRepo.findOne({ where: { id } });
    if (!permission) {
      throw new Error('Permission not found');
    
    }
    return this.permRepo.save({...permission, ...dto});

  }

  async deletePermission(id: number) {
    const permission = await this.permRepo.findOne({ where: { id } });
    if (!permission) {
      throw new Error('Permission not found');
    }return this.permRepo.remove(permission);
  }

  
}