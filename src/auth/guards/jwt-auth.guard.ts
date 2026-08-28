import {
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../../_utils/decorators/public.decorator';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) return true;
    const isActivated = await super.canActivate(context);

    return isActivated as boolean;
  }

  handleRequest(err: any, user: any, info: any, context: ExecutionContext) {
    if (info && info.message === 'jwt expired')
      throw new ForbiddenException('TOKEN_EXPIRED');
    return super.handleRequest(err, user, info, context);
  }
}
