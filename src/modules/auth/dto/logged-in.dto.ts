import { Exclude, Expose, Type } from "class-transformer";
import { IsString } from "class-validator";
import { ReadUserDto } from "src/modules/user/dto";

@Exclude()
export class LoggedInDto{
    @Expose()
    @IsString()
    token: string;

    @Expose()
    @Type(()=>ReadUserDto)
    user:ReadUserDto;
}