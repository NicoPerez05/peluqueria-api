import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
<<<<<<< HEAD

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
=======
import { PrismaService } from './prisma.service';
import { AuthModule } from './auth/auth.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { ServiciosModule } from './servicios/servicios.module';
import { HorariosModule } from './horarios/horarios.module';
import { TurnosModule } from './turnos/turnos.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    UsuariosModule,
    ServiciosModule,
    HorariosModule,
    TurnosModule
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
  exports: [PrismaService],
>>>>>>> 5e927dd (feat: configurar AppModule con todos los modulos y prismaService)
})
export class AppModule {}
