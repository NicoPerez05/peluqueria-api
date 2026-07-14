import { Module } from '@nestjs/common';
import { TurnosService } from './turnos.service';
import { TurnosController } from './turnos.controller';

@Module({
  providers: [TurnosService],
  controllers: [TurnosController]
})
export class TurnosModule {}
