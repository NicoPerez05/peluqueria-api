import { PrismaService } from '../prisma.service';
export declare class UsuariosService {
    private prisma;
    constructor(prisma: PrismaService);
    findByEmail(email: string): Promise<{
        id: number;
        DNI: string;
        email: string;
        nombre: string;
        apellido: string;
        numeroTelefono: string;
        password: string;
        rol: import(".prisma/client").$Enums.Rol;
    } | null>;
    create(data: {
        email: string;
        password: string;
        nombre: string;
        apellido: string;
        DNI: string;
        numeroTelefono: string;
    }): Promise<{
        id: number;
        DNI: string;
        email: string;
        nombre: string;
        apellido: string;
        numeroTelefono: string;
        rol: import(".prisma/client").$Enums.Rol;
    }>;
}
