import { Team } from 'src/team/entities/team.entity';

export class League {
  id?: number;
  name: string;
  country: string;
  numberTeams: number;
  teams?: Team[];
}
