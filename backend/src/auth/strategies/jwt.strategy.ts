import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';

if (!process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET não está definido nas variáveis de ambiente');
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET as string,
    });
  }
  async validate(payload: { sub: string }) {
    const user = await this.authService.validateUser(payload.sub);
    if (!user) {
      throw new UnauthorizedException('Usuário não autorizado');
    }
    return user;
  }
}
