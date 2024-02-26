import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';

import { CreateLeagueDto } from './dto/create-league.dto';

@Injectable()
export class LeagueService {
  constructor(private prisma: PrismaService) {}

  async createLeague(createLeagueDto: CreateLeagueDto) {
    return this.prisma.league.create({
      data: {
        name: createLeagueDto.name,
        numberTeams: createLeagueDto.numberTeams,
        country: createLeagueDto.country,
      },
    });
  }

  async getLeague(id: string) {
    return this.prisma.league.findFirst({
      where: { id },
      include: { teams: true },
    });
  }
}
