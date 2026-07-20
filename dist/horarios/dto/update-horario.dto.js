"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateHorarioDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_horario_dto_1 = require("./create-horario.dto");
class UpdateHorarioDto extends (0, swagger_1.PartialType)(create_horario_dto_1.CreateHorarioDto) {
}
exports.UpdateHorarioDto = UpdateHorarioDto;
//# sourceMappingURL=update-horario.dto.js.map