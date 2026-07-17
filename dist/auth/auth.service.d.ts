import { UsuariosService } from '../usuarios/usuarios.service';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private userService;
    private jwtService;
    constructor(userService: UsuariosService, jwtService: JwtService);
    register(data: {
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
    login(email: string, password: string): Promise<{
        access_token: string;
    }>;
}
