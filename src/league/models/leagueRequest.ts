import { Request } from 'express';
import { Team } from 'src/team/entities/team.entity';

export interface LeagueRequest extends Request {
  name: string;
  country: string;
  numberTeams: number;
  team: Team[];
}
