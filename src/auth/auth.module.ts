import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserService } from 'src/user/user.service';
import { LocalStrategy } from './strategies/local-strategy';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/user/entities/user.entity';
import { AccessTokenStrategy } from './strategies/accessToken.strategy';
import { RefreshTokenStrategy } from './strategies/refreshToken.strategy';
import { ConfigModule } from '@nestjs/config/dist';
import { RefrenshtokenService } from 'src/user/refrenshtoken.service';
import { Token_refreshs } from 'src/user/entities/token_refreshs.entity';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    UserService,
    LocalStrategy,
    AccessTokenStrategy,
    RefreshTokenStrategy,
    RefrenshtokenService,
  ],
  imports: [
    UserModule,
    TypeOrmModule.forFeature([Users,Token_refreshs]),
    JwtModule.register({}),
    ConfigModule.forRoot(),
    ],
})
export class AuthModule {}
