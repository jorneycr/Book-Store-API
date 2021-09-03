import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly _userService: UserService) {}

  @Get(':id')
  async getUser(@Param() id: number): Promise<User> {
    const user = await this._userService.get(id);
    return user;
  }

  @Get()
  async getUsers(): Promise<User[]> {
    const users = await this._userService.getAll();
    return users;
  }

  @Post()
  async createUser(@Body() user: User): Promise<User> {
    const createdUser = await this.createUser(user);
    return createdUser;
  }

  @Patch(':id')
  async updateUser(@Param() id: number, @Body() user: User): Promise<User> {
    const createdUser = await this.createUser(user);
    return createdUser;
  }

  @Delete(':id')
  async deleteUser(@Param() id: number){
    await this._userService.delete(id);
    return true;
  }

}
