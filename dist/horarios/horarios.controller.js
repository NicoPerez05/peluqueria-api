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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HorariosController = void 0;
const common_1 = require("@nestjs/common");
const horarios_service_1 = require("./horarios.service");
const jwt_guard_1 = require("../auth/jwt.guard");
const create_horario_dto_1 = require("./dto/create-horario.dto");
const roles_decorator_1 = require("../auth/roles.decorator");
const roles_guard_1 = require("../auth/roles.guard");
let HorariosController = class HorariosController {
    horariosService;
    constructor(horariosService) {
        this.horariosService = horariosService;
    }
    async findAll() {
        return this.horariosService.findAll();
    }
    findByPeluquero(id) {
        return this.horariosService.findByPeluquero(id);
    }
    createHorario(body, req) {
        return this.horariosService.createHorario(body, req.user.id);
    }
};
exports.HorariosController = HorariosController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], HorariosController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], HorariosController.prototype, "findByPeluquero", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('ADMIN'),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_horario_dto_1.CreateHorarioDto, Object]),
    __metadata("design:returntype", void 0)
], HorariosController.prototype, "createHorario", null);
exports.HorariosController = HorariosController = __decorate([
    (0, common_1.Controller)('horarios'),
    __metadata("design:paramtypes", [horarios_service_1.HorariosService])
], HorariosController);
//# sourceMappingURL=horarios.controller.js.map