import { Module } from '@nestjs/common';
import { ServiciosService } from './servicios.service';
import { ServiciosController } from './servicios.controller';
import { PrismaService } from '../prisma.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports:[AuthModule],
  providers: [ServiciosService, PrismaService],
  controllers: [ServiciosController]
})
export class ServiciosModule {}
