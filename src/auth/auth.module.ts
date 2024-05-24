import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { TokenService } from '../token/token.service';
import { JwtStrategy } from '../strategy/jwt.strategy';

@Module({
  imports: [
    UserModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const secret = configService.get<string>('jwt.secret_jwt'); //jwt.secret_jwt
        const expiresIn = configService.get<string>(
          'jwt.signOptions.expiresIn', //jwt.signOptions.expiresIn
        );
        console.log('JWT Module Configuration - Secret:', secret); // Логирование для проверки
        console.log('JWT Module Configuration - Expires In:', expiresIn); // Логирование для проверки
        return {
          secret: secret,
          signOptions: { expiresIn: expiresIn },
        };
      },
      inject: [ConfigService],
    }),
    ConfigModule,
  ],
  providers: [AuthService, TokenService, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService, TokenService],
})
export class AuthModule {}
