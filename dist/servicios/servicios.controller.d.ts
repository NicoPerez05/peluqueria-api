import { ServiciosService } from './servicios.service';
export declare class ServiciosController {
    private servicios;
    constructor(servicios: ServiciosService);
    findall(): Promise<{
        id: number;
        nombre_servicio: string;
        precio_servicio: number;
    }[]>;
    getUnique(id: string): Promise<{
        id: number;
        nombre_servicio: string;
        precio_servicio: number;
    } | null>;
    create(body: {
        nombre_servicio: string;
        precio_servicio: number;
    }): Promise<{
        id: number;
        nombre_servicio: string;
        precio_servicio: number;
    }>;
    update(id: string, data: {
        nombre_servicio: string;
        precio_servicio: number;
    }): Promise<{
        id: number;
        nombre_servicio: string;
        precio_servicio: number;
    }>;
    delete(id: string): Promise<{
        id: number;
        nombre_servicio: string;
        precio_servicio: number;
    }>;
}
