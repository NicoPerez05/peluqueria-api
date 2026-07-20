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
exports.CreateHorarioDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateHorarioDto {
    fecha_hora;
    disponible;
    id_peluquero;
}
exports.CreateHorarioDto = CreateHorarioDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2026-07-25T15:30:00.000Z', description: 'Fecha_hora en la que se agenda el turno' }),
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateHorarioDto.prototype, "fecha_hora", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true, description: 'Define si esta el horario disponible o no', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateHorarioDto.prototype, "disponible", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 10, description: 'Id del peluquero que guardo el horario' }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], CreateHorarioDto.prototype, "id_peluquero", void 0);
//# sourceMappingURL=create-horario.dto.js.map