import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { env } from 'process';
import { createClient } from '@supabase/supabase-js';

@Injectable()
export class TeamService {
  constructor(private prisma: PrismaService) {}

  async createTeam(createTeamDto: CreateTeamDto) {
    const league = this.prisma.league.findFirst({
      where: { id: createTeamDto.leagueId },
    });

    if (((await league).numberTeams = league.teams.length)) {
      throw new Error('Limite de times na liga excedido');
    } else {
      return this.prisma.team.create({
        data: {
          name: createTeamDto.name,
          fullName: createTeamDto.fullName,
          abbreviation: createTeamDto.abbreviation,
          country: createTeamDto.country,
          leagueId: createTeamDto.leagueId,
        },
      });
    }
  }

  async uploadImage(id: string, image: Express.Multer.File) {
    const supabaseURL = env.SUPABASE_URL;
    const supabaseKey = env.SUPABASE_KEY;
    const supabase = createClient(supabaseURL, supabaseKey);

    const { data } = await supabase.storage
      .from('imageTeams')
      .upload(image.originalname, image.buffer, { upsert: true });

    return this.prisma.team.update({
      data: {
        image:
          env.SUPABASE_URL +
          '/storage/v1/object/public/profileImage/' +
          data.path,
      },
      where: { id },
    });
  }
}
