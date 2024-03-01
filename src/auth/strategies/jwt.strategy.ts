import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { IUserFromJwt } from 'src/auth/models/UserFromJwt';
import { IPayload } from '../models/payload';

import { UserService } from 'src/user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: IPayload): Promise<IUserFromJwt> {
    const user = await this.userService.findByEmail(payload.email);

    return {
      id: payload.sub,
      email: payload.email,
      imageUser: user.imageUser,
    };
  }
}
