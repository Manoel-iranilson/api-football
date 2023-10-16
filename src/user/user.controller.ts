import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Param,
  Request,
  UploadedFile,
  UseInterceptors,
  ParseFilePipe,
  FileTypeValidator,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';
import { AuthRequest } from 'src/auth/models/AuthRequest';
import { FileInterceptor } from '@nestjs/platform-express';
import path = require('path');
import { v4 as uuidv4 } from 'uuid';
import { diskStorage } from 'multer';

export const storage = {
  storage: diskStorage({
    destination: './uploads/profileimages',
    filename: (req, file, cb) => {
      const filename: string =
        path.parse(file.originalname).name.replace(/\s/g, '') + uuidv4();
      const extension: string = path.parse(file.originalname).ext;

      cb(null, `${filename}${extension}`);
    },
  }),
};

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @IsPublic()
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findByEmail(@Body() data: { email: string }) {
    return this.userService.findByEmail(data.email);
  }

  @Post('uploadImage')
  @UseInterceptors(FileInterceptor('file'))
  uploadImageUser(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          // new MaxFileSizeValidator({ maxSize: 1000 }),
          new FileTypeValidator({ fileType: 'image/jpeg' }),
        ],
      }),
    )
    file: Express.Multer.File,
    @Request() req: AuthRequest,
  ) {
    return this.userService.uploadImage(req.user, file);
  }

  @IsPublic()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
