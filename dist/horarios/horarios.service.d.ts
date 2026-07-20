import { PrismaService } from '../prisma.service';
export declare class HorariosService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<{
        id: number;
        fecha_hora: Date;
        disponible: boolean;
        id_peluquero: number;
    }[]>;
    findByPeluquero(id_peluquero: number): Promise<{
        id: number;
        fecha_hora: Date;
        disponible: boolean;
        id_peluquero: number;
    }[]>;
    createHorario(data: {
        fecha_hora: string;
        disponible?: boolean;
        id_peluquero: number;
    }, usuario: {
        id: number;
        rol: string;
    }): Promise<{
        id: number;
        fecha_hora: Date;
        disponible: boolean;
        id_peluquero: number;
    }>;
    updateHorario(data: {
        fecha_hora: string;
        disponible: boolean;
        id_peluquero: number;
    }, usuario: {
        id: number;
        rol: string;
    }, id_horario: number): Promise<{
        id: number;
        fecha_hora: Date;
        disponible: boolean;
        id_peluquero: number;
    }>;
    removeHorario(id_horario: number, usuario: {
        id: number;
        rol: string;
    }): Promise<{
        id: number;
        fecha_hora: Date;
        disponible: boolean;
        id_peluquero: number;
    }>;
}
