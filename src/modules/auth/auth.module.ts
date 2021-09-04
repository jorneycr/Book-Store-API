import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from 'src/config/config.service';
import { AuthController } from './auth.controller';
import { AuthRepository } from './auth.repository';
import { AuthService } from './auth.service';

@Module({
  imports:[TypeOrmModule.forFeature([AuthRepository])],
  controllers: [AuthController],
  providers: [AuthService, ConfigService]
})
export class AuthModule {}
