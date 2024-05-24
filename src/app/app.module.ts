import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from 'src/user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { TokenModule } from 'src/token/token.module';
import jwtConfig from 'src/configurations/index';
import { JwtStrategy } from 'src/strategy/jwt.strategy';
import { User } from 'src/entities/user.entity';
import { Shop } from 'src/entities/shop.entity';
import { Purchase } from 'src/entities/purchase.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [jwtConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('db_host'),
        port: +configService.get('db_port'),
        username: configService.get('db_user'),
        password: configService.get('db_password'),
        database: configService.get('db_name'),
        synchronize: true,
        entities: [User, Shop, Purchase],
      }),
      inject: [ConfigService],
    }),
    UserModule,
    AuthModule,
    TokenModule,
  ],
  controllers: [AppController],
  providers: [AppService, JwtStrategy],
})
export class AppModule {
  constructor(private readonly configService: ConfigService) {
    console.log(
      'Loaded Configuration:',
      this.configService.get<string>('jwt.signOptions.expiresIn'),
    );
  }
}
