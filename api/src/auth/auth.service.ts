import { Injectable } from '@nestjs/common';
import { SignupDto } from './dto/signup.dto';
import { SigninDto } from './dto/signin.dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  signin(signinDto: SigninDto) {
    return 'Hello ' + signinDto.email;
  }

  async signup(signupDto: SignupDto) {
    // crypter le password
    const password = await bcrypt.hash(signupDto.password, 10);
    signupDto.password = password;
    // create user
    return this.userService.create(signupDto);
  }
}
