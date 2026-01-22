import { Body, Controller, Get, Param, Post, Request, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { PermissionsGuard } from 'src/rbac/guards/permissions.guard';
import { AuthGuard } from '@nestjs/passport';
import { Permissions } from 'src/rbac/decorators/permissions.decorator';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Users')
@ApiBearerAuth('access-token')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  
  // =====================
  // GET CURRENT USER
  // =====================

  @Get('me')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Get current logged-in user' })
  @ApiOkResponse({ description: 'Current user info' })
  getCurrentUser(@Request() req) {
    return {
      user: req.user,
      message: 'Current user info'
    };
  }

  // =====================
  // ASSIGN ROLE
  // =====================

  @Permissions('ASSIGN_ROLE')
  @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  @ApiOperation({ summary: 'Assign role to user' })
  @ApiParam({ name: 'userId', example: 1 })
  @ApiParam({ name: 'roleId', example: 2 })
  @Post(':userId/role/:roleId')
  assignRole(
    @Param('userId') userId: number,
    @Param('roleId') roleId: number,
    @Request() req
  ) {
    return this.usersService.assignRole(userId, roleId, req.user);
  }

  // =====================
  // CREATE USER
  // =====================

  @Post()
  @Permissions('CREATE_USER')
  @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  @ApiOperation({ summary: 'Create new user' })
  @ApiBody({
    schema: {
      example: {
        email: 'user@gmail.com',
        password: '123456789',
      },
    },
  })
  createUser(@Body() body: { email: string; password: string; }, @Request() req) {
    return this.usersService.create(body.email, body.password, req.user);
  }

  // =====================
  // GET ALL USERS
  // =====================
  @Get()
  @Permissions('VIEW_USERS')
  @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  @ApiOperation({ summary: 'Get all users' })
  @ApiOkResponse({ description: 'List of users' })
  getAllUsers(@Request() req) {
    return this.usersService.getAllUsers();
  }
}
