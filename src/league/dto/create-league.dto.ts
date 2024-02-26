import { IsInt, IsNotEmpty, IsString, Min } from 'class-validator';
import { League } from '../entities/league.entity';
import { Team } from 'src/team/entities/team.entity';

export class CreateLeagueDto extends League {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsString()
  @IsNotEmpty()
  country: string;

  @Min(0)
  @IsInt()
  numberTeams: number;

  teams?: Team[];
}
