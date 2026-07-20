import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ServiciosService } from './servicios.service';
import { Roles } from '../auth/roles.decorator';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { RolesGuard } from '../auth/roles.guard';

@Controller('servicios')
export class ServiciosController {
    constructor(private servicios: ServiciosService) { }
    // FIND_ALL
    @Get()
    findall() {
        return this.servicios.findAll()
    }
    // FIND_ONE
    @Get(':id')
    getUnique(@Param('id') id: string) {
        return this.servicios.findOne(Number(id));
    }

    // CREATE
   @UseGuards(JwtAuthGuard, RolesGuard)
    //@Roles('ADMIN')
    @Post()
    create(@Body() body: { nombre_servicio: string, precio_servicio: number}){
        console.log('llego al create')
        return this.servicios.create(
            body.nombre_servicio,
            body.precio_servicio,
        )
    }
    // UPDATE
    @UseGuards(JwtAuthGuard,RolesGuard)
    @Roles('ADMIN')
    @Put(':id')
    update(@Param('id') id: string, @Body() data: {nombre_servicio: string, precio_servicio: number}){
        return this.servicios.update(Number(id), data)
    }
    // DELETE
    @UseGuards(JwtAuthGuard,RolesGuard)
    @Roles('ADMIN')
    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.servicios.remove(Number(id));
    }


}
