import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
  const request = context.switchToHttp().getRequest();
  console.log('Headers completos:', JSON.stringify(request.headers));
  return super.canActivate(context);
}
}