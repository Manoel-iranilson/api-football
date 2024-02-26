import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';
import { TeamService } from './team.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('team')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @IsPublic()
  @Post()
  @HttpCode(HttpStatus.OK)
  // @UseGuards(LocalTeamGuard)
  createTeam(@Body() createTeamDto: CreateTeamDto) {
    return this.teamService.createTeam(createTeamDto);
  }

  @IsPublic()
  @Post('uploadImage/:id')
  @UseInterceptors(FileInterceptor('file'))
  uploadImageUser(
    @Param('id') id: string,
    @UploadedFile()
    file: Express.Multer.File,
  ) {
    return this.teamService.uploadImage(id, file);
  }
}
