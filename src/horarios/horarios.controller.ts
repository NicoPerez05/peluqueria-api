import { Body, Controller, Delete, Get, Param , ParseIntPipe, Post, Put, Req, UseGuards } from '@nestjs/common';
import { HorariosService } from './horarios.service';
import { JwtAuthGuard } from '../auth/jwt.guard';

import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';

import { CreateHorarioDto } from './dto/create-horario.dto';
import { UpdateHorarioDto } from './dto/update-horario.dto';

@Controller('horarios')
export class HorariosController {
    constructor(private horariosService: HorariosService) {}
    // FindALL horario
    @Get()
    async findAll(){
        return this.horariosService.findAll();
    }
    // Encontrar horario del peluquero
    @Get(':id')
    findByPeluquero(@Param('id', ParseIntPipe) id: number){
        return this.horariosService.findByPeluquero(id);
    }
    // Create horario
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('ADMIN','PELUQUERO')
    @Post()
    createHorario(@Body() body: CreateHorarioDto, @Req() req: any) {
        return this.horariosService.createHorario(body, req.user);
    }
    // Actualizar Horario
    @UseGuards(JwtAuthGuard,RolesGuard)
    @Roles('ADMIN','PELUQUERO')
    @Put(':id')
    updateHorario(@Param('id', ParseIntPipe) id: number ,@Body() body: UpdateHorarioDto, @Req() req: any){
        return this.horariosService.updateHorario(body,req.user,id)
    }
    // Remover Horario
    @UseGuards(JwtAuthGuard,RolesGuard)
    @Roles('ADMIN', 'PELUQUERO')
    @Delete(':id')
    removeHorario(@Param('id', ParseIntPipe) id: number, @Req() req : any) {
        return this.horariosService.removeHorario(id,req.user);
    }

}
