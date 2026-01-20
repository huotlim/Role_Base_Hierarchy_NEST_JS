import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PERMISSIONS_KEY } from '../decorators/permissions.decorator';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredPermissions = this.reflector.getAllAndOverride<string[]>(PERMISSIONS_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredPermissions) return true;

    const user = context.switchToHttp().getRequest().user;
    // Handle both string arrays and object arrays for permissions
    const userPermissions = user?.role?.permissions?.map(p => 
      typeof p === 'string' ? p : p.name
    ) || [];
    
    return requiredPermissions.every(p => userPermissions.includes(p));
  }
}
