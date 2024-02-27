import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';
import { LeagueService } from './league.service';
import { CreateLeagueDto } from './dto/create-league.dto';

@Controller('league')
export class LeagueController {
  constructor(private readonly leagueService: LeagueService) {}

  @IsPublic()
  @Get()
  getLeagues() {
    return this.leagueService.getLeagues();
  }

  @IsPublic()
  @Get(':id')
  getLeague(@Param('id') id: string) {
    return this.leagueService.getLeague(id);
  }

  @Post()
  @HttpCode(HttpStatus.OK)
  // @UseGuards(LocalTeamGuard)
  createLeague(@Body() createLeagueDto: CreateLeagueDto) {
    return this.leagueService.createLeague(createLeagueDto);
  }
}
