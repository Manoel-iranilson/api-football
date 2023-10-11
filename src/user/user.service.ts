import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';

import { PrismaService } from 'src/database/prisma.service';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const data: Prisma.UserCreateInput = {
      email: createUserDto.email,
      password: await bcrypt.hash(createUserDto.password, 10),
    };
    const createUser = await this.prisma.user.create({ data });

    return {
      ...createUser,
      password: undefined,
    };
  }

  async findByEmail(email: any) {
    const user = this.prisma.user.findUnique({ where: { email } });
    return user;
  }

  uploadImage(user: User, arg1: { profileImage: string }) {
    const date = this.prisma.user.update({
      data: {
        email: user.email,
        password: user.password,
        imageUser: arg1.profileImage,
      },
      where: { id: user.id.toString() },
    });
    return date;
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }
}
