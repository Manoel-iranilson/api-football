import { Module } from '@nestjs/common';

import { PrismaService } from 'src/database/prisma.service';
import { LeagueController } from './league.controller';
import { LeagueService } from './league.service';

@Module({
  controllers: [LeagueController],
  providers: [LeagueService, PrismaService],
  exports: [LeagueService],
})
export class LeagueModule {}
