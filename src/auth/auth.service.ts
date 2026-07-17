import { Injectable, UnauthorizedException } from '@nestjs/common';
import {UsuariosService} from '../usuarios/usuarios.service';
import { JwtService } from '@nestjs/jwt';
import *as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private userService: UsuariosService,
        private jwtService: JwtService
    ) {}

    // Registrar usuario
    async register(data: {
        email: string,
        password: string,
        nombre: string,
        apellido: string,
        DNI: string,
        numeroTelefono: string,
    }){
        return this.userService.create(data);
    }


    // Legeo de usuario

    async login(email: string, password: string){
        const usuario = await this.userService.findByEmail(email);

        if(!usuario){
            throw new UnauthorizedException('Credenciales incorrectas');
        }
    
        const passwordMatch = await bcrypt.compare(password, usuario.password);

        if(!passwordMatch) {
            throw new UnauthorizedException('Contraseña Incorrecta');
        }

        const payload = {sub: usuario.id , email: usuario.email, rol: usuario.rol};
        const token = await this.jwtService.signAsync(payload);

        return {access_token: token};
    }











}
