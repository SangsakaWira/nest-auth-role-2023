import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import {Role} from "src/utils/roles/roles.enum"
import {ROLES_KEY} from "../../utils/roles/roles.decorator"
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if(!requiredRoles){
      return true
    }
    
    const { user } = context.switchToHttp().getRequest();

    return requiredRoles.some((role) => requiredRoles?.includes(user.role));
  }
}