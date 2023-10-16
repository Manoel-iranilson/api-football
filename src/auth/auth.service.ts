import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { User } from 'src/user/entities/user.entity';
import { IPayload } from './models/payload';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}
  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);

    if (user) {
      const isPassWordValue = await bcrypt.compare(password, user.password);
      if (isPassWordValue) {
        return { ...user, password: undefined };
      }
    }
    throw new Error('Email or password provided is incorrect');
  }
  login(user: User) {
    const payload: IPayload = {
      sub: user.id,
      email: user.email,
      imageUser: user.imageUser,
    };

    const token = this.jwtService.sign(payload);
    return { access_token: token };
  }
}
