import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class HorariosService {
    constructor(private prisma: PrismaService) { }

    // Buscar todos los horarios
    async findAll() {
        return this.prisma.horario.findMany();
    }

    // Buscar por peluquero
    async findByPeluquero(id_peluquero: number) {
        return this.prisma.horario.findMany({
            where: { id_peluquero: id_peluquero }
        })
    }

    // Crear horario por peluquero
    async createHorario(
        data: {
            fecha_hora: string,
            disponible?: boolean,
            id_peluquero: number
        },
        usuario: { id: number, rol: string }) {

        if (usuario.rol === 'ADMIN' || (usuario.rol === 'PELUQUERO' && usuario.id === data.id_peluquero)) {
            return this.prisma.horario.create({
                data: {
                    fecha_hora: new Date(data.fecha_hora),
                    disponible: data.disponible,
                    id_peluquero: data.id_peluquero
                }
            })
        } else {
            throw new ForbiddenException('No tenes los permisos necesarios para generar un horario');

        }
    }

    // Update horario
    async updateHorario(
        data: {
            fecha_hora?: string,
            disponible?: boolean,
            id_peluquero?: number
        },
        usuario: { id: number, rol: string },
        id_horario: number
    ) {
        const getHorario = await this.prisma.horario.findUnique({
            where: { id: id_horario }
        })

        if (getHorario) {
            if (usuario.rol === 'ADMIN' || (usuario.rol === 'PELUQUERO' && usuario.id === getHorario.id_peluquero)) {
                return this.prisma.horario.update({
                    where: { id: id_horario },
                    data: {
                        fecha_hora: data.fecha_hora ? new Date(data.fecha_hora) : undefined,
                        disponible: data.disponible,
                        id_peluquero: data.id_peluquero
                    }
                })
            } else {
                throw new ForbiddenException('No se puede updatear el horario correctamente');
            }
        } else {
            throw new NotFoundException('No se encontro horario para ese dia');
        }
    }

    // Remover horario
    async removeHorario(
        id_horario: number,
        usuario: { id: number, rol: string }
    ) {
        const getHorario = await this.prisma.horario.findUnique({
            where: { id: id_horario }
        })

        if (getHorario) {
            if (usuario.rol === 'ADMIN' || (usuario.rol === 'PELUQUERO' && usuario.id === getHorario.id_peluquero)) {
                return this.prisma.horario.delete({
                    where: { id: id_horario }
                })
            } else {
                throw new ForbiddenException('No tenes permisos para realizar esta accion');
            }
        } else {
            throw new NotFoundException('No existe ese horario para ese dia');
        }
    }
}
