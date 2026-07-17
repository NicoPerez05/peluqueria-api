import { AuthService } from './auth.service';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    register(body: {
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
    login(body: {
        email: string;
        password: string;
    }): Promise<{
        access_token: string;
    }>;
}
