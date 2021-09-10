import { Exclude, Expose, Type } from 'class-transformer';
import { IsEmail, IsNumber } from 'class-validator';
import { ReadRoleDto } from 'src/modules/role/dto';
import { ReadUserDetailDto } from './read-user-detail.dto';

@Exclude()
export class ReadUserDto {
  @Expose()
  @IsNumber()
  readonly id: number;

  @Expose()
  @IsEmail()
  readonly email: string;

  @Expose()
  @IsEmail()
  readonly username: string;

  @Expose()
  @Type((type) => ReadUserDetailDto)
  readonly details: ReadUserDetailDto;

  @Expose()
  @Type((type) => ReadRoleDto)
  readonly roles: ReadRoleDto[];
}
