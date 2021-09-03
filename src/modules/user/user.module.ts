import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SharedModule } from 'src/shared/shared.module';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
    imports:[TypeOrmModule.forFeature([UserRepository]),SharedModule],
    providers: [UserService],
    controllers: [UserController]
})
export class UserModule {}
