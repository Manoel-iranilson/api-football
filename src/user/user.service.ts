import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';

import { PrismaService } from 'src/database/prisma.service';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { createClient } from '@supabase/supabase-js';
import { env } from 'process';

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

  async findByEmail(email: string) {
    const user = this.prisma.user.findUnique({ where: { email } });
    return user;
  }

  async uploadImage(user: User, profileImage: Express.Multer.File) {
    const supabaseURL = env.SUPABASE_URL;
    const supabaseKey = env.SUPABASE_KEY;
    const supabase = createClient(supabaseURL, supabaseKey, {
      auth: {
        persistSession: false,
      },
    });
    const data = await supabase.storage
      .from('profileImage')
      .upload(profileImage.originalname, profileImage.buffer, { upsert: true });

    const mongoData = this.prisma.user.update({
      data: {
        email: user.email,
        password: user.password,
        imageUser:
          env.SUPABASE_URL +
          '/storage/v1/object/public/profileImage/' +
          data.data.path,
      },
      where: { id: user.id.toString() },
    });
    return mongoData;
  }

  async remove(id: string) {
    await this.prisma.user.delete({ where: { id } });
    return `deleted user`;
  }
}
