import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './entities/user.entity';
import { Token_refreshs } from './entities/token_refreshs.entity';
// import { Permissions } from './entities/permissions.entity';
import { Profiles } from './entities/profiles.entity';
import { Roles } from './entities/roles.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Users,Token_refreshs/*,Permissions*/,Profiles,Roles])],
  exports: [UserService],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
