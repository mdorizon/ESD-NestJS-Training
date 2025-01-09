import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { SigninDto } from './dto/signin.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authservice: AuthService) {}
  @Post('signin')
  signin(@Body() body: SigninDto) {
    return this.authservice.signin(body);
  }

  @Post('signup')
  signup(@Body() body: SignupDto) {
    return this.authservice.signup(body);
  }
}
