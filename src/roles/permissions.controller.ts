import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards,Request } from "@nestjs/common";
import { PermissionDto } from "./dto/permission.dto";
import { PermissionsService } from "./permissions.service";
import { AssignPermissionsDto } from "./dto/assign-permissions.dto";
import { PermissionsGuard } from "src/rbac/guards/permissions.guard";
import { AuthGuard } from "@nestjs/passport";
import { Permissions } from 'src/rbac/decorators/permissions.decorator';

@Controller('permissions')
export class PermissionsController {

    constructor(private permService: PermissionsService) {}

    @Permissions('CREATE_PERMISSION')
    @UseGuards(AuthGuard('jwt'), PermissionsGuard)
    @Post()
    CreatePermission(@Body() dto: PermissionDto) {
        return this.permService.createPermission(dto);
    }

    @Permissions('VIEW_PERMISSIONS')
    @UseGuards(AuthGuard('jwt'), PermissionsGuard)
    @Get()
    getAll(@Request() req) {
    return this.permService.getAllPermissions(req.user);
  } 

  @Permissions('UPDATE_PERMISSION')
  @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  @Patch(':id')
   updatePermissions(@Param('id') id:number, @Body() dto:PermissionDto ) {
    return this.permService.updatePermission(id, dto);
  }

  @Permissions('DELETE_PERMISSION')
  @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  @Delete(':id')
  deletePermission(@Param('id') id: number) {
    return this.permService.deletePermission(id);
  }






}