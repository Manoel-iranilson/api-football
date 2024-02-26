import { IsNotEmpty, IsString } from 'class-validator';
import { Team } from '../entities/team.entity';

export class CreateTeamDto extends Team {
  @IsString()
  @IsNotEmpty()
  fullName: string;
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsString()
  @IsNotEmpty()
  country: string;
  @IsString()
  @IsNotEmpty()
  leagueId: string;
  @IsString()
  abbreviation: string;
}
