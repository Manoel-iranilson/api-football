import { Request } from 'express';
import { Team } from '../entities/team.entity';

export interface TeamRequest extends Request {
  team: Team;
}
