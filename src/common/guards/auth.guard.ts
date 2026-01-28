import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../constants/role.contante';
import { Permission } from '../enum/permission.enum';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    const requiredRoles = this.reflector.getAllAndOverride<Permission[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!requiredRoles) {
      return true;
    }

    if (!token) {
      throw new UnauthorizedException('Verify token');
    }

    let payload: any;

    try {
      //eslint-disable-next-line
      payload = await this.jwtService.verifyAsync(token);
      //eslint-disable-next-line
      request['user'] = payload;
    } catch (error) {
      throw new UnauthorizedException(`Cath error: ${error}`);
    }

    //eslint-disable-next-line
    return requiredRoles.some((role) => payload.roles?.includes(role));
  }

  private extractTokenFromHeader(req: Request): undefined | string {
    const [type, token] = req.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
