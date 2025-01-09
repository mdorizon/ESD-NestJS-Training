import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SignupDto } from './dto/signup.dto';
import { SigninDto } from './dto/signin.dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async signin(signinDto: SigninDto) {
    const user = await this.userService.findOneByEmail(signinDto.email);
    // check if password is correct
    const isPasswordCorrect = await bcrypt.compare(
      signinDto.password,
      user.password,
    );
    if (!isPasswordCorrect) {
      throw new UnauthorizedException('Invalid Credentials');
    }
    return user;
  }

  async signup(signupDto: SignupDto) {
    // crypter le password
    const password = await bcrypt.hash(signupDto.password, 10);
    signupDto.password = password;
    // create user
    return this.userService.create(signupDto);
  }
}
