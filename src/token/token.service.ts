import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  // async generateJwtToken(payload: any): Promise<string> {
  //   // const secret = 'VeryHardSecret'; // Убедитесь, что это соответствует вашему секрету
  //   // const expiresIn = '1d'; // Замените на '1d' или любой другой срок действия
  //   const secret = this.configService.get<string>('jwt.secret_jwt'); //jwt.secret_jwt
  //   const expiresIn = this.configService.get<string>(
  //     'jwt.signOptions.expiresIn', //jwt.signOptions.expiresIn
  //   );
  //   console.log('Generating JWT with payload:', payload);
  //   console.log('JWT Secret:', secret);
  //   console.log('JWT Expires In:', expiresIn);
  //   const payloadObject =
  //     typeof payload === 'string' ? { user: payload } : payload;
  //   // return this.jwtService.sign(payload, { secret, expiresIn });
  //   return this.jwtService.sign(payloadObject, {
  //     secret: secret,
  //     expiresIn: expiresIn,
  //   });
  // }

  async generateJwtToken(payload: any): Promise<string> {
    const secret = this.configService.get<string>('jwt.secret_jwt');
    const expiresIn = this.configService.get<string>(
      'jwt.signOptions.expiresIn',
    );

    console.log('Generating JWT with payload:', payload);
    console.log('JWT Secret:', secret);
    console.log('JWT Expires In:', expiresIn);

    const payloadObject =
      typeof payload === 'string' ? { user: payload } : payload;
    return this.jwtService.sign(payloadObject, { secret, expiresIn });
  }
}
