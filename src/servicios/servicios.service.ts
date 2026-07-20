import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class ServiciosService {
    constructor(
        private prismaService: PrismaService,
    ) { }
    // FIND_ALL
    async findAll() {
        return this.prismaService.servicio.findMany()
    }
    // FIND_UNIQUE
    async findOne(id: number) {
        return this.prismaService.servicio.findUnique({
            where: { id: id }
        })
    }
    // CREATE
    async create(nombre_servicio: string, precio_servicio: number) {
        return this.prismaService.servicio.create(
            {
                data: {
                    nombre_servicio,
                    precio_servicio
                }
            }
        )
    }
    // UPDATE
    async update(
        id: number,
        data: {
            nombre_servicio: string,
            precio_servicio: number
        }) {

        return this.prismaService.servicio.update({
            where: {id: id},
            data
        })
    }
    // REMOVE
    async remove(id: number){
        return this.prismaService.servicio.delete({
            where: {id: id}
        });
    }

}
