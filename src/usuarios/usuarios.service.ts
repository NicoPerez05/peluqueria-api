import { Injectable } from '@nestjs/common';
import { PrismaService} from '../prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuariosService {

    constructor(private prisma: PrismaService) { }
    // Buscar por mail
    async findByEmail(email: string){ 
        return this.prisma.usuario.findUnique({
                where: {email}
            }
        );
    }

    async create(data:{
        email: string,
        password: string,
        nombre: string,
        apellido: string,
        DNI: string,
        numeroTelefono: string
    }){
        const hashedPassword = await bcrypt.hash(data.password,10);

        const user = await this.prisma.usuario.create({
            data: {
                ...data,
                password: hashedPassword,
            }
        });

        const { password: _ , ...result} = user;
        return result;
    }

}
