import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { catchError, from, map, Observable, of, tap } from 'rxjs';
import { UserDto } from '../dto';
import axios from 'axios';
import { AUTH_SERVICE_URL } from '../constants';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  private readonly logger = new Logger(JwtAuthGuard.name);

  constructor(
    private readonly reflector: Reflector,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const jwt =
      context.switchToHttp().getRequest().cookies?.Authentication ||
      context.switchToHttp().getRequest().headers?.Authentication;

    if (!jwt) {
      return false;
    }

    const roles = this.reflector.get<string[]>('roles', context.getHandler());

    return from(
      axios.get<UserDto>(`${AUTH_SERVICE_URL.PROD}/auth/authenticate`, {
        headers: {
          Authentication: jwt,
        }
      })
    ).pipe(
      tap((res) => {
        if (roles) {
          for (const role of roles) {
            if (!res.data.roles?.includes(role)) {
              this.logger.error('The user does not have valid roles.');
              throw new UnauthorizedException();
            }
          }
        }
        context.switchToHttp().getRequest().user = res.data;
      }),
      map(() => true),
      catchError((err) => {
        this.logger.error(err);
        return of(false);
      })
    );
  }
}
