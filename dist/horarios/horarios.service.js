"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HorariosService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let HorariosService = class HorariosService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll() {
        return this.prisma.horario.findMany();
    }
    async findByPeluquero(id_peluquero) {
        return this.prisma.horario.findMany({
            where: { id_peluquero: id_peluquero }
        });
    }
    async createHorario(data, usuario) {
        if (usuario.rol === 'ADMIN' || (usuario.rol === 'PELUQUERO' && usuario.id === data.id_peluquero)) {
            return this.prisma.horario.create({
                data: {
                    fecha_hora: new Date(data.fecha_hora),
                    disponible: data.disponible,
                    id_peluquero: data.id_peluquero
                }
            });
        }
        else {
            throw new common_1.ForbiddenException('No tenes los permisos necesarios para generar un horario');
        }
    }
    async updateHorario(data, usuario, id_horario) {
        const getHorario = await this.prisma.horario.findUnique({
            where: { id: id_horario }
        });
        if (getHorario) {
            if (usuario.rol === 'ADMIN' || (usuario.rol === 'PELUQUERO' && usuario.id === data.id_peluquero)) {
                return this.prisma.horario.update({
                    where: { id: id_horario },
                    data: {
                        fecha_hora: new Date(data.fecha_hora),
                        disponible: data.disponible,
                        id_peluquero: data.id_peluquero
                    }
                });
            }
            else {
                throw new common_1.ForbiddenException('No se puede updatear el horario correctamente');
            }
        }
        else {
            throw new common_1.NotFoundException('No se encontro horario para ese dia');
        }
    }
    async removeHorario(id_horario, usuario) {
        const getHorario = await this.prisma.horario.findUnique({
            where: { id: id_horario }
        });
        if (getHorario) {
            if (usuario.rol === 'ADMIN' || (usuario.rol === 'PELUQUERO' && usuario.id === getHorario.id_peluquero)) {
                return this.prisma.horario.delete({
                    where: { id: id_horario }
                });
            }
            else {
                throw new common_1.ForbiddenException('No tenes permisos para realizar esta accion');
            }
        }
        else {
            throw new common_1.NotFoundException('No existe ese horario para ese dia');
        }
    }
};
exports.HorariosService = HorariosService;
exports.HorariosService = HorariosService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], HorariosService);
//# sourceMappingURL=horarios.service.js.map