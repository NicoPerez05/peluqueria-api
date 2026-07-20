import { HorariosService } from './horarios.service';
import { CreateHorarioDto } from './dto/create-horario.dto';
export declare class HorariosController {
    private horariosService;
    constructor(horariosService: HorariosService);
    findAll(): Promise<{
        id: number;
        fecha_hora: Date;
        disponible: boolean;
        id_peluquero: number;
    }[]>;
    findByPeluquero(id: number): Promise<{
        id: number;
        fecha_hora: Date;
        disponible: boolean;
        id_peluquero: number;
    }[]>;
    createHorario(body: CreateHorarioDto, req: any): Promise<{
        id: number;
        fecha_hora: Date;
        disponible: boolean;
        id_peluquero: number;
    }>;
}
