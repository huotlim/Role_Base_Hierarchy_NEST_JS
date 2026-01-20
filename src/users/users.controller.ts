import { Body, Controller, Get, Param, Post, Request, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { PermissionsGuard } from 'src/rbac/guards/permissions.guard';
import { AuthGuard } from '@nestjs/passport';
import { Permissions } from 'src/rbac/decorators/permissions.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  
  @Get('me')
  @UseGuards(AuthGuard('jwt'))
  getCurrentUser(@Request() req) {
    return {
      user: req.user,
      message: 'Current user info'
    };
  }

  @Permissions('ASSIGN_ROLE')
  @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  @Post(':userId/role/:roleId')
  assignRole(
    @Param('userId') userId: number,
    @Param('roleId') roleId: number,
    @Request() req
  ) {
    return this.usersService.assignRole(userId, roleId, req.user);
  }

  @Post()
  @Permissions('CREATE_USER')
  @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  createUser(@Body() body: { email: string; password: string; }, @Request() req) {
    return this.usersService.create(body.email, body.password, req.user);
  }

  @Get()
  @Permissions('VIEW_USERS')
  @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  getAllUsers(@Request() req) {
    return this.usersService.getAllUsers();
  }
}
