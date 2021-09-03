import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { Role } from './role.entity';
import { RoleService } from './role.service';

@Controller('roles')
export class RoleController {
  constructor(private readonly _roleService: RoleService) {}

  @Get(':id')
  async getRole(@Param('id', ParseIntPipe) id: number): Promise<Role> {
    const role = await this._roleService.get(id);
    return role;
  }

  @Get()
  async getRoles(): Promise<Role[]> {
    const roles = await this._roleService.getAll();
    return roles;
  }

  @Post()
  async createRole(@Body() role: Role): Promise<Role> {
    const createdRole = await this._roleService.create(role);
    return createdRole;
  }

  @Patch(':id')
  async updateRole(@Param('id', ParseIntPipe) id: number, @Body() role: Role) {
    await this._roleService.update(id, role);
    return true;
  }

  @Delete(':id')
  async deleteRole(@Param('id', ParseIntPipe) id: number) {
    await this._roleService.delete(id);
    return true;
  }
}
