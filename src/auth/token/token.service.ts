import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from '../strategy/auth.interface';

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async generateJwtToken(payload: JwtPayload): Promise<string> {
    const secret = this.configService.get<string>('jwt.secret_jwt');
    const expiresIn = this.configService.get<string>(
      'jwt.signOptions.expiresIn',
    );

    console.log('Generating JWT with payload:', payload);
    console.log('JWT Secret:', secret);
    console.log('JWT Expires In:', expiresIn);

    return this.jwtService.sign(payload, { secret, expiresIn });
  }
}
