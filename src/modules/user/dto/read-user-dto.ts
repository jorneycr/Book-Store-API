import { Type } from 'class-transformer';
import { IsEmail, IsNumber } from 'class-validator';
import { ReadUserDetailDto } from './read-user-detail.dto';

export class ReadUserDto {
  @IsNumber()
  readonly id: number;

  @IsEmail()
  readonly email: string;

  @IsEmail()
  readonly username: string;

  @Type((type) => ReadUserDetailDto)
  readonly details: ReadUserDetailDto;
}
