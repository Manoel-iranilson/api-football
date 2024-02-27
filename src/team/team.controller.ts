import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';

import { TeamService } from './team.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';

@Controller('team')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @IsPublic()
  @Get()
  @HttpCode(HttpStatus.OK)
  getTeams() {
    return this.teamService.getTeams();
  }

  @IsPublic()
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getTeam(@Param('id') id: string) {
    return this.teamService.getTeam(id);
  }

  @Post()
  @HttpCode(HttpStatus.OK)
  // @UseGuards(LocalTeamGuard)
  createTeam(@Body() createTeamDto: CreateTeamDto) {
    return this.teamService.createTeam(createTeamDto);
  }

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
