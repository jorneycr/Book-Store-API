import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SharedModule } from '../../shared/shared.module';
import { RoleController } from './role.controller';
import { RoleRepository } from './role.repository';
import { RoleService } from './role.service';

@Module({
    imports:[TypeOrmModule.forFeature([RoleRepository]),SharedModule],
    providers: [RoleService],
    controllers: [RoleController]
})
export class RoleModule {}
