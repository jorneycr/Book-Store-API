import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoggedInDto, SigninDto, SignupDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly _authService: AuthService) {}
  @Post('/signup')
  @UsePipes(ValidationPipe)
  singup(@Body() signupDto: SignupDto): Promise<void> {
    return this._authService.signup(signupDto);
  }

  @Post('/signin')
  @UsePipes(ValidationPipe)
  signin(@Body() singinDto: SigninDto): Promise<LoggedInDto> {
    return this._authService.signin(singinDto);
  }
}
