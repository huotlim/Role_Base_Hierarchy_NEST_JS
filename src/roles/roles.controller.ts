import { Body, Controller, Delete, Get, Param, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RoleDto } from './dto/role.dto';
import { AssignPermissionsDto } from './dto/assign-permissions.dto';
import { PermissionsGuard } from 'src/rbac/guards/permissions.guard';
import { AuthGuard } from '@nestjs/passport';
import { Permissions } from 'src/rbac/decorators/permissions.decorator';
import {
  ApiBearerAuth,
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiBody,
  ApiResponse,
} from '@nestjs/swagger';

@ApiTags('Roles')
@ApiBearerAuth('access-token')
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Permissions('CREATE_ROLE')
  @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  @ApiOperation({ summary: 'Create new role' })
  @ApiBody({ type: RoleDto })
  @ApiResponse({ status: 201, description: 'Role created' })
  @Post()
  CreateRole(@Body() dto: RoleDto, @Request() req) {
    return this.rolesService.createRole(dto, req.user);

  }

  @Permissions('ASSIGN_PERMISSIONS')
  @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  @Post(':id/permissions')
  assignPermissions(@Param('id') id:number, @Body() dto:AssignPermissionsDto ) {
    return this.rolesService.assignPermissions(id, dto);

  }

  @Permissions('UPDATE_ROLE')
  @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  @Patch(':id')
  UpdateRole(@Param('id') id:number, @Body() dto:RoleDto ) {
    return this.rolesService.updateRole(id, dto);
  }

  @Permissions('VIEW_ALL_ROLES')
  @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  @Get()
  getAllRoles(@Request() req) {
    return this.rolesService.getAllRoles(req.user);
  }

  @ApiOperation({ summary: 'Get all roles' })
  @ApiResponse({ status: 200 })
  @Permissions('VIEW_ROLE')
  @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  @Get(':id')
  getRoleById(@Param('id') id: number) {
    return this.rolesService.getRoleById(id);
  }

  @Permissions('DELETE_ROLE')
  @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  @Delete(':id')
  deleteRole(@Param('id') id: number) {
    return this.rolesService.deleteRole(id);
  }
 
  
}
