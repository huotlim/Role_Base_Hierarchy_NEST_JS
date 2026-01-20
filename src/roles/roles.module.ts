import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { Role } from './entity/role.entity';
import { Permission } from './entity/permission.entity';
import { PermissionsController } from './permissions.controller';
import { PermissionsService } from './permissions.service';

@Module({
  imports: [TypeOrmModule.forFeature([Role, Permission])],
  controllers: [RolesController , PermissionsController],
  providers: [RolesService , PermissionsService],
  exports: [RolesService ,PermissionsService],
})
export class RolesModule {}
