import { Module } from '@nestjs/common';
import { RefrenshtokenService } from './refrenshtoken.service';
import { RefrenshtokenController } from './refrenshtoken.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Token_refreshs } from './entities/token_refreshs.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Token_refreshs])],
  exports: [RefrenshtokenService],
  controllers: [RefrenshtokenController],
  providers: [RefrenshtokenService]
})
export class RefrenshtokenModule {}
