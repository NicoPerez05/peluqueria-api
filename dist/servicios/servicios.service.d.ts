import { PrismaService } from '../prisma.service';
export declare class ServiciosService {
    private prismaService;
    constructor(prismaService: PrismaService);
    findAll(): Promise<{
        id: number;
        nombre_servicio: string;
        precio_servicio: number;
    }[]>;
    findOne(id: number): Promise<{
        id: number;
        nombre_servicio: string;
        precio_servicio: number;
    } | null>;
    create(nombre_servicio: string, precio_servicio: number): Promise<{
        id: number;
        nombre_servicio: string;
        precio_servicio: number;
    }>;
    update(id: number, data: {
        nombre_servicio: string;
        precio_servicio: number;
    }): Promise<{
        id: number;
        nombre_servicio: string;
        precio_servicio: number;
    }>;
    remove(id: number): Promise<{
        id: number;
        nombre_servicio: string;
        precio_servicio: number;
    }>;
}
